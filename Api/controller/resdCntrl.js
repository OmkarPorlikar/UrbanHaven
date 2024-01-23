import {prisma} from '../Config/prismaConfig.js'
import express  from "express";
import expressAsyncHandler from "express-async-handler";



// This code only containe CONNECT method 
// hence the user with the email must be exist or else give's error 
// as both residency and user are in relation

// export const createResidency = expressAsyncHandler(async (req, res) => {
//     const {
//       title,
//       description,
//       price,
//       address,
//       country,
//       city,
//       facilities,
//       image,
//       userEmail,
//     } = req.body;
  
//     console.log(req.body.data);
//     try {
//       const residency = await prisma.Residency.create({
//         data: {
//           title,
//           description,
//           price,
//           address,
//           country,
//           city,
//           facilities,
//           image,
//           owner: { connect: { email: userEmail } },
//         },
//       });
  
//       res.send({ message: "Residency created successfully", residency });
//     } catch (err) {
//       if (err.code === "P2002") {
//         throw new Error("A residency with address already there");
//       }
//       throw new Error(err.message);
//     }
//   });

// This code containe CREATE AND CONNECT METHOD

// export const createResidency = expressAsyncHandler(async (req, res) => {
//     const {
//       title,
//       description,
//       price,
//       address,
//       country,
//       city,
//       facilities,
//       image,
//       userEmail,
//     } = req.body;
  
//     console.log(req.body.data,"From 64");
//     try {
//       const residency = await prisma.Residency.create({
//         data: {
//           title,
//           description,
//           price,
//           address,
//           country,
//           city,
//           facilities,
//           image,
//           owner: {
//             connectOrCreate: {
//               where: { email: userEmail },
//               create: {
//                 // Specify user data here if creating a new user
//                 email: userEmail,
//                 // Other user data...
//               },
//             },
//           },
//         },
//       });
  
//       res.send({ message: "Residency created successfully", residency });
//     } catch (err) {
//       if (err.code === "P2002") {
//         res.status
//         (500).json({message:"A residency with the given address already exists"})
//         throw new Error("A residency with the given address already exists");
       
//       }
//       console.log(err,"error from 96")
//       throw new Error(err.message);
//     }
//   });
  

export const createResidency = expressAsyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    throw new Error(err.message);
  }
});




export const getAllResd = expressAsyncHandler(async (req, res) => {
  try {
    const page = req.params.page ? parseInt(req.params.page, 10) : 1;
    // console.log(page,"page s")
    const itemsPerPage = 10;

    const skip = (page - 1) * itemsPerPage;

       const allResd =  await prisma.residency.findMany({
      orderBy:{
        createdAt:"desc"
      }
    })

    // Fetch properties for the current page
    const properties = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc"
      },
      skip: skip,
      take: itemsPerPage
    });

    // Count total number of properties
    const totalPropertiesCount = await prisma.residency.count();

    res.status(200).json({
      properties,
      totalPropertiesCount,
      allResd
    });
  } catch (error) {
    console.error("Cannot get the Residencies", error);
    res.status(500).json({ message: "Something went wrong while getting the residencies" });
  }
});


export const  getSingleResd = expressAsyncHandler(async (req,res)=>{
  const id = req.params.id;
// console.log(id,"id")
  const singleResd = await prisma.Residency.findUnique({
where: {
  id:id
}
  })
res.status(201).json(singleResd)
})



export const deleteListing = expressAsyncHandler( async(req,res)=>{
  const {email } = req.body;
  const id = req.params.id
     
  console.log(email,"From delete email")
  console.log(id," id From delete ")
  
  const listing = await prisma.residency.findUnique({
    where:{id:id}
  })
  
  if(listing.userEmail === email){
  
    const update = await  prisma.residency.delete({
      where:
      {id:id},
    })
    res.status(201).json({message:"residency deleted" , update})
  }
  else{
    res.status(500).json({message:"Error while deleting the id" })
  }
  
    })

    export const editListing = expressAsyncHandler(async (req, res) => {
      const {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail,
      } = req.body.data;
    
      console.log(userEmail,"from 207")
      const id = req.params.id;
    try {
      const user = prisma.user.findUnique({
        where:{
          email:userEmail
        }
      })

      try {
        // Check if the residency with the given ID exists
        const existingResidency = await prisma.residency.findUnique({
          where: {
            id: id,
          },
        });
    
        if (!existingResidency) {
          // Return a 404 status code if the residency is not found
          return res.status(404).json({ message: 'Residency not found' });
        }
    
        // Update the residency
        const updatedResidency = await prisma.residency.update({
          where: {
            id: id,
          },
          data: {
            title,
            description,
            price,
            address,
            country,
            city,
            facilities,
            image,
            owner: { connect: { email: userEmail } },
          },
        });
    
        res.status(201).json({ message: 'Residency has been updated', residency: updatedResidency });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Cannot update residency', error: error.message });
      }
    }
    catch(error){
      throw Error("User not Found")
    }
    });
    


















// This code for creating residency is not working 

// export const createResidency = expressAsyncHandler (async (req, res) =>{
//   console.log("the code is working")
// const {owner , ...resData} = req.body;
// const {userEmail} = req.body;
// //  console.log(...resData ,"data");
// console.log(resData ,"data1");
// try{
// console.log("inside try")
// const resd = await prisma.Residency.create({
//   data :{
//   ...resData,
//   owner : {connect : {email : userEmail} } 
// }
// });
// console.log("Residency created successfully:", resd);
// res.status(201).json({message:"property has been added"}, resd)
// }
// catch(err)
// {
//   if(err.code == "P2002"){
//       res.status(500).json({message:"The property is alredy posted"}) 
//   }
//   else {
//       res.status(500).json({ message: "Some error occurred while posting the property" });
//       throw new Error("Some error occurred while posting the property");
//     }
//   }
// })