import Brand from "../models/brand.js"

export const createBrand = async (req, res) => {

    try {

        const brand = new Brand(req.body)
        const docs = await brand.save()
        res.status(201).json( docs )
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}


export const fetchAllBrands = async (req, res) => {

    
    try {
        const brands = await Brand.find().exec()
        res.status(200).json( brands )
    } catch (error) {
        
        console.log('error', error)
        res.status(400).json(error)

    }
}