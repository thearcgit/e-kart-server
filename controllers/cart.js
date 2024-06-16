import Cart from "../models/cart.js"

export const addToCart = async (req, res) => {

    try {

        const cart = new Cart(req.body)
        const docs = await cart.save()
        const result = await docs.populate("product")
        res.status(201).json(result)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const fetchCartByUser = async (req, res) => {
    const { userId } = req.query

    try {
        const cartItems = await Cart.find({ user: userId }, "quantity user product").populate("user").populate("product").exec()
        res.status(200).json(cartItems)
    } catch (error) {

        console.log('error', error)
        res.status(400).json(error)

    }
}

export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params
        const docs = await Cart.findByIdAndDelete(id)
        res.status(200).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}

export const updateCart = async (req, res) => {
    try {
        const { id } = req.params
        const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true }).populate("product")
        res.status(200).json(cart)
    } catch (error) {
        console.log('errorrrrr', error)
        res.status(400).json(error)

    }
}