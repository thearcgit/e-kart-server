import { sanitizedUser } from "../middlewares/auth.js"
import User from "../models/user.js"
import bcrypt from "bcryptjs"

export const createUser = async (req, res) => {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)


    try {

        const user = new User({ ...req.body, hashedPassword })
        const docs = await user.save()
        res.status(201).json(sanitizedUser(docs))
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)

    }
}
export const loginUser = async (req, res) => {
    const { id, role } = req.user
    res.cookie('jwt',
        req.user.token,
        {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        })
        .status(200)
        .json(sanitizedUser(req.user))
}
export const checkAuth = async (req, res) => {
    console.log('session',req.session)
    if (req.user) res.status(200).json(sanitizedUser(req.user))
    else res.sendStatus(401)
}