import React, { useEffect, useState } from 'react';
import { useUserDetailContext } from '../../Context/userDetailContext';
import useProperties from '../../Hooks/useProperties';
import PropertiesCard from '../../component/PropertiesCard/PropertiesCard.jsx';
import useUserDetails from '../../Hooks/useUserData.js';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../component/SearchBar/SearchBar.jsx';
import { PuffLoader } from 'react-spinners';
import './Booking.css';

function Bookings() {
  const [filter, setFilter] = useState('');
  const [lilData, setLilData] = useState([]);
  useUserDetails();
  const Navigate = useNavigate();
  const { userDetails } = useUserDetailContext();

  const { data, isLoading } = useProperties(2);

  useEffect(() => {
    setLilData(data?.allResd || []);
  }, [data]);

  if (isLoading) {
    return (
      <div className='flexCenter wrapper' style={{ height: '60vh' }}>
        <PuffLoader height='80' width='80' radius={1} color='#4066ff' aria-label='puff-loading' />
      </div>
    );
  }

  return (
    <div className='flexColCenter' style={{ backgroundColor: 'white', marginTop: '10rem' }}>
      <div className='right search-barBooking'>
        <SearchBar filter={filter} setFilter={setFilter} />
      </div>
      <div className='flexCenter'>
        {userDetails?.bookings.length === 0 ? (

          <p className='show'>No bookings to show...</p>
        ) : (
          lilData
            .filter((val) => userDetails?.bookings.map((bookingId) => bookingId.id).includes(val.id))
            .filter(
              (property) =>
                property.title.includes(filter) || property.city.includes(filter) || property.country.includes(filter)
            )
            .map((card, i) => (
              <div key={i} onClick={() => Navigate(`/Property/${card.id}`)}>
                <PropertiesCard card={card} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Bookings;


