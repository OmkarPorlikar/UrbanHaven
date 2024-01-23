import './App.css';
// import Coursal from './Coursal/Coursal';
import { BrowserRouter , Routes ,  Route } from 'react-router-dom';

import './index.css'
import Website from './pages/Website';
import { Suspense, useState } from 'react';
import Layout from './component/Layout/Layout';
import Properties from './pages/Properties/Properties';
import { QueryClient, QueryClientProvider  } from 'react-query';
import { ToastContainer } from 'react-toastify';
import {ReactQueryDevtools} from 'react-query/devtools'
import 'react-toastify/dist/ReactToastify.css';
import Property from './pages/Property/Property';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Bookings from './pages/Bookings/Bookings';
import Favourites from './pages/Favourites/Favourites';
import MyListings from './pages/Listings/MyListings';
import { useMyContext } from './Context/Contex';
// import { UserDetailContext } from './Context/userDetailContext';
function App() {

const {user} = useMyContext();
 
const queryClient = new QueryClient();
  return (
<QueryClientProvider client={queryClient}> 
   <BrowserRouter> 
   <Suspense fallback={<div> .....Loading</div>}>
  <Routes> 
{/* home route */}
    <Route element={<Layout/>}> 
<Route path='/' element={<Website/>}> </Route>
<Route path='/properties' element={<Properties/> }></Route>
<Route path='/Property/:id' element={<Property/>}> </Route>
<Route path='/Bookings' element={<Bookings/>} />
<Route path='/My_Listings' element={<MyListings/>} />
<Route path='/Favourites' element={<Favourites/>} />

</Route>

<Route path='/register' element={<Signup/> } /> 
<Route path='/Login' element={<Login/> } /> 

  </Routes>

  </Suspense>
   </BrowserRouter>
   <ToastContainer limit={1}/>
   <ReactQueryDevtools initialIsOpen={false}/>
   </QueryClientProvider>

  );
}

export default App;
