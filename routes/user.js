import express from 'express'
import {  fetchUserById, signout, updateUser } from '../controllers/user.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()


router.get('/',fetchUserById)
.patch('/',updateUser)
.get('/signout',signout)

export default router