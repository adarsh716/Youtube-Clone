import express from 'express'

import {uploadVideo,getAllvideos} from '../controllers/video.js'
import {likeController} from '../controllers/like.js'
import {viewController} from '../controllers/views.js'
import {likeVideoController,getAlllikeVideoController,deleteLikeVideoController} from '../controllers/likeVideo.js'
import {watchLaterController,getAllwatchLaterController,deletewatchLaterController} from '../controllers/watchLater.js'
import {HistoryController,getAllHistoryController,deleteHistoryController} from '../controllers/History.js'
import upload from '../Helpers/fileHelpers.js'
import {auth,use} from '../middleware/auth.js'

const routes=express.Router();

routes.post("/uploadVideo",upload.single("file"),uploadVideo)

routes.get("/getvideos",getAllvideos);
routes.patch('/like/:id',likeController)
routes.patch('/view/:id',viewController)

routes.post('/likeVideo',likeVideoController)
routes.get('/getAlllikeVideo',getAlllikeVideoController)
routes.delete('/deleteLikedVideo/:videoId/:Viewer',deleteLikeVideoController)

routes.post('/watchLater',watchLaterController)
routes.get('/getAllwatchLater',getAllwatchLaterController)
routes.delete('/deleteWatchlater/:videoId/:Viewer',deletewatchLaterController)

routes.post('/History',HistoryController)
routes.get('/getAllHistory',getAllHistoryController)
routes.delete('/deleteHistory/:userId',deleteHistoryController)

export default routes;
