import React, { useEffect } from 'react'
import { useUserDetailContext } from '../../Context/userDetailContext'
import useProperties from '../../Hooks/useProperties';
import  PropertiesCard from '../../component/PropertiesCard/PropertiesCard.jsx'
import useUserDetails from '../../Hooks/useUserData.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SearchBar from '../../component/SearchBar/SearchBar.jsx';
import "./Favourites.css"
import { PuffLoader } from 'react-spinners';
// import toLower
function Favourites() {
    const [filter, setFilter] = useState("");

    useUserDetails();

    const Navigate= useNavigate();
    const {userDetails:{favourites} } = useUserDetailContext();
    // favourites
const {data, isLoading} = useProperties(1)

useEffect(()=>{

},[data])

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
// const {data, isLoading , isError}= useProperties()
    return (
        <div className='flexColCenter' style={{backgroundColor:"white", marginTop:"10rem"} }>
              <div className="right search-barBooking">
        <SearchBar filter={filter} setFilter={setFilter} />
        </div>
    <div  className='flexCenter'>
        { favourites.length === 0 ?(
            <p className='show'> No Faviourites to show... </p>
        ):(
           data?.allResd?.filter((val)=>
         favourites.map((favId)=> favId).includes(val.id))
            .filter(
                (property) =>
                  property.title.includes(filter) ||
                  property.city.includes(filter) ||
                  property.country.includes(filter)
              )
              .map((card, i) => (
                 <div onClick={()=> Navigate(`/Property/${card.id}`)} key={i}> 
                <PropertiesCard card={card}/>
               </div>
                ))
       ) }
    </div>
    </div>
  )
}

export default Favourites

