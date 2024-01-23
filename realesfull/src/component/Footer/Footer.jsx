import React, { useEffect } from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';
import { useMyContext } from '../../Context/Contex';
export default function Footer() {

  const {dispatch} = useMyContext();
  const location = useLocation();

  
  
  
   useEffect(()=>{
    const queryParams = new URLSearchParams(location.search);
    let userProfile = JSON.parse(decodeURIComponent(queryParams.get('user')));
    if(userProfile){
      console.log("inside the login sucess")
      dispatch({type:'LOGIN_SUCCESS' , payload:userProfile})
      window.location.href = "/";
    }
   },[])

  return (

    <section className="f-wrapper">
        <div className="f-wrapper">
  <div className="paddings innerWidth flexCenter f-container">
    <div className="flexColStart f-left">
      <img src="./images/logo2.png" alt="Homyz Logo" width="120" />
      <span className="secondaryText">Our vision is to make all people <br />
      the best place to live for them.</span>
    </div>
    <div className="flexColStart f-right">
      <span className="primaryText">Information</span>
      <span className="secondaryText">145 New York, FL 5467, USA</span>
      <div className="flexCenter f-menu">
        <span>Property</span>
        <span>Services</span>
        <span>Product</span>
        <span>About Us</span>
      </div>
    </div>
  </div>
</div>

    </section>

    )
}
