import Order from "../models/order.js"

export const createOrder = async (req, res) => {

    try {

        const order = new Order(req.body)
        const docs = await order.save()
        res.status(201).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const fetchOrederByUser = async (req, res) => {
    const  userId  = req.query 

    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
        // queryCount = queryCount.sort({ [req.query._sort]: req.query._order })
    }

    try {
        const orders = await Order.find({ user: userId }, ).populate("user").exec()
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