import React, { useState, useCallback } from 'react';
import { useUserDetailContext } from '../../Context/userDetailContext';
import useProperties from '../../Hooks/useProperties';
import useUserDetails from '../../Hooks/useUserData.js';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../component/SearchBar/SearchBar.jsx';
import './listing.css';
import Heart from '../../component/Heart/Heart.jsx';
import { PuffLoader } from 'react-spinners';
import { useMyContext } from '../../Context/Contex.js';
import { useMutation } from 'react-query';
import { del_Listing } from '../../utils/api.js';

function MyListings() {
  const [update, setUpdate] = useState(false);
  const [filter, setFilter] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useMyContext();
  const Navigate = useNavigate();
  const { userDetails, updateFlag } = useUserDetailContext();

  const {refetch} =useUserDetails();

  const { data, isLoading } = useProperties(1);
  const { mutate } = useMutation({
    mutationFn: (email, id) => del_Listing(email, id),
    onSuccess:()=>{
    refetch();
    }
  });

  const handleEditClick = useCallback(
    (propertyId) => {
      // Set the flag to indicate that an update is needed
      updateFlag(true);
      
      console.log("Inside the handleClick");
      console.log(userDetails?.flag, "listings");
      // Redirect to the Property component with props
      Navigate(`/Property/${propertyId}`);
    },
    [Navigate, updateFlag, userDetails]
  );

  const handleClick = useCallback(
    (propertyId) => {
      Navigate(`/Property/${propertyId}`);
    },
    [Navigate]
  );

  const handleDeleteClick = useCallback(
    (userEmail, id, e) => {
      e.stopPropagation(); // Corrected method name
      mutate({ userEmail, id });
      // Redirect to the My_Listings page
      Navigate('/My_Listings');
    },
    [mutate, Navigate]
  );
  
  if (isLoading) {
    return (
      <div className='flexCenter wrapper' style={{ height: "60vh" , gap:"1.5rem" }} >
        <PuffLoader height="80" width="80" radius={1} color="#4066ff" aria-label='puff-loading' />
      </div>
    );
  }

  return (
    <div className='flexColCenter' style={{ backgroundColor: "white", marginTop: "10rem" }}>
      <div className="right search-barBooking">
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      <div className='flexCenter' style={{gap:'2rem'}}>
        {data?.allResd
          ?.filter((property) => property.userEmail.includes(user?.tokenObject?.email))
          .filter(
            (property) =>
              property.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
              property.city.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
              property.country.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .map((card, i) => (  
            <div className="flexColStart r-cards listContainer" key={i} onClick={() => handleClick(card.id)} >
              <div className="heart">
                <Heart id={card.id} />
              </div>
              <img src={card.image} alt="home" />
              <span className="secondaryText r-price">
                <span style={{ color: 'orange' }}>${card.price}</span>
              </span>
              <span className="primaryText">{card.title?.slice(0, 15) + "..."}</span>
              <span className="secondaryText">{card.description?.slice(0, 100) + "..."}</span>
              <div className='buttonContainer flexStart'>
                <button className='Button btnDel' onClick={(e) => handleDeleteClick(card.userEmail, card.id,e)}> Delete </button>
                <button className='Button btnEdit' onClick={() => handleEditClick(card.id)}>  Edit </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyListings;
