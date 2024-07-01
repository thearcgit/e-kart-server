import express from "express"

import 'dotenv/config'
import { connectDB } from "./dbConnection.js"
import cors from 'cors'
import logger from "morgan"
import passport from "passport"
import session from "express-session"
import LocalStrategy from "passport-local"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import cookieParser from "cookie-parser"
import Stripe from "stripe"
import path from "path"
import { fileURLToPath } from "url"

import productRouter from "./routes/product.js"
import brandRouter from "./routes/brand.js"
import categoryRouter from "./routes/category.js"
import userRouter from "./routes/user.js"
import authRouter from "./routes/auth.js"
import cartRouter from "./routes/cart.js"
import orderRouter from "./routes/order.js"
import User from "./models/user.js"
import { cookieExtractor, isAuth, sanitizedUser } from "./middlewares/auth.js"

const app = express()
const port = process.env.PORT
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
let opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY || 'secret';

//   webhook calling .........
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = request.headers['stripe-signature'];
    
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_END_POINT);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
            }
            
            // Handle the event
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntentSucceeded = event.data.object;
                    console.log('payment intent succeed',paymentIntentSucceeded)
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });

// middlewares 
// Initialize Passport and restore authentication state, if any, from the session
app.use(express.static(path.resolve(__dirname,"build")))
app.use(cookieParser())
app.use(session({
    secret: process.env.SESSION_SECRET_KEY || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
}));
app.use(passport.authenticate('session'))
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors({
    exposedHeaders: ["X-Total-Count"]
}))
// app.use(express.raw({type: 'application/json'}))
app.use(express.json())
app.use(express.urlencoded())
app.use(logger("dev"))
app.use('/products', isAuth(), productRouter)
app.use('/brands', isAuth(), brandRouter)
app.use('/categories', isAuth(), categoryRouter)
app.use('/users', isAuth(), userRouter)
app.use('/auth', authRouter)
app.use('/cart', isAuth(), cartRouter)
app.use('/orders', isAuth(), orderRouter)


app.get("*",(req,res) => res.sendFile(path.resolve(__dirname,"build","index.html")))


// passport startegies ------------
passport.use('local', new LocalStrategy({
    usernameField: 'email',  // Use 'email' instead of 'username'
    passwordField: 'password'
},
    async function (email, password, done) {


        try {

            const user = await User.findOne({ email })
            if (!user) {
                return done(null, false, { message: "Invalid credentials." })
            }
            const hashedPassword = await bcrypt.compare(password, user?.hashedPassword)
            const token = jwt.sign(sanitizedUser(user), process.env.JWT_SECRET_KEY || 'secret')
            if (hashedPassword) {
                return done(null, {...sanitizedUser(user),token})

            } else {
                return done(null, false, { message: "Invalid credentials." })
            }
        } catch (error) {
            console.log('error', error)
            done(error, false, { message: "Something went wrong." })

        }
    }
));

// Passport jwt strategy...........

passport.use('jwt', new JwtStrategy(opts, async function (jwt_payload, done) {
    try {

        const user = await User.findOne({ _id: jwt_payload.id })
        if (user) {
            return done(null, sanitizedUser(user));
        } else {
            console.log('jwt elso',)
            return done(null, false);
            // or you could create a new account
            }
            } catch (error) {
        console.log('jwt elso',error)

        return done(err, false);
    }


}));

//   Creating session variable req.user ..........

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

//   This is used to populate req.user when called from authorized request..............
passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});
app.post("/create-payment-intent", async (req, res) => {
    const { totalAmount,order } = req.body;
    console.log('payment intent',totalAmount)
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount*100),
      description:"payment intent",
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
      metadata:{
        order
      }
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });




// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

