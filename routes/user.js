import express from 'express'
import {  fetchUserById, updateUser } from '../controllers/user.js'

const router = express.Router()


router.get('/:id',fetchUserById).patch('/:id',updateUser)

export default router