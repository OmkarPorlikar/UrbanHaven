import {  Modal } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, {  useContext, useState } from 'react'
import './date.css'
import { useMutation } from 'react-query'
import { useMyContext } from '../../Context/Contex'
import { bookVisits } from '../../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { useUserDetailContext } from '../../Context/userDetailContext'

  function  BookingModel({opened , setOpened , propertyId , email})
  {
    // console.log(email,"email")
    // console.log(propertyId,"propertyId")

    const {userDetails:{bookings} , updateUserDetails} = useUserDetailContext();

    // const {token} = userDetails;
    // console.log(token,"From booking")
  const [value , setValue] = useState();
  const {user} = useMyContext();



  const handleSucess = ()=>{
    toast.success("You have booked a visit ! ", {
      position:"bottom-right"
    })

  }
 const {mutate , isLoading} = useMutation({
   mutationFn: () => bookVisits(value,propertyId,email, user.token),
   onSuccess: ()=>handleSucess(),
   // we have destructured the response form error or we can also  do it like error.response.data...
   onError:({response}) =>toast.error(response.data.message),
   onSettled:()=> setOpened(false)
 });



  return (
    <div>
<Modal
opened={opened}
onClose={()=>setOpened(false)}
title="Select your date of Visit"
centered
>
<div className='flexColCenter' style={{gap:"1rem"}}>
  <DatePicker value={value} onChange={setValue} minDate={new Date()} /> 

  <button className=' Button ' disabled={!value || isLoading} onClick={()=> mutate()}>
      Book visit
    </button>
</div>
</Modal>
    </div>
  )
}

export default BookingModel