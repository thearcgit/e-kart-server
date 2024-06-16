import express from 'express'
import { createBrand, fetchAllBrands } from '../controllers/brands.js'

const router = express.Router()


router.get('/',fetchAllBrands).post('/',createBrand)

export default router