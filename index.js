import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import jwt from "jsonwebtoken"

const app = express()

app.use(bodyParser.json())
app.use((request, response, next) => {
    let token = request.header('Authorization')
    
    if(token != null){
        token = token.replace('Bearer ', '')
        jwt.verify(token, 'KV-Screate-20!', (error, decode) => {
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

const databaseURL = "mongodb+srv://kavishkaimalsha:kavi1289@cluster0.vshbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(databaseURL)

const connection = mongoose.connection

connection.once('open', () => {
    console.log('Database connection successfully');
})

app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})

