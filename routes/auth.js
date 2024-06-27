import express from 'express'
import { checkAuth, createUser, loginUser } from '../controllers/auth.js'
import passport from 'passport'
import { userSignupAuth } from '../middlewares/auth.js'

const router = express.Router()


router.post('/signup',userSignupAuth, createUser)
    .post('/login', passport.authenticate('local',), loginUser)
    .get('/checkAuth',passport.authenticate('jwt'), checkAuth)


export default router