


import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useMyContext } from './Contex';

const INITIAL_STATE = {
  favourites: [],
  bookings: [],
  flag: JSON.parse(localStorage.getItem('flag')) || null, // Add updateFlag to the initial state
};

// console.log(INITIAL_STATE.flag , "flag ")
// console.log(localStorage.getItem('flag') , "local")
const UserDetailContext = createContext();

const userDetailReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DETAILS':
      return { ...state, ...action.payload };
    case 'UPDATE_UPDATE_FLAG':
      return { ...state, flag: action.payload }; // Add case to update updateFlag
    default:
      return state;
  }
};

const useUserDetailContext = () => {
  const userContext = useContext(UserDetailContext);
  if (!userContext) {
    throw new Error("Something went wrong with the UserDetailContext");
  }
  return userContext;
};

const UserDetailProvider = ({ children }) => {
  const { user } = useMyContext();
  const [userDetails, dispatch] = useReducer(userDetailReducer, INITIAL_STATE);

  const updateUserDetails = (payload) => {
    dispatch({ type: 'UPDATE_USER_DETAILS', payload });
  };

  const updateFlag = (flag) => {
    dispatch({ type: 'UPDATE_UPDATE_FLAG', payload: flag });
    localStorage.setItem("flag", JSON.stringify(Boolean(flag)));
  };

  const contextValue = { userDetails, updateUserDetails, updateFlag };

  return (
    <UserDetailContext.Provider value={contextValue}>
      {children}
    </UserDetailContext.Provider>
  );
};

export { UserDetailProvider,  useUserDetailContext };
