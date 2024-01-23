import React from 'react'
import { useContext } from 'react'
import { useMyContext } from '../Context/Contex'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify';
function useAuthCheck() {
    const {user} = useMyContext();
  // console.log(user,"From the authCheck")
    const validate = () =>{
    if(!user?.tokenObject){
    toast.error("Please Login To Continue !" , {position:'bottom-right'})
    return false;
    }
    else return true
    }
     
  return (
    {
        validate
    }
  )
}

export default useAuthCheck