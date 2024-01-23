import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRoute } from './routes/userRoutes.js';
import { resdRoute } from './routes/resdRoutes.js';
import router from './routes/authRoute.js';
import session from 'express-session';
import passport from './passport-confing.js';
import pkg from 'jsonwebtoken'

const {sign} = pkg
dotenv.config();

const PORTS = process.env.PORT;
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(session({ secret: 'omkar_porlikar11', resave: false, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session());
// Routes 

app.use('/api/user/',authRoute);
app.use('/api/residencies/',resdRoute);
app.use('/api' , router)


app.get('/' , (req,res)=>{
    res.send("Nice to see you here again");
    
}  )

app.listen(process.env.PORT, ()=>{
    console.log(`Server has started on port ${PORTS}`)
})