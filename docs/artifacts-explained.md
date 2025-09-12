```prisma
enum ArtifactType {
  VIDEO
  SAVED
  DOWNLOADED
  STORYBOARD
  THUMBNAIL
  SCREENSHOT
}
```

### Before 
I was using `status` in order to capture what is happening with an upload - the transitions between the different states.
For example:  
- `0` was when we inject it from YT API in the db
- `1` when it is `saved`. This happens after the initial screening of all uploads. They are either saved or deleted.
- `2` when it is `processed`, which means that it has been downloaded, the screenshots have been generated for it and then the chosen ones have been saved.  
__Why it is not enough__
It is obvious that these statuses are not enough to capture all states of an upload. That's why I introduced another way to keep track (artifact).

### `artifact` for an upload
It is not the correct word, but refactoring it out will take a lot of time.  
- __VIDEO__: after channel uploads are fetched.
`fetchUploads` is getting uploads from a channel, doing some filtering based on time and then creates UploadVideo and adds a relation to the channel, which is also created.
- __SAVED__: the users pick which uploads they want to save or delete
- __DOWNLOADED__: not used right now. When it was introduced, the idea was to keep track if there is a downloaded video, since I was not doing all processing at once. Downloading and capturing screenshots were separate (now it is all 1 op)
- __STORYBOARD__: using `ytdlp` we are able to obtain storyboard link for a video. However it comes with different sizes and items, so that's why is it kept in the db. It is convenient to filter uploads based on if they have it. 
- __THUMBNAIL__: when a video is processed, we are generating thumbnails, which we use in ManualPicker in order to choose the screenshots that are needed
- __SCREENSHOT__: the final state, when the needed screenshots for an upload are chosen and the others are deleted along with thumbnails and the video.

### `artifact` for TV/episodes
__WORK IN PROGRESS__
I haven't started implementing it yet. I didn't put much thought initially, which was a mistake and now i need to rethink it again in order to avoid some mistake.
- __SAVED__: when the episode is created
- __THUMBNAIL__: when the thumbnails are created
- __SCREENSHOT__: when the screenshots are selected