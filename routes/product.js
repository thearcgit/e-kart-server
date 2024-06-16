import express from 'express'
import { createProduct, fetchAllProduct,fetchProductById, updateProduct } from '../controllers/product.js'

const router = express.Router()



router.post('/', createProduct)
    .get('/', fetchAllProduct)
    .get("/:id",fetchProductById)
    .patch("/:id",updateProduct)

export default router