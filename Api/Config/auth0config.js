import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience:"http://localhost:8080",
    issuerBaseURL:"https://dev-kw28zlx6mh4zq3bp.us.auth0.com",
    tokenSigningAlg:"RS256"

})

export default jwtCheck;
// import { auth } from 'express-oauth2-jwt-bearer';

// const jwtCheck = auth({
//     audience: 'http://localhost:8080',
//     issuerBaseURL: 'https://dev-kw28zlx6mh4zq3bp.us.auth0.com',
//     tokenSigningAlg: 'RS256',
//   });
  
//   jwtCheck.on('error', (err, req, res, next) => {
//     console.error('JWT Check Error:', err);
//     // Handle the error response as needed
//     res.status(401).json({ error: 'Unauthorized' });
//   });
  
//   export default jwtCheck;
  
// Import necessary modules and dependencies
import express from 'express';
// import jwtCheck from '../Config/auth0Config.js'; // Correct path to auth0Config.js
// import jwtCheck from '../Config/'
import expressAsyncHandler from "express-async-handler";
import {prisma} from '../Config/prismaConfig.js'


