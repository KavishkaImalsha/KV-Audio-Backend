import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import reviewRoutes from "./routes/reviewRoutes.js"
import inquiriesRoutes from "./routes/inquiriesRoutes.js"
import cors from 'cors'

dotenv.config()

const app = express()

const corsOptions = {
    origin: "https://kv-audio-frontend-mauve.vercel.app", // Allow only your frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If using authentication (e.g., cookies, JWT)
};
  
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use((request, response, next) => {
    let token = request.header('Authorization')
    
    if(token != null){
        token = token.replace('Bearer ', '')
        jwt.verify(token, process.env.ENC_PASS, (error, decode) => {
            if(!error){
                request.user = decode  
            }else{
                response.json({
                    error : error
                })
            }
        })
    }
    next()
})

const databaseURL = process.env.MONGO_URL

mongoose.connect(databaseURL)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('Database connection successfully');
})

app.use('/api/user', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/inquiries', inquiriesRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
