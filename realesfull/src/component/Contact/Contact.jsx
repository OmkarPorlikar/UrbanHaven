import React from 'react'
import './Contact.css'
import { MdCall } from 'react-icons/md'
// import {BsfillChatDotsFill} from 'react-icons/bs'
import { BsFillChatDotsFill } from 'react-icons/bs';
import { HiChatBubbleBottomCenter } from 'react-icons/hi2';

export default function Contact() {
  return (
<section className="c-wrapper">
<div id="contact-us" className="c-wrapper">
  <div className="paddings innerWidth flexCenter c-container">
    
    {/* left Section */}
    <div className="flexColStart c-left">
      <span className="orangeText">Our Contact Us</span>
      <span className="primaryText">Easy to contact us</span>
      <span className="secondaryText">
        We are always ready to help by providing the best services for you.
        We believe a good place to live can make your life better.
      </span>


      <div className="flexColStart contactModes">
        {/* frist row */}
        <div className="flexStart row">
          <div className="flexColCenter mode">
            <div className="flexStart">
              <div className="flexCenter icon">
                {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path>
                </svg> */}
                <MdCall size={25} />
              </div>

              <div className="flexColStart detail">
                <span className="primaryText">Call</span>
                <span className="secondaryText">021 123 145 14</span>
              </div>
            </div>

            <div className="flexCenter Button">Call now</div>
          </div>

          {/* second mode */}
            
          <div className="flexColCenter mode">
            <div className="flexStart">
              <div className="flexCenter icon">
                {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path>
                </svg> */}
                <BsFillChatDotsFill size={25} />
              </div>

              <div className="flexColStart detail">
                <span className="primaryText">Chat</span>
                <span className="secondaryText">021 123 145 14</span>
              </div>
            </div>

            <div className="flexCenter Button">Chat now</div>
          </div>


        </div>

        {/* <div class="flexStart row">
        </div> */}

        {/* second row */}

        <div className="flexStart row">
            {/* 3rd mode */}
          <div className="flexColCenter mode">
            <div className="flexStart">
              <div className="flexCenter icon">
                {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path>
                </svg> */}
                <BsFillChatDotsFill size={25} />
              </div>

              <div className="flexColStart detail">
                <span className="primaryText">Video Call</span>
                <span className="secondaryText">021 123 145 14</span>
              </div>
            </div>

            <div className="flexCenter Button"> Video Call now</div>
          </div>

          {/* Fourth mode */}
            
          <div className="flexColCenter mode">
            <div className="flexStart">
              <div className="flexCenter icon">
                {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"></path>
                </svg> */}
                <HiChatBubbleBottomCenter size={25} />
              </div>

              <div className="flexColStart detail">
                <span className="primaryText">Message</span>
                <span className="secondaryText">021 123 145 14</span>
              </div>
            </div>

            <div className="flexCenter Button">Message now</div>
          </div>


        </div>

      </div>
    </div>

{/* Right Section */}
    <div className="flexEnd c-right">
      <div className="image-container">
        <img src="./images/contact.jpg" alt=""/>
      </div>
    </div>
  </div>
</div>

</section>

    )
}
