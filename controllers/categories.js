import Category from "../models/category.js"



export const createCategory = async (req, res) => {

    try {

        const category = new Category(req.body)
        const docs = await category.save()
        res.status(201).json(docs )
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const fetchAllCategories = async (req, res) => {

    try {
        const categories = await Category.find({}).exec()
        res.status(200).json( categories )
    } catch (error) {
        
        console.log('error', error)
        res.status(400).json(error)

    }
}