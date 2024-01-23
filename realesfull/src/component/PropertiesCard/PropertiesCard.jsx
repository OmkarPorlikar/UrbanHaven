import React, { useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import './PropertiesCard.css'
import Heart from '../Heart/Heart';
import useUserDetails from '../../Hooks/useUserData';

function PropertiesCard({card}) {
  // console.log(card,"from card")
  // console.log(card.id,"id from card")
useUserDetails();

  return (
    <div className="flexColStart r-cards" >
       <div className="heart">
   <Heart id={card.id} />
   </div>
   <img src={card.image} alt="home" />
  
   <span className="secondaryText r-price">
     <span style={{ color: 'orange' }}>${card.price}</span>
   </span>
   <span className="primaryText">{card.title?.slice(0,15)+"..."}</span>
   <span className="secondaryText">{card.description?.slice(0,100)+"..."}</span>

   {/* Assuming you have facilities in the card object */}
  
 </div>

    )
}

export default PropertiesCard