import React from 'react'
import './Card.css'
import axios from 'axios'
import {AiFillHeart} from 'react-icons/ai'
export default function Card({card}) {


    return (
      <div className="flexColStart r-card">
      <img src={card.image} alt="home" />
      <div className="heart">  
      <AiFillHeart size={24}/>
      </div>
      <span className="secondaryText r-price">
        <span style={{ color: 'orange' }}>$</span>
        {card.price}
      </span>
      <span className="primaryText">{card.name}</span>
      <span className="secondaryText">{card.detail}</span>
    </div>
  )
}
