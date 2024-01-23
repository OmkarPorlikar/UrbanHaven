import express  from "express";
const resdRoute = express.Router()
import { createResidency, deleteListing, editListing,  getSingleResd } from "../controller/resdCntrl.js";
import { getAllResd } from "../controller/resdCntrl.js";
import  verifyToken  from "../middleware/auth.js";

resdRoute.post('/create', verifyToken,createResidency);
resdRoute.get('/allResd/:page', getAllResd)
resdRoute.get('/single/:id', getSingleResd)
resdRoute.post('/delete_Listing/:id',deleteListing)
resdRoute.post('/edit_Listing/:id',editListing)

export {resdRoute} ;
