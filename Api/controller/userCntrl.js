

import {prisma} from '../Config/prismaConfig.js'
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import pkg from 'jsonwebtoken'
import passport from  '../passport-confing.js';

const {sign} = pkg
export const getUser = expressAsyncHandler(async (req ,res)=>{
const id = req.params.id

try{
  const user = await prisma.user.findUnique({ where: { id: id } });
  res.status(201).json({user})
}catch(err){
  console.log(err)
res.status(404).json({message1:"user not found"})
}

}) 


export const createUser =   expressAsyncHandler( async (req, res) => {
  console.log("inside the register")
  console.log(req.body.email , "user email")
  console.log(req.body.name , "user name")
  console.log(req.body.password , "user password")
try {
  // Check if user with the same username already exists
  const existingUser = await prisma.user.findUnique({
    where: { email : req.body.email },
  });

  if (existingUser) {
    // If user already exists, return a 400 status with an error message
    console.error('User already exists');
    return res.status(400).json({error:"User alredy Exist"});
  }

  // If user does not exist, proceed with registration
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(req.body.password, salt);

  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
      image:""
    },
  });

  res.status(201).json(user);
} catch (err) {
  // Handle any other potential errors
  console.error(err);
  res.status(500).json({ error: 'Please Provide all data' });
}
});



// Login User
 export const loginUser = expressAsyncHandler(async (req, res) => {
console.log("indie  the login")
console.log(req.body.email , "user email")
try {
  const userData = await prisma.user.findUnique({
    where: { email: req.body.email },
  });

  if (!userData) {
    return res.status(400).json('Wrong Email');
  }

  const userPass = await bcrypt.compare(req.body.password, userData.password);

  if (!userPass) {
    return res.status(400).json('Wrong Password');
  }
  const { password, ...tokenObject } = userData;
  const token = sign(tokenObject, process.env.SECRET, { expiresIn: '6h' });
  // Exclude password from the response
  // console.log(tokenObject,"other user")

  return res.status(200).json({token , tokenObject});
} catch (err) {
  console.error('Login failed', err);
  return res.status(500).json({ error: err.message });
}
})


//  export const googleAuth  = expressAsyncHandler((req, res, next) => {
//   console.log('Inside the Google auth route');
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// });

// Handling Google authentication callback


// export  const googleCallback = expressAsyncHandler(
//   console.log("in google callback"),
//   passport.authenticate('google', {
//     failureRedirect: 'http://localhost:3000/login',
//   }),
//   (req, res) => {
//     // Extract relevant user data
//     console.log(req.user , "bap re")
//     const { username, email, profilePic ,id} = req.user;
//     // Create sanitized user object
//     const tokenObject = {
//       id,
//       name:username,
//       email,
//       image:profilePic,
//       auth:"google Auth"
//     };
//     const token = sign(tokenObject, process.env.SECRET, { expiresIn: '6h' });

//     // Redirect to home page with sanitized user data in query parameters
//     const userData = JSON.stringify({token , tokenObject});
//     console.log(userData, "bapu user")
//     res.redirect(`http://localhost:3000?user=${encodeURIComponent(userData)}`);
//   }
// );



export const bookVisits = expressAsyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});


export const getAllVisits = expressAsyncHandler(async  (req, res) =>{
const {email} = req.body;

try {
const visists =  await prisma.User.findUnique({
    where:{email},
    select: {bookedVisits:true}
})
console.log(visists,"from getAllVisits")
res.status(201).send(visists);
}
catch(error){
res.status(400).json({message:"cannot get all Visists"})
}

})




export const cancleBookings = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  console.log(email,"from cancle Bookings")
  console.log(id,"from cancle Bookings")

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((visit) => visit.id === id);

    if (index === -1) {
      console.log("booking not found")
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: {
          bookedVisits: user.bookedVisits,
        },
      });

      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err);
  }
});
// add and remove the favourite 
// This one is not working now


// export const addFav = expressAsyncHandler( async (req, res)=>{
//   console.log("add fav")
//     const {email} = req.body;
//     const resId  = req.params.id;
//     console.log(email,"from 227")
//     console.log(resId,"resId")
//     // console.log(resId,"id")

//     try{
//         const user = await prisma.user.findUnique({
// where:{email},select: {  favResidenciesiD:true}
//         })

// if(user.favResidenciesiD.includes(resId)){
//     console.log("inside if ")
//     const index = user.favResidenciesiD.findIndex( (fav)=>(fav.id === resId));

//     user.favResidenciesiD.splice(index,1)
//      const userFav = await prisma.user.update({
//         where:{email},
//         data:user.favResidenciesiD
//     })
    
//     res.status(201).json({message:"The Residency successfully removed form favourite "})

// }

// else{
//         console.log("inside else")
//     const userFav = await prisma.user.update({
//         where:{email},
//         data:{ favResidenciesiD: {push:resId} }
//     })
// res.status(201).json({message:"successfully liked the Residency"})
// }

// } 
//     catch(error){
//       console.log("from 259", error)
//         res.status(500).json({message:"something went wrong with favratoure"})
//     }
// })

export const addFav = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
console.log(email,id, "From addFAv")
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
console.log(user,"from add fav")
    if (user.favResidenciesiD.includes(id)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesiD: {
            set: user.favResidenciesiD.filter((rid) => rid !== id),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesiD: {
            push: id,
          },
        },
      });
      res.send({ message: "Updated favorites", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});


// To get all the favourites 
export const getAllFavorites = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const favResd = await prisma.user.findUnique({
        where: { email },
        select: { favResidenciesiD: true },
      });
      res.status(200).send(favResd);
    } catch (err) {
      throw new Error(err.message);
    }
  });
  
  