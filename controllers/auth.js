import User from "../models/user.js"

export const createUser = async (req, res) => {

    try {

        const user = new User(req.body)
        const docs = await user.save()
        res.status(201).json(docs )
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}
export const loginUser = async (req, res) => {

    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"Invalid credentials"})
        }
        if(password === user.password){

            res.status(200).json({id:user.id })
        }else{
            res.status(401).json({message:"Invalid credentials"})
        }
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}