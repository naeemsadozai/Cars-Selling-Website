import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './Config/mongoDB.js'
import './Config/passport.js'
import authRoute from './Routes/authRoute.js'
import cookieParser from 'cookie-parser';
import carsRoute from './Routes/carsRoute.js'


const allowedOrigins = [
  "https://cars-selling-website-frontend.vercel.app",
  "https://cars-selling-website.vercel.app",
  "http://localhost:5173"
]

app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/auth',authRoute)
app.use('/cars',carsRoute)



app.listen(8080,()=>{
    console.log("Connected to server");
    

})


