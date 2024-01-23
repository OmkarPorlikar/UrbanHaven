

import reducer from './reducer.js'
import { createContext,  useContext,  useReducer } from "react";
import { useEffect } from 'react';

// when we get the item from the localstorage it is in the form on the json hence we need to convert it
// also if we get the item we alos need to set it . They can't work without each other 
const INITIAL_STATE = {
user:JSON.parse(localStorage.getItem('user')) || null,
isFetching:false,
error:false
}

export const Context = createContext(INITIAL_STATE);

 export const useMyContext = () =>{
    if(!Context){
        throw  new Error("Context is not present")
    }
    const context = useContext(Context);
return context;

}

export const ContexProvider = ({children})=>{
    // for every action this line will run
const [ state ,dispatch ] = useReducer(reducer, INITIAL_STATE);

useEffect(()=>{
localStorage.setItem("user",JSON.stringify(state?.user))
// console.log( state?.user?.token, "token Object")
// console.log( state?.user?.tokenObject, "token Object")
},[state?.user])
// after the 1st line executes this value will be updated
return (<Context.Provider value={
    {user:state?.user,
   
    isFetching: state?.isFetching,
    error: state?.error,
    dispatch
}
}>
    {children}
     </Context.Provider>
);
};


