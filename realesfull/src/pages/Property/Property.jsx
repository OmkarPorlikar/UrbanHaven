// import axios from 'axios'
import { useState, useEffect } from 'react'
import './Property.css'

import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { edit_Listing, getProperty } from '../../utils/api';
import useAuthCheck from '../../Hooks/useAuthCheck';
import { useMyContext } from '../../Context/Contex';
import BookingModel from '../../component/BoookingModel/BookingModel';
import { cancleBookings } from '../../utils/api';
import { useUserDetailContext } from '../../Context/userDetailContext'
import { toast } from 'react-toastify';
import Heart from '../../component/Heart/Heart';
import useUserDetails from '../../Hooks/useUserData';
import { PuffLoader } from 'react-spinners';
import { TextInput, NumberInput ,Button } from "@mantine/core";
import UploadImage from '../../component/uploadImage/uploadImage';
import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";

function Property() {
  const {user} = useMyContext();

  const location = useLocation();

  const id = location.pathname.slice(10)
  const {data , isLoading} = useQuery(['property',  id] , ()=> getProperty(id))
  const email= user?.tokenObject?.email;
  

// console.log(data?.userEmail,"from property")
  //--------------------------------------------------------------//
// useEffect(()=>{
//   const belongsTo = () => {
  
//       if(data?.userEmail === email){
         
//       }else{
//         // updateFlag(false)
//       }

//   };
//   belongsTo();
// },[data])
  
  const [propertyDetails, setPropertyDetails] = useState();
  useEffect(()=>{
setPropertyDetails({
  title: data?.title,
  description: data?.description,
  price: data?.price,
  country: data?.country,
  city: data?.city,
  address: data?.address,
  image: data?.image,
  facilities: {
    bathrooms: data?.facilities.bathrooms,
    parkings: data?.facilities.parkings,
    bedrooms: data?.facilities.bedrooms,
  },
  userEmail: email,
})
  }, [data])
  useUserDetails();


  //Context
  const {userDetails:{bookings , flag} , updateUserDetails , updateFlag} = useUserDetailContext();

  const {validate} = useAuthCheck();
  // console.log(flag,"flag")

  const [modelOpened , setModelOpened] = useState(false);

  // Getting single porperty

  

const {mutate } = useMutation({
  mutationFn: ()=> edit_Listing(id, propertyDetails , user?.token),
  onSuccess: ()=>{
      toast.success('Property has been added !')
      setPropertyDetails({
          title: "",
description: "",
price: 0,
country: "",
city: "",
address: "",
image: "",
facilities: {
bedrooms: 0,
parkings: 0,
bathrooms: 0,
},
userEmail: user?.tokenObject?.email,
      })
      window.location.reload();
  },   
onError: ()=> toast.error("Cannot add Property !, Try again")
})


const { mutate: cancleBook } = useMutation({
  mutationFn: () => cancleBookings(id, user?.tokenObject?.email, user.token),
  onSuccess: () => {
    updateUserDetails({ bookings: bookings.filter((book) => book.id !== id) });
    toast.success("Booking Canceled!");
  },
});

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

  const handleClick = (e) =>{
mutate();
updateFlag(false);
}



// ---------------------------------------------------------------------------------------------------------//
  return (
    
    <div >

    <div className="flexColStart paddings innerWidth property-container">

<div className="hearts">
 { id ?<Heart id={id}/>:null}
</div>

{flag? 
<div className='imageContainer flexColCenter' >


<span style={{width:"100%" , textAlign:"center"}}> <img src={data?.image} alt="" loading='auto' className={flag? 'prop-image' : `property-image`}/>
</span>

<span style={{width:"100%" }}>   <UploadImage propertyDetails={propertyDetails} setPropertyDetails={setPropertyDetails}  />
</span>
  </div> :
<img src={data?.image} alt="" loading='auto' className='property-image'/>
}

{/* left side */}
<div className="property-container flexCenter">  

<div className="left flexColStart">

    <div className="head flexCenter">
      <span className='primaryText'>
        {(flag) ?  
          <TextInput
            type="text"
            value={propertyDetails?.title ||0}
            // placeholder={data?.title}
            onChange={(e) => 
              (
                console.log(e,"event"),
                setPropertyDetails((prev) => ({ ...prev, title: e.target.value })))}
          />
          : data?.title}
      </span> 

      <span className='orangeText'> {(flag) ?
        <NumberInput
        w={"10rem"}
        min={0}
        value={propertyDetails?.price || 0}
          type="number"
          placeholder={data?.price}
          onChange={(value) => (
            setPropertyDetails((prev) => ({ ...prev,  price:value })))}
        />
        : ` $ ${data?.price}`  
        }
        
        </span>
    </div>

    {/* Amenities */}
    <div className="details flexCenter">
    <MdMeetingRoom size={20} color="#1F3E72" /> 

      <span>{(flag) ?
        <NumberInput
          type="number"
          w={"10rem"}
          value={propertyDetails?.facilities?.bedrooms || 0}
          placeholder={data?.facilities?.bedrooms}

          onChange={(value) => setPropertyDetails((prev) => ({ ...prev, facilities: { ...prev.facilities, bedrooms: value } }))}
        />
        : `${data?.facilities?.bedrooms} Bedrooms`  }
      </span>

      <AiTwotoneCar size={20} color="#1F3E72" />

      <span>{(flag) ?
        <NumberInput
          type="number"
          w={"10rem"}
          value={propertyDetails?.facilities?.parkings || 0}
          placeholder={data?.facilities?.parkings}
          onChange={(value) => setPropertyDetails((prev) => ({ ...prev, facilities: { ...prev.facilities, parkings: value } }))}
        />
        : `${data?.facilities?.parkings} parkings`}
      </span>

      {<FaShower size={20} color="#1F3E72" />} 
      <span>{(flag) ?
        <NumberInput
          type="number"
          value={propertyDetails?.facilities?.bathrooms || 0}
          placeholder={data?.facilities?.bathrooms}
          w={"10rem"}
          onChange={(value) => setPropertyDetails((prev) => ({ ...prev, facilities: { ...prev.facilities, bathrooms: value } }))}
        />
        : ` ${data?.facilities?.bathrooms} Bathrooms`}
      </span>
    </div>

    <span className='secondaryText'>  
    
    {(flag) ?
        <textarea
          type="number"
          w= {"40rem"}
          h={"10rem"}
          value={propertyDetails?.description || 0}
          placeholder={data?.description}
          onChange={(e) => setPropertyDetails((prev) => ({ ...prev, description: e.target.value }))}
        />
        : data?.description }
    </span>

    <div className='secondaryText flexCenter' style={{gap:"4px"}}>
      <span>
    {(flag) ?  
          <TextInput
            type="text"
            placeholder={data?.address}
            value={propertyDetails?.address || 0}
            onChange={(e) => setPropertyDetails((prev) => ({ ...prev, address: e.target.value }))}
          />
          : data?.address}, 
      </span>

      <span>
      {(flag) ?  
          <TextInput
            type="text"
            placeholder={data?.city}
            value={propertyDetails?.city || 0}
            onChange={(e) => setPropertyDetails((prev) => ({ ...prev, city: e.target.value }))}
          />
          : data?.city },
</span>

<span>
{(flag) ?  
          <TextInput
            type="text"
            value={propertyDetails?.country || 0}
            onChange={(e) => setPropertyDetails((prev) => ({ ...prev, country: e.target.value }))}
          />
          :  data?.country}
    
    </span>
    </div>

    {/* Booking buttons */}

  {!flag ? (
  (bookings?.map((booking) => booking.id).includes(id) ? (
    <>
      <Button variant='outline' w={"100%"} color='red' onClick={() => cancleBook()} >
        <span>Cancel Bookings </span>
      </Button>
      <span> Your Visit already booked for date {bookings?.filter((bookings) => bookings.id === id)[0]?.date}</span>
    </>
  ) : (
    <Button className='Button btn' onClick={() => { validate() && setModelOpened(true) }}>
      Book Your Visit
    </Button>
  ))
) : (
   <div className='flexCenter' style={{flexWrap:"nowrap" , width:"90%", justifyContent:"space-between" , gap:"3rem" , marginTop:"2rem"}}  > 

<Button className='Button btn' color='green' onClick={(e)=> handleClick(e)} >
    Save Changes
  </Button>

  <Button className='Button btn' color='red' onClick={()=> updateFlag(false)} >
    Cancle Changes
  </Button>

   </div>

)}


    {/* Booking Model component */}
    <BookingModel
      opened={modelOpened}
      setOpened={setModelOpened}
      propertyId={id}
      email={user?.tokenObject?.email}
    /> 
  </div>



</div>
    </div>
 
    </div>
  )
}

export default Property


