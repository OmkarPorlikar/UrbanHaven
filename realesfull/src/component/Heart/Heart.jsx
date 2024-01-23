import React, { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useMyContext } from '../../Context/Contex';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { toFav } from '../../utils/api';
import { checkFavourites } from '../../utils/common';
import { useEffect } from 'react';
import { useUserDetailContext } from '../../Context/userDetailContext';
import useUserDetails from '../../Hooks/useUserData';
function Heart({ id }) {
    const {refetch} = useUserDetails();

    const {userDetails:{bookings,favourites} , updateUserDetails} = useUserDetailContext();

    // user
    const {user} = useMyContext(); // need to update the user
// console.log(user , "from heart ")
// console.log(user?.token , "token heart")
    const [colors, setColours] = useState('white');



const {mutate} = useMutation({
    mutationFn:()=> toFav(id , user.tokenObject?.email , user?.token),
    onSuccess:()=>{
     refetch();
    }
})

useEffect(()=> {
    setColours(()=> checkFavourites(id, favourites))
},[favourites])

    // Function for toggle
  const handleClick = (e) => {
    e.stopPropagation();
console.log("working handle clicik")
    if(user){
mutate();
        setColours((prev)=> prev === 'white'? 'red':'white')

        // toast.success('Property Liked !', {
        //     position:'bottom-right'    })
}
else{
    toast.error('Please Login to Like the Property !')
}

};

  return (
      <AiFillHeart size={24} color={colors} onClick={(e) => handleClick(e)} />
  );
}

export default Heart;


// import { useContext, useEffect, useState } from "react"
// import { AiFillHeart } from "react-icons/ai"
// import useAuthCheck from "../../hooks/useAuthCheck"
// import { useMutation } from "react-query"
// import { useUserDetailContext } from "../../Context/userDetailContext"
// import { checkFavourites, updateFavourites } from "../../utils/common"
// import { toFav } from "../../utils/api"
// import { useMyContext } from "../../Context/Contex"

// const Heart = ({id}) => {

//     const [heartColor, setHeartColor] = useState("white")
//     const {user} = useMyContext()
//     const validateLogin = useAuthCheck();

//     const {userDetails:{bookings,favourites} , updateUserDetails} = useUserDetailContext();

//       useEffect(()=> {
//             setHeartColor(()=> checkFavourites(id, favourites))
//       },[favourites])


//     const {mutate} = useMutation({
//         mutationFn: () => toFav(id, user?.user?.email, user?.token),
//         onSuccess: ()=> {
//         updateUserDetails(
//                 { favourites: updateFavourites(id, prev.favourites)}
//             )
//         }
//     })

//     const handleLike = () => {
//         if(validateLogin())
//         {
//             mutate()
//             setHeartColor((prev)=> prev === "#fa3e5f" ? "white": "#fa3e5f")
//         }
//     }

//   return (
//     <AiFillHeart size={24} color={heartColor} onClick={(e)=> {
//         e.stopPropagation()
//         handleLike()
//     }}/>
//   )
// }

// export default Heart