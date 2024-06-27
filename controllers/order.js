import Order from "../models/order.js"

export const createOrder = async (req, res) => {
    const {id} = req.user

    try {

        const order = new Order({...req.body,user:id})
        const docs = await order.save()
        res.status(201).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const fetchOrederByUser = async (req, res) => {
    const  {id}  = req.user 


    try {
        const orders = await Order.find({user:id} ).populate("user","name,email role addresses").exec()
        res.status(200).json(orders)
    } catch (error) {

        console.log('error', error)
        res.status(400).json(error)

    }
}
export const fetchAllOrders = async (req, res) => {
    let query = Order.find()
    let queryCount = Order.find()

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
        // queryCount = queryCount.sort({ [req.query._sort]: req.query._order })
    }
    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit
        const page = req.query._page
        query = query.skip(pageSize * (page - 1)).limit(pageSize)
        // queryCount = queryCount.skip(pageSize*(page-1)).limit(pageSize)
    }

    try {
        const orders = await query.exec()
        const ordersCount = await queryCount.countDocuments().exec()
        res.header("X-Total-Count",ordersCount)
        res.status(200).json(orders)
    } catch (error) {

        console.log('error', error)
        res.status(400).json(error)

    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params
        const docs = await Order.findByIdAndDelete(id)
        res.status(200).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(order)
    } catch (error) {
        console.log('errorrrrr', error)
        res.status(400).json(error)

    }
}