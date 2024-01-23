

import React from 'react';
import {Swiper , SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import './Coursal.css'
import { sliderSettings } from '../../utils/sliderSettings';
import useProperties from '../../Hooks/useProperties';
import PropertiesCard from '../PropertiesCard/PropertiesCard';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


const Residencies = () => {
  const { isLoading , error , data } = useProperties(2);
  // console.log(data, "from Residency")
const Navigate = useNavigate();
  // const {loader as isLoading , }

  if(isLoading){
    return(
    <div className='flexCenter wrapper' style={{height:"60vh"}}>
       <PuffLoader
       height="80"
       width="80"
       radius={1}
       color="#4066ff"
       aria-label='puff-loading'
       
       />
    </div>
    )
    }
    

  // console.log(data, "data");
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
          </div>

          <Swiper {...sliderSettings}>
            <SliderButtons/>
            { data?.properties?.slice(0,8)?.map((card, i) => {
              // console.log(card, "card");
              // console.log(i, "i");
              return (
                <SwiperSlide key={i}>
  
  <div  key={i} onClick={()=>Navigate(`/Property/${card.id}`)}> 
    {/* <Link to={`/Property?${card.id}`}  >  */}
   <PropertiesCard  card={card}/>
   {/* </Link> */}
   </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

 const SliderButtons =()=>
 {
  const swiper = useSwiper();
  return(
    <div className='r-button'>
      <button onClick={()=>swiper.slidePrev()}> &lt; </button>
      <button onClick={()=>swiper.slideNext()}>&gt; </button>

    </div>
  )
 }