import express from 'express'
import { createCategory, fetchAllCategories } from '../controllers/categories.js'

const router = express.Router()


router.get('/',fetchAllCategories).post('/',createCategory)

export default router