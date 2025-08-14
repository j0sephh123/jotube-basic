import os
import re
import glob
import logging
import traceback
from typing import Callable, Optional, Tuple

import yt_dlp
from config import yt_dir, base, video_formats


DEFAULT_ERROR_LOG = os.environ.get(
    "DOWNLOADER_ERROR_LOG",
    os.path.join(os.path.dirname(__file__), "downloader_errors.log"),
)


def _safe_component(s: Optional[str]) -> str:
    """Sanitize a path component to avoid illegal characters and traversal."""
    if not s:
        return ""
    # Allow alnum, dash, underscore, dot. Replace others with '_'
    s = re.sub(r"[^A-Za-z0-9._-]", "_", s)
    # Prevent path traversal
    return s.strip("/\\. ")


class VideoDownloader:
    def __init__(
        self,
        update_progress_callback: Optional[Callable[[str, str], None]] = None,
        error_log_path: Optional[str] = None,
        use_browser_cookies: bool = True,
    ) -> None:
        """
        Initialize the downloader.

        Args:
            update_progress_callback: Function called as (video_id, percent_str)
            error_log_path: File path for error log output
            use_browser_cookies: Whether to try using browser cookies (Chrome) first
        """
        self.update_progress_callback = update_progress_callback
        self.use_browser_cookies = use_browser_cookies

        # Configure a dedicated logger that writes to a file but never raises.
        self.logger = logging.getLogger("download_service.downloader")
        self.logger.setLevel(logging.INFO)

        log_path = error_log_path or DEFAULT_ERROR_LOG
        # Avoid adding duplicate handlers if multiple instances are created.
        if not any(getattr(h, "_downloader_handler", False) for h in self.logger.handlers):
            try:
                fh = logging.FileHandler(log_path, encoding="utf-8")
                fh.setLevel(logging.INFO)
                fh.setFormatter(
                    logging.Formatter("%(asctime)s %(levelname)s: %(message)s")
                )
                fh._downloader_handler = True  # type: ignore[attr-defined]
                self.logger.addHandler(fh)
            except Exception:
                # As a last resort, fall back to a stream handler (stderr). Don't crash.
                sh = logging.StreamHandler()
                sh.setLevel(logging.INFO)
                sh.setFormatter(
                    logging.Formatter("%(asctime)s %(levelname)s: %(message)s")
                )
                sh._downloader_handler = True  # type: ignore[attr-defined]
                self.logger.addHandler(sh)

    # ------------------------- Internal Utilities -------------------------

    def _log_exception(self, message: str, exc: BaseException) -> None:
        """Log an exception with traceback to the error log file."""
        try:
            tb = "".join(traceback.format_exception(type(exc), exc, exc.__traceback__))
            self.logger.error("%s\n%s", message, tb)
        except Exception:
            # Never let logging crash the app.
            pass

    def _progress_hook(self, d: dict) -> None:
        """Handle download progress updates. Never raise."""
        try:
            status = d.get("status")
            if status != "downloading":
                return

            raw_percent = d.get("_percent_str")
            percent_str = (raw_percent if raw_percent else "0%")
            try:
                fname = d.get("filename") or d.get("tmpfilename") or "<unknown>"
                print(f"Downloading {fname}: {percent_str.strip()}")
            except Exception:
                # Printing must not crash the download
                pass

            if self.update_progress_callback:
                try:
                    vid = (d.get("info_dict") or {}).get("id") or ""
                    self.update_progress_callback(vid, percent_str.strip())
                except Exception as cb_exc:
                    # Log but do not propagate callback failures
                    self._log_exception("Progress callback raised an error", cb_exc)
        except Exception as hook_exc:
            self._log_exception("Progress hook error", hook_exc)

    # ------------------------- Public API -------------------------

    def get_save_path(
        self,
        video_id: str,
        channel_id: Optional[str] = None,
        custom_path: Optional[str] = None,
    ) -> Tuple[str, str]:
        """
        Determine where to save the video.

        Returns:
            (directory, output_template)
        """
        if custom_path:
            video_dir = custom_path
        elif channel_id:
            video_dir = os.path.join(yt_dir, _safe_component(channel_id), _safe_component(video_id))
        else:
            video_dir = os.path.join(yt_dir, "uncategorized", _safe_component(video_id))

        # Create directory if needed; raise clearer error if path is a file
        if os.path.exists(video_dir) and not os.path.isdir(video_dir):
            raise NotADirectoryError(f"Save path '{video_dir}' exists and is not a directory")

        os.makedirs(video_dir, exist_ok=True)

        # YouTube IDs are filesystem-safe, keep filename as-is for compatibility
        output_template = os.path.join(video_dir, f"{video_id}.%(ext)s")
        return video_dir, output_template

    def download_video(
        self,
        video_id: str,
        channel_id: Optional[str] = None,
        custom_path: Optional[str] = None,
        format_spec: Optional[str] = None,
    ) -> bool:
        """
        Download a YouTube video.

        Returns:
            True on success, False on failure (errors are logged to file).
        """
        try:
            _, output_template = self.get_save_path(video_id, channel_id, custom_path)
        except Exception as prep_exc:
            self._log_exception(
                f"Failed to prepare save path for video_id='{video_id}'", prep_exc
            )
            return False

        # Base options
        ydl_opts = {
            "format": format_spec or video_formats,
            "outtmpl": output_template,
            "noplaylist": True,
            "quiet": False,
            "progress_hooks": [self._progress_hook],
            "concurrent_fragment_downloads": 8,
        }

        # Try with Chrome cookies first if requested, fall back to no cookies
        if self.use_browser_cookies:
            ydl_opts["cookiesfrombrowser"] = ("chrome",)

        video_url = f"{base}{video_id}"

        # Two attempts: first as configured, second without cookies if they failed
        attempts = 2 if self.use_browser_cookies else 1
        for attempt in range(1, attempts + 1):
            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([video_url])
                return True
            except yt_dlp.utils.BrowserCookieError as e:
                self._log_exception(
                    f"Browser cookies unavailable for '{video_id}', retrying without cookies",
                    e,
                )
                # Remove cookies and retry once
                ydl_opts.pop("cookiesfrombrowser", None)
                continue
            except Exception as e:
                self._log_exception(
                    f"Error downloading video '{video_id}' from '{video_url}'", e
                )
                # Do not retry on generic errors; they are likely persistent
                break

        return False

    def check_if_downloaded(
        self,
        video_id: str,
        channel_id: Optional[str] = None,
        custom_path: Optional[str] = None,
    ) -> Optional[str]:
        """
        Check if a video file exists for the given id.

        Returns:
            Path to a video file if found, otherwise None.
        """
        try:
            video_dir, _ = self.get_save_path(video_id, channel_id, custom_path)
        except Exception as prep_exc:
            self._log_exception(
                f"Failed to compute save path during existence check for '{video_id}'",
                prep_exc,
            )
            return None

        # Prefer common containers, but fall back to any matching file
        preferred = [".mp4", ".mkv", ".webm", ".m4v", ".mov"]
        for ext in preferred:
            candidate = os.path.join(video_dir, f"{video_id}{ext}")
            if os.path.exists(candidate):
                return candidate

        # Fallback: any file starting with video_id.
        pattern = os.path.join(video_dir, f"{video_id}.*")
        for path in glob.glob(pattern):
            if os.path.isfile(path):
                return path

        return None
