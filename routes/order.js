import express from 'express'
import {  createOrder, deleteOrder, fetchAllOrders, fetchOrederByUser, updateOrder } from '../controllers/order.js'

const router = express.Router()


router.get('/', fetchOrederByUser)
    .post('/', createOrder)
    .delete("/:id", deleteOrder)
    .patch("/:id", updateOrder)
    .get("/admin", fetchAllOrders)

export default router