import {toast} from 'react-toastify';
import axios, { AxiosHeaders } from "axios";
import dayjs from 'dayjs';
import { useAsyncError } from 'react-router-dom';

const api = axios.create({
    baseURL: "https://urban-haven-backend.vercel.app/api"
    
})

export const getUser = async(id) =>{
  try{
  const response = await api.get(`/user/getUser/${id}`)
  return response.data
  }catch(err){
    console.log(err,"from get user")
  }
}

export const validate_Token = async(token) =>{
  try{
 const response = await api.get(`/user/validate_token` ,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return response;
  }catch(err){
    console.log(err,"from get user")
   throw err
  }
}



  // Update the getAllProperties function to accept a page parameter
export const getAllProperties = async (page) => {
  try {
    const response = await api.get(`/residencies/allResd/${page? page : 1}`, {
      // params: { page }, // Pass the page as a query parameter
      timeout: 10 * 2000,
    });
// console.log(page,"page")
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    if (error.response?.statusText === 'Internal Server Error') {
      // toast.error('Network Error');
    }
    throw error;
  }
};

  export const getProperty = async(id) =>{
    try{
    const response = await api.get(`/residencies/single/${id}`)
    return response.data;
    }
    catch(error){
      toast.error("Something went wrong while getting property",{
        position: "bottom-left",
        autoClose: 2000,
        })
throw error;
    }}
  



export const createUser = async(username, email , password )=>{
  console.log(username , "name")
  console.log(email , "email")
  console.log(password , "password")
  // console.log(token, "token from  create user")
  try{
    console.log("inside try bolck form create user")
  const response = await api.post('user/register', { 
    username,
    email,
    password
   } )
return response;
  }
  catch(error){
console.error(error,"Cannot register user")
throw error
  }
}

export const loginUser = async(email  , password )=>{
console.log(email ,"login email")
console.log(password ,"login pass")
  try{
    console.log("inside try bolck form create user")
  const response = await api.post('user/login', {  
    email,
    password
  })
return response;
  }
  catch(error){
console.error(error,"Cannot register user")
throw error
  }
}


export const bookVisits = async(date, propertyId , email , token)=>{
  try {
 await api.post(`user/bookings/${propertyId}`, 
 {date:dayjs(date).format("DD/MM/YYYY"),
  id:propertyId, 
  email
} , {
 
  headers:{
    Authorization: `Bearer ${token}`
  }
 })
  }
  catch(error){
// toast.error("Something when wrong , While booking Visit !")
throw error ;
  }
}

export const cancleBookings = async( id , email , token)=>{
  console.log(id,"from cancle")
  try {
 await api.post(`user/cancleBookings/${id}`, 
 {
  id:id, 
  email
} , {
 
  headers:{
    Authorization: `Bearer ${token}`
  }
 })
  }
  catch(error){
// toast.error("Something when wrong , While booking Visit !")
throw error ;
  }
}

// Api call to Add and Remove the Favourites



export const toFav = async( id , email , token)=>{
  console.log(id,"from to fav")
  console.log(email,"From toFav")
  console.log(token , "token api")
  try {
 await api.post(`user/ToFav/${id}`, 
 {
  id:id, 
  email
} , {
 
  headers:{
    Authorization:`Bearer ${token}`
  }
 })
  }
  catch(error){
// toast.error("Something when wrong , While booking Visit !")
throw error ;
  }
}

export const createResidency = async (data, token) => {
  console.log(data ,"from create")
  console.log(token,"From create")
  try{
    const res = await api.post(
      `/residencies/create`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }catch(error)
  {
    throw error
  }
}


export const edit_Listing = async ( id ,data, token) => {
  console.log(data ,"from create")
  // console.log(token,"From create")
  try{
    const res = await api.post(
      `/residencies/edit_Listing/${id}`,
      {
        data
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }catch(error)
  {
    throw error
  }
}



export const del_Listing = async ( data) => {
  console.log(data ,"from create")
  // console.log(token,"From create")
  console.log(data?.userEmail , "del")
  console.log(data?.id , "Del")
  try{
    const res = await api.post(
      `/residencies/delete_Listing/${data?.id}`,
      {
email:data?.userEmail
      }
    )
    toast.success('Property has been deleted !')
  }catch(error)
  {
    throw error
  }
}


