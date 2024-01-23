import React from 'react'
import { Menu, Avatar } from '@mantine/core'
import { Link } from 'react-router-dom'
import './ProfileMenu.css'
function ProfileMenu({user}) {
//   console.log(user.user,"From header")
    return (

<Menu position="bottom" offset={-10} withArrow > 
<Menu.Target className="target"> 
    <Avatar src={user.tokenObject?.image}  alt='User Image' className='custom-avatar' ></Avatar>
</Menu.Target>
<Menu.Dropdown className='drop'> 
<Menu.Item> 
    <Link to='/Favourites'>
    Favourites
    </Link>
</Menu.Item>

<Menu.Item> 
    <Link to='/Bookings'> 
    Bookings
    </Link>
</Menu.Item>

<Menu.Item> 
    <Link to='/My_Listings'> 
    My Listings
    </Link>
</Menu.Item>

<Menu.Item onClick={()=>{
    localStorage.clear();
    window.location.reload();
    // Logout()
}}>
    Logout
</Menu.Item>

</Menu.Dropdown>



</Menu>
    )
}


export default ProfileMenu;