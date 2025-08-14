## Types of errors from `ytdlp`

### 1) Bad input / URL problems

* Non-existent/removed video, typo in ID, private/unlisted without access.
* Playlist/channel URL that now redirects or returns HTML yt-dlp can’t parse.
* **Symptoms:** “Video unavailable”, “Extractor failed”, 404s.
* **Mitigate:** Verify IDs, prefer canonical watch URLs, keep yt-dlp up to date.

### 2) Network / HTTP failures

* DNS issues, TLS/cert errors, timeouts, connection reset, proxy problems.
* **Symptoms:** `HTTP Error 4xx/5xx`, timeouts, SSL handshake failures.
* **Mitigate:** Retry with backoff; check proxy; set timeouts; ensure system CA bundle.

### 3) Rate limiting / throttling

* YouTube slow-throttles or returns 429 “Too Many Requests”.
* **Symptoms:** Extremely slow download, 429, segments stalling.
* **Mitigate:** Add retries/sleep, use cookies, avoid high concurrency, update yt-dlp.

### 4) Geo-blocks / age / purchase / membership gates

* Region restriction, “Sign in to confirm your age”, members-only, rentals.
* **Symptoms:** “Video is not available in your country”, “This video requires purchase”.
* **Mitigate:** Use valid account cookies (with permission), VPN for legal geos, or skip.

### 5) Auth / cookies problems

* Invalid/expired cookies, 2FA flows, cookie extraction from browser fails (profile locked, keyring not accessible, no Chrome).
* **Symptoms:** “Login required”, `BrowserCookieError`.
* **Mitigate:** Prefer a `cookies.txt`; avoid `cookiesfrombrowser` on servers; refresh cookies.

### 6) DRM / protected streams

* Widevine/PlayReady DRM isn’t supported.
* **Symptoms:** “Unsupported DRM” / “no such format”.
* **Mitigate:** You generally can’t; skip.

### 7) Format selection issues

* Your `-f` (or `video_formats`) requests something that doesn’t exist (codec/container/quality not available), or filters exclude everything.
* **Symptoms:** “requested format not available”, empty format list.
* **Mitigate:** Loosen the spec (e.g., `bv*+ba/b`), drop strict codec constraints, inspect `yt-dlp -F URL`.

### 8) Post-processing / merge failures

* `ffmpeg`/`ffprobe` missing; bad PATH; incompatible codecs for chosen container; metadata setting fails.
* **Symptoms:** `PostProcessingError`, “ffmpeg not found”, “Conversion failed”.
* **Mitigate:** Install ffmpeg; set `merge_output_format` to a compatible container (e.g., `mp4`); keep disk space free.

### 9) Disk / filesystem

* No write perms, path too long, illegal characters, disk full, temp dir issues.
* **Symptoms:** `PermissionError`, `OSError: No space left on device`, “File name too long”.
* **Mitigate:** Sanitize paths, ensure free space, writable temp and output dirs.

### 10) Live / premiere timing

* Stream not started/ended; no DVR; fragments pruned.
* **Symptoms:** “This live event will begin in…”, missing segments.
* **Mitigate:** Poll until live; for VOD wait until processing completes.

### 11) Playlist/channel pagination

* Some entries gone, private items, rate-limited pages; `--max-downloads` reached.
* **Symptoms:** Partial downloads, “Reached download limit”.
* **Mitigate:** Increase limits/retries; handle missing entries; rerun with `--playlist-items` filters if needed.

### 12) Subtitles / thumbnails / metadata fetch

* Track not available or language code mismatch; server rejects thumbnail.
* **Symptoms:** Errors during “Downloading subtitles” or “thumbnail”.
* **Mitigate:** Request available langs; set `--no-write-sub --no-write-thumbnail` if you don’t need them.

### 13) External downloader hiccups

* If you configure aria2c/curl as external downloader and it’s missing/misconfigured.
* **Symptoms:** “External downloader failed”.
* **Mitigate:** Remove the external downloader setting or install/configure it.

### 14) Hooks / callbacks (your code)

* Progress hook or your callback raises.
* **Symptoms:** Download aborts mid-way with a Python exception from your hook.
* **Mitigate:** Wrap hooks in try/except and swallow/log.

### 15) yt-dlp version / site changes

* YouTube changes markup/cipher; extractor temporarily breaks.
* **Symptoms:** “Unable to extract …”, “Signature extraction failed”.
* **Mitigate:** Upgrade yt-dlp to the latest build; sometimes wait for a fix.

---

#### What to log for fast triage

* URL/ID, chosen `format`, final resolved format(s).
* `yt-dlp --version`, ffmpeg version, OS.
* Full exception traceback (you already do this).
* Response code if HTTP error; disk free space at start.

If you want, I can add a small “error classifier” around your `except` that inspects the exception and logs a simple reason code (`NETWORK`, `AUTH`, `FORMAT`, `POSTPROC`, `FS`, `RATE_LIMIT`, `GEO`, `DRM`, `LIVE`, `HOOK`, `UNKNOWN`) so your monitoring has clean stats.
