import { useQuery } from "react-query";
import { useMyContext } from "../Context/Contex";
import { getUser } from "../utils/api";
import { useUserDetailContext } from "../Context/userDetailContext";
import { useEffect, useRef } from "react";


const useUserDetails =()=>{
const queryRef = useRef();
    const {user} = useMyContext();
    const id = user?.tokenObject?.id
    const {userDetails:{bookings,favourites} , updateUserDetails} = useUserDetailContext();

    const {data , isLoading , isError , refetch} = useQuery({
        queryKey:"User Data",
        queryFn: ()=> (  user?.tokenObject ? getUser(id):null ),
        onSuccess: (data)=>{
            updateUserDetails({bookings: data?.user?.bookedVisits , favourites: data?.user?.favResidenciesiD })
        },
        enabled: user?.tokenObject !== undefined,
        staleTime: 300000
    })  
    
    queryRef.current= refetch;
    useEffect(()=>{
        queryRef.current && queryRef.current();
    },[user?.token])

 
    return {data, isLoading , isError , refetch}
}

export default useUserDetails;