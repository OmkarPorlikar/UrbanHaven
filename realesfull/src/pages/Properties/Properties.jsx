
import React, { useState , useEffect } from 'react';
import './Properties.css';
import SearchBar from '../../component/SearchBar/SearchBar';
import useProperties from '../../Hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import PropertiesCard from '../../component/PropertiesCard/PropertiesCard';
import { useNavigate , useLocation, json  } from 'react-router-dom';
import { Button, JsonInput } from '@mantine/core';


const Properties = () => {
  const location = useLocation();
  const Navigate = useNavigate();

    const currentPageParam = new URLSearchParams(location.search).get('page');
  const initialPage = currentPageParam ? parseInt(currentPageParam, 10) : 1;

  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    Navigate(`/properties?page=${currentPage}`, { replace: true });
    localStorage.setItem('currentPage',JSON.stringify(currentPage))
  }, [currentPage, Navigate]);
// console.log(currentPage , typeof(currentPage) , "currenct page")
  const { isLoading, data } = useProperties(currentPage);
    const [filter, setFilter] = useState("");
    const [value , setValue]= useState("")
    const [goto, setGoto] = useState(false)
  // console.log(data,"From propies")
const totalPage = Math.ceil(data?.totalPropertiesCount /10);

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };
  const toggleGoToDiv = () => {
    setGoto((prevGoto) => !prevGoto);
  };


  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPage ? prevPage + 1 : prevPage));
  };


const handleGoNext = () =>{
// (value <= totalPage)
  setGoto(false)
setValue("")
}
  if (isLoading) {
    return (
      <div className='flexCenter wrapper' style={{ height: '60vh' }}>
        <PuffLoader height='80' width='80' radius={1} color='#4066ff' aria-label='puff-loading' />
      </div>
    );
  }


  
  return (
    <div className='wrapper'>
      <div className='innerWidth paddings properties-container'>
        <div className='right'>
          <SearchBar filter={filter} setFilter={setFilter} />
        </div>
        <div className='innerWidth flexCenter card-wrapper'>
          {data?.properties?.filter((property)=> 
          property?.title.toLowerCase().includes(filter.toLowerCase()) ||
          property?.country.toLowerCase().includes(filter.toLowerCase()) ||
          property?.city.toLowerCase().includes(filter.toLowerCase()) 
          )
          .map((card, i) => (
              <div key={i} onClick={() => Navigate(`/Property/${card.id}`)}>
                <PropertiesCard card={card} />
              </div>
            ))}
        </div>
      </div>
     
      <div className='flexCenter pagination-button'>
        <Button  size={'sm'} onClick={goToPrevPage}   style={{
    backgroundImage: `linear-gradient(to right, ${ parseInt(localStorage.getItem('currentPage')) === 1 ? 'rgb(170, 170, 170)' : 'rgb(242, 186, 82)'} , ${parseInt(localStorage.getItem('currentPage')) === 1 ? 'rgb(170, 170, 170)' : 'rgb(240, 170, 42)'})`,
  }} >
          Prev
        </Button>
        <span onClick={toggleGoToDiv} style={{cursor:"pointer"}}>{`Page ${currentPage} of ${totalPage} `}</span>
       
         <Button  size={'sm'} onClick={goToNextPage}   style={{
    backgroundImage: `linear-gradient(to right, ${parseInt(localStorage.getItem('currentPage')) === totalPage ? 'rgb(170, 170, 170)' : 'rgb(242, 186, 82)'} , ${parseInt(localStorage.getItem('currentPage')) === totalPage ? 'rgb(170, 170, 170)' : 'rgb(240, 170, 42)'})`,
  }} >
         Next
       </Button>
        {goto ? 
        <div className='go-to flexColCenter' > 
        <input type='number' placeholder='Page Number' value={value} onChange={(e)=> setValue(e.target.value)} />
        <button onClick={handleGoNext}> Go </button>
        </div> : null
        }
      
      </div>
    </div>
  );
};

export default Properties;
