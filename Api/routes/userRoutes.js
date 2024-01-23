import express  from "express";
import { addFav, bookVisits, cancleBookings, createUser, getAllVisits, getUser,   loginUser } from "../controller/userCntrl.js";
const authRoute = express.Router()
import  verifyToken  from "../middleware/auth.js";
authRoute.get('/getUser/:id', getUser),
authRoute.get('/validate_token', verifyToken)
authRoute.post('/register' , createUser);
authRoute.post('/login' , loginUser);
authRoute.post('/bookings/:id',verifyToken, bookVisits)
authRoute.post('/allVisits',verifyToken ,getAllVisits)
authRoute.post('/cancleBookings/:id',cancleBookings)
authRoute.post('/ToFav/:id', verifyToken,addFav);

export {authRoute} ;
