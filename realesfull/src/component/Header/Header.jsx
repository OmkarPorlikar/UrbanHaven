import React, { useContext, useState , useEffect } from 'react'
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi'
import { Link , NavLink} from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
 import OutsideClickHandler from 'react-outside-click-handler';
import { Context } from '../../Context/Contex';
import AddPropertyModel from '../AddProertyModel/AddPropertyModel';
import { toast } from 'react-toastify';
import useHeaderColor from "../../Hooks/useHeaderColor"


export default function Header() {

  const headerColor = useHeaderColor();

const {user} = useContext(Context)
const [opened , setOpened] = useState(false);
  const[menuOpened , setMenuOpened] = useState(false);
   const getMenuStyles = (menuOpened) =>{

    if(document.documentElement.clientWidth <= 800){
      return {right: !menuOpened && "-100%"}
    //  by making the right as 100% the h-menu will be out of the viewport hence giving the animaiton of getting on and off
    }
   }

   // add Property
const handleAddProperty =()=>{
  if(!user){
    toast.error('Please logi first !')
  }
  // onOpen()
  setOpened(true)
}

const toggle = ()=>{
  // console.log(menuOpened, "menu Opened")
  setMenuOpened((prev)=> !prev)
}
    return (
        <section className="h-wrapper">
      <div className='flexCenter paddings innerWidth h-container'>
  <Link to='/'>       
  <img src="./images/logo.png" alt="Homyz Logo" className='logo' />
  </Link> 
  <OutsideClickHandler
  onOutsideClick={()=>{
    setMenuOpened(false)
  }}
  >
      <div className=" flexCenter h-menu"
      style={getMenuStyles(menuOpened)}
      >
        <NavLink to='/properties'> Properties</NavLink>
        
       
       <a href="mailto:porlikarom676@gmail.com"> Contact</a> 

       <div onClick={handleAddProperty} style={{cursor:"pointer"}}> Add Property 
       {/* <img src="../../images/house.png" alt="HouseIcon" /> */}
       </div>

       <AddPropertyModel opened={opened} setOpened={setOpened} />
       { 
       (user)?<ProfileMenu user={user} />:
       <>

<Link to='/register'> 
<button className='Button' > SignUp </button>
</Link>

<Link to='/Login'> 
<button className='Button' > Login </button>
</Link>
</>
        }
      </div>
       </OutsideClickHandler> 
      <div className="menu-icon" >
  <BiMenuAltRight  size={30} onClick={toggle}  />
 </div>
      </div>

      </section>
    )
  }
  

