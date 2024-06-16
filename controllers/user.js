import Category from "../models/category.js"
import User from "../models/user.js"






export const fetchUserById = async (req, res) => {
    const {id} = req.params

    try {
        const user = await User.findOne({_id:id},"name id email addresses role").exec()
        res.status(200).json( user )
    } catch (error) {
        
        console.log('error', error)
        res.status(400).json(error)

    }
}

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(user)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}