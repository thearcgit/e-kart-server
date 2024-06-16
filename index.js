import express from "express"

import 'dotenv/config'
import { connectDB } from "./dbConnection.js"
import cors from 'cors'
import logger from "morgan"

import productRouter from "./routes/product.js"
import brandRouter from "./routes/brand.js"
import categoryRouter from "./routes/category.js"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import cartRouter from "./routes/cart.js"
import orderRouter from "./routes/order.js"

const app = express()
const port = process.env.PORT 

connectDB()

// middlewares 
app.use(cors({
    exposedHeaders:["X-Total-Count"]
}))
app.use(express.json())
app.use(logger("dev"))
app.use('/products',productRouter)
app.use('/brands',brandRouter)
app.use('/categories',categoryRouter)
app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use('/cart',cartRouter)
app.use('/orders',orderRouter)


app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})

