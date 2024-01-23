import React, { useEffect, useState } from 'react'
import './Hero.css'
import CountUp from 'react-countup'
import {motion} from 'framer-motion'
import SearchBar from '../SearchBar/SearchBar'
import { json, useLocation } from 'react-router-dom'
import { useMyContext } from '../../Context/Contex'

export default function Hero() {
const [filter , setFilter] = useState("");



    return (
      <section className='hero-wrapper'>  
          <div className=' paddings flexCenter  innerWidth hero-container '>

     <div className='flexColStart hero-left'> 
     <div className=" hero-title">      
     
           <div className="orange-circle"> </div>    
           <motion.h1 className='title'
           initial={{y:"2rem", opacity:0}}
           animate = { {y:0 , opacity:1 } }
           transition={
 {
    duration:2,
    type:"spring"
 }

           }
           >
             Discover <br /> Most Suitable <br />Property</motion.h1>
       </div> <br />
  
           <p className='flexColStart desc secondaryText '>Find a variety of properties that suit you very easilty<br />
  Forget all difficulties in finding a residence for you</p>

   <SearchBar filter={filter} setFilter={setFilter} />
  


          <div className="flexCenter stats">
    
              <div className="flexColCenter stat">
                  <p className='nums'>   <CountUp start={8800} end={9000} duration={4}/> <span className='plus'> + </span></p>
                  <span className=' secondaryText  desc-tags' > Premium Product</span>
              </div>
  
              <div className="flexColStart stat">
                  <p className='nums'> <CountUp start={1800} end={2000} duration={4}/> <span className='plus'> + </span> </p>
                  <span className=' secondaryText  desc-tags'> Happy Customer</span>
              </div>
              <div className="flexColStart stat">
                  <p  className='nums'> 28 + </p>
                  <span className='secondaryText  desc-tags'> Awards Winning</span>
              </div>
  
          </div>
          </div>


          <div className="hero-right flexCenter"> 
          < motion.div className="image-container"
          initial= { {x:"7rem", opacity:0} }
          animate= { {x:0, opacity:1} }

          transition={
            {
               duration:2,
               type:"ease-in"
            }
        }
          
          >  
          <img src="./images/hero-image.png" alt=" hero-image" className='image' />
          </motion.div>
          </div>
          </div>

  
      </section>
    )
  }
  