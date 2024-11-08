import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import UserRoute from './Routes/UserRoute'
import TripRoute from './Routes/TripRoute'
import AdminRoute from './Routes/AdminRoute'
import ReviewsRoute from './Routes/ReviewsRoute'

dotenv.config()
const app = express();

const PORT = process.env.PORT || 3000

const mongoUrl = process?.env?.MONGO_URL
if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
}

// connect to mongoose
mongoose.connect(mongoUrl)
mongoose.connection.on('connected',()=>{console.log('mongoDB connection established');})
mongoose.connection.on('error',()=>{console.log('connection error');})

// middleware
app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res) => { res.send('Welcome hello worldss')})
app.use('/user', UserRoute)
app.use('/trip', TripRoute)
app.use('/admin', AdminRoute)
app.use('/reviews', ReviewsRoute)


app.listen(PORT, ()=> {
    console.log(`listening on port http://localhost:${PORT}`)
})