import Product from "../models/product.js"

export const createProduct = async (req, res) => {

    try {

        const product = new Product(req.body)
        const docs = await product.save()
        res.status(201).json(docs )
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}

export const fetchAllProduct = async (req, res) => {
    let isAdmin = {}
    if(!req.query.admin){
        isAdmin.deleted={$ne:true}
    }

    let query = Product.find(isAdmin)
    let queryCount = Product.find(isAdmin)
    if (req.query.category) {
        query = query.find({ category: req.query.category })
        queryCount = queryCount.find({ category: req.query.category })
    }
    if (req.query.brand) {
        query = query.find({ brand: req.query.brand })
        queryCount = queryCount.find({ brand: req.query.brand })
    }
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



        const docs = await query.exec()
        const docsCount = await queryCount.countDocuments().exec()
        res.header("X-Total-Count", docsCount)
        res.status(200).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }


}

export const fetchProductById = async (req, res) => {

    try {
        const {id} = req.params
        const docs = await Product.findById(id)
        res.status(200).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)
    }
}
export const updateProduct = async (req, res) => {

    try {
        const {id} = req.params
        const docs = await Product.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(docs)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}