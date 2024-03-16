import express from 'express'
import {register,login, subscribeToUser, unsubscribeFromUser} from '../controllers/auth.js'
import { updateChanelData,getAllChanels } from '../controllers/chanel.js';

const routes = express.Router();

routes.post('/login',login)
    .post('/register',register)
    .post('/subscribe/:userId/:targetUserId', subscribeToUser)
    .post('/unsubscribe/:userId/:targetUserId',unsubscribeFromUser)
    .patch('/update/:id',updateChanelData)
    .get('/getAllChanels',getAllChanels)

export default routes;