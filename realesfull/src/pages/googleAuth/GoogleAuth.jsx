import React from 'react'
import './GoogleAuth.css'
const GoogleAuth = ({type}) => {
  const loginwithgoogle = ()=>{
    console.log(type)
    window.open("http://localhost:8000/api/user/auth/google/callback","_self")
}
  return (
    <>
                <button className='login-with-google-btn' onClick={loginwithgoogle}>
                   { `${type}`} with google  
                </button>    
    </> 
  )
}

export default GoogleAuth

