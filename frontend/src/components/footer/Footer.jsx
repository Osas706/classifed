import React from 'react';
import './Footer.css';
import Facebook from '/facebook_icon.png';
import Linkedin from '/linkedin_icon.png';
import Twitter from '/twitter_icon.png';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <h2 className='logo'>247<span>Market</span></h2>
          <p>Buy and sell everything from used cars to mobile phones and computers, or search for property, jobs and more.</p>

          <div className="footer-social-icons">
            <img src={Facebook} />
            <img src={Linkedin} />
            <img src={Twitter} />
          </div>
        </div>

        <div className="footer-content-center">
           <h2>Company</h2>

           <ul>
             <li>Discover</li>
             <li>Testimonial</li>
             <li>FAQ</li>
             <li>Premium</li>
             <li>About us</li>
             <li>Policy policy</li>
           </ul>
        </div>

        <div className="footer-content-right">
           <h2>GET IN TOUCH</h2>

           <ul>
              <li>+234-212-456-7890</li>
              <li>contact@247market.com</li>
              <li>Ikeja, Lagos, Nigeria 100001</li>
           </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">
        Copyright 2024 @ 247market.com - All Right Resevred.
      </p>
    </div>
  )
}

export default Footer
