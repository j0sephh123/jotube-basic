# Project Roadmap

This roadmap is used for personal planning and public visibility. Features flow from "Ideas" → "Grooming" → "To Do" → "In Progress" → "Completed".

---

## 📝 Ideas

_Unfiltered, undeveloped concepts. No promises, just possible directions._
- __custom filters__ - url segments that can be used in dashboard or custom dashboards (potentially) to apply quick filters
- __custom dashboards__ - this is very similar to playlists and tags, but the idea is to have a quicker way to few a group of channels or videos. I think it is more mature than tags/playlists for several reasons
  1. it can be channels or videos (possibily other resource)
  2. it can group together resources that don't belong together naturally. For example, let's say that there are channels for cats and dogs. If we have a playlist, then we could potentially have one for both. If we use tags, then we need to create an entirely new tag. So, playlist should be fine, but then I'm not sure if semantically it makes sense to have it call it playlist, maybe it does, don't know yet.
- __clips__ - integrate creation and management of clips very similar to screenshots
- __local videos__ - obviously now only youtube is supported, which is not what we want, so as a start we could try to integrate local videos. A clean approach would be to have Upload functionality, but still need to think about what type of resource to have in the db
- __docker__ - think of ways to add docker
- __shared types__ - this has been done before, but I didn't like it. Now i have a chance again to try it.
- __queue refetch__ - right now we are refetching every 5s, which is obviously not what we want
- __select more than 1 screenshot at a time__ - right now when we process thumbnails, we are not able to select more than one screenshot at a time and if there are 20-30s segments, this is really bad
- __e2e tests__ - add some
- __cache backend responses__ - find a way to cache the responses, since they are very often the same, but we fetch them after refresh
- __use duration__ - we are getting duration from youtube api, but we are not using it
- __fetch arbitrary videos (not all)__ - some channels have many videos and there is no need to fetch all of them.
- __background jobs__ - find a way to fetch in the background - activate by idle or by other event
- __waiting list__ - some form of waiting list implementation. I had one before, but it wasn't good, so I got rid of it
- __accidental delete backup__ - this is valid for deletion of a video or of thumbnail by accident ( has happened a lot of times )
- __activity__ - on the ui have a way to see what the user has done
- __log__ - backeng log
- __statistics page__ - think of some interesting ways to visualise the data, for example compare channels by average amount of screenshots per video and so on.
- __videos page__ - right now there is only a way to obtain channels. It'd be good to have videos as well
- __custom carousel__ - there is no need to use a library for this in particular
- __better notification system__ - right now we have a very basic toast, which is not very good honestly
- __have a way to see favorites__ - perhaps it would be good to have a separate view only for favorite screenshots
- __create conditional wrapper component__ - i always end up creating such one, because it is more readable
- __have a way to transition between thumbnail sizes__ - right now it is hard coded to a specific size.
- __video count update__ - right now there is no way to update videoCount, it is fetched once on start and that's it
- __refactor thumbnails viewer__
- __refactor card__ - have a common card component
- __navigate thumbnails__ - Right now it is not possible to process an arbitrary thumbnail, you need to go 1 by 1
- __fetching uploads better UI__ - right now it is long request, which is not a good UX, but this has never been a priority
- __create reusable composite components for texts__ like Texts.Title and Buttons.Primary
- __Recently viewed channels__
---

## 🔍 To Groom

_Features or improvements under consideration. Need further clarification, requirements, or design._


---

## ✅ To Do

_Clearly defined tasks or features, ready for implementation._

---

## 🚧 In Progress

_Currently being developed._

---

## 🎉 Completed

_Done and merged/released._

---

## ⏸️ Backlog (Optional)

_Features or tasks you’ve deliberately deprioritized but don’t want to forget._

- [ ] [Deferred task or feature]
