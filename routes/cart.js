import express from 'express'
import { addToCart, deleteCart, fetchCartByUser, updateCart } from '../controllers/cart.js'

const router = express.Router()


router.get('/', fetchCartByUser)
    .post('/', addToCart)
    .delete("/:id", deleteCart)
    .patch("/:id", updateCart)

export default router