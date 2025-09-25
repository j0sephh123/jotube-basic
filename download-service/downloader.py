import os
import re
import glob
import logging
import traceback
from typing import Callable, Optional, Tuple

import yt_dlp
from yt_dlp.utils import DownloadError  # broadly used error type
from config import yt_dir, base, video_formats


DEFAULT_ERROR_LOG = os.environ.get(
    "DOWNLOADER_ERROR_LOG",
    os.path.join(os.path.dirname(__file__), "downloader_errors.log"),
)


def _safe_component(s: Optional[str]) -> str:
    """Sanitize a path component to avoid illegal characters and traversal."""
    if not s:
        return ""
    s = re.sub(r"[^A-Za-z0-9._-]", "_", s)
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

        self.logger = logging.getLogger("download_service.downloader")
        self.logger.setLevel(logging.INFO)

        log_path = error_log_path or DEFAULT_ERROR_LOG
        if not any(getattr(h, "_downloader_handler", False) for h in self.logger.handlers):
            try:
                fh = logging.FileHandler(log_path, encoding="utf-8")
                fh.setLevel(logging.INFO)
                fh.setFormatter(logging.Formatter("%(asctime)s %(levelname)s: %(message)s"))
                fh._downloader_handler = True  # type: ignore[attr-defined]
                self.logger.addHandler(fh)
            except Exception:
                sh = logging.StreamHandler()
                sh.setLevel(logging.INFO)
                sh.setFormatter(logging.Formatter("%(asctime)s %(levelname)s: %(message)s"))
                sh._downloader_handler = True  # type: ignore[attr-defined]
                self.logger.addHandler(sh)

    # ------------------------- Internal Utilities -------------------------

    def _log_exception(self, message: str, exc: BaseException) -> None:
        """Log an exception with traceback to the error log file."""
        try:
            tb = "".join(traceback.format_exception(type(exc), exc, exc.__traceback__))
            self.logger.error("%s\n%s", message, tb)
        except Exception:
            pass

    def _progress_hook(self, d: dict) -> None:
        """Handle download progress updates. Never raise."""
        try:
            if d.get("status") != "downloading":
                return

            raw_percent = d.get("_percent_str")
            percent_str = raw_percent if raw_percent else "0%"
            try:
                fname = d.get("filename") or d.get("tmpfilename") or "<unknown>"
                print(f"Downloading {fname}: {percent_str.strip()}")
            except Exception:
                pass

            if self.update_progress_callback:
                try:
                    vid = (d.get("info_dict") or {}).get("id") or ""
                    self.update_progress_callback(vid, percent_str.strip())
                except Exception as cb_exc:
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

        if os.path.exists(video_dir) and not os.path.isdir(video_dir):
            raise NotADirectoryError(f"Save path '{video_dir}' exists and is not a directory")

        os.makedirs(video_dir, exist_ok=True)

        output_template = os.path.join(video_dir, f"{video_id}.%(ext)s")
        return video_dir, output_template

    def _compose_format(self, format_spec: Optional[str]) -> Tuple[str, str]:
        """
        Build a resilient format string and decide merge container.
        Returns (format_string, merge_output_format)
        """
        # sensible, high-quality fallbacks
        fallback = "bestvideo*+bestaudio/best"

        # if config provides a default, chain it with fallbacks
        root = fallback
        if format_spec and format_spec.strip():
            # If user passed a plain container like "mp4", translate to best-with-merge
            normalized = format_spec.strip().lower()
            if normalized in {"mp4", "webm", "mkv"}:
                return (fallback, normalized)
            root = f"{format_spec}/{fallback}"
        elif isinstance(video_formats, str) and video_formats.strip():
            root = f"{video_formats}/{fallback}"

        # default merge target; yt-dlp can switch if incompatible
        return (root, "mp4")

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

        fmt, merge_to = self._compose_format(format_spec)

        base_opts = {
            "format": fmt,
            "outtmpl": output_template,
            "noplaylist": True,
            "quiet": False,
            "progress_hooks": [self._progress_hook],
            "concurrent_fragment_downloads": 8,
            "merge_output_format": merge_to,
            # Slightly more robust selection without being strict
        }

        video_url = f"{base}{video_id}"

        # We’ll do up to 2 cookie modes (with/without), and within each, retry once
        # if the error indicates an unavailable requested format.
        for use_cookies in ([True, False] if self.use_browser_cookies else [False]):
            ydl_opts = dict(base_opts)
            if use_cookies:
                ydl_opts["cookiesfrombrowser"] = ("chrome",)

            try:
                with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                    ydl.download([video_url])
                return True

            except DownloadError as e:
                msg = str(e)
                # If the complaint is "Requested format is not available", retry once
                # with a pure best fallback (ignore any user/config spec).
                if "Requested format is not available" in msg or "requested format is not available" in msg:
                    self._log_exception(
                        f"Format not available for '{video_id}', retrying with pure best fallback",
                        e,
                    )
                    try:
                        fallback_only = dict(ydl_opts)
                        fallback_only["format"] = "bestvideo*+bestaudio/best"
                        with yt_dlp.YoutubeDL(fallback_only) as ydl:
                            ydl.download([video_url])
                        return True
                    except Exception as e2:
                        self._log_exception(
                            f"Fallback download failed for '{video_id}'", e2
                        )
                        # continue to try without cookies (if we used cookies)
                        continue
                else:
                    self._log_exception(
                        f"Download error for '{video_id}' from '{video_url}'", e
                    )
                    # try without cookies next if we used cookies; otherwise bail
                    continue

            except Exception as e:
                # Any other failure: drop cookies and try the next mode (or bail)
                self._log_exception(
                    f"Unexpected error while downloading '{video_id}'", e
                )
                continue

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

        preferred = [".mp4", ".mkv", ".webm", ".m4v", ".mov"]
        for ext in preferred:
            candidate = os.path.join(video_dir, f"{video_id}{ext}")
            if os.path.exists(candidate):
                return candidate

        pattern = os.path.join(video_dir, f"{video_id}.*")
        for path in glob.glob(pattern):
            if os.path.isfile(path):
                return path

        return None
