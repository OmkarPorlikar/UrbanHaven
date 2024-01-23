import React from 'react'
import Residencies from '../component/Coursal/Coursal';
import Companies from '../component/companies/Companies';
import Header from '../component/Header/Header';
import Hero from '../component/Hero/Hero';
import Value from '../component/value/value';
import Contact from '../component/Contact/Contact'
import GetStarted from '../component/GetStarted/GetStarted';
import Footer from  '../component/Footer/Footer'

// import Header from '../component/Header/Header'
function Website() {
  return (
    <div className="App">
    <div className='bg-container'> 
       < div className='white-gradient'/>
      <Hero/>
      </div>

   <Companies/>    
<Residencies/>
<Value/>
<Contact/>
<GetStarted/>
    </div>
    )
}

export default Website


// Note
// The header and footer is replaced by the layout