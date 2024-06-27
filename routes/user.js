import express from 'express'
import {  fetchUserById, updateUser } from '../controllers/user.js'
import { isAuth } from '../middlewares/auth.js'

const router = express.Router()


router.get('/',fetchUserById)
.patch('/',updateUser)

export default router