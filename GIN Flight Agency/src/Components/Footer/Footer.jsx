import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';
import {
  AiFillYoutube,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa';
import { TiSocialFacebook } from 'react-icons/ti';

import Logo from '../../assets/logo.png';

const Footer = () => {
  useEffect(()=>{
    Aos.init({duration: 500})
  }, [])
  
  return (
    <div className="footer">
      <div data-aos='fade-up' data-aos-duration='500' className="sectionContainer container grid">
        <div  className="gridOne">
          <div className="logoDiv">
            <img src={Logo} className="Logo" />
          </div>
          <p>Don&apos;t let anyone stop you from going where your heart wants to!</p>
          <div className="socialIcon flex">
          <TiSocialFacebook className="icon"/>
          <AiOutlineTwitter className="icon"/>
          <AiFillYoutube className="icon"/>
          <FaPinterestP className="icon"/>
          </div>
        </div>

        <div  className="footerLinks">
          <span className="linkTitle">Information</span>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">Explore</a>
          </li>
          <li>
            <a href="">Flight Status</a>
          </li>
          <li>
            <a href="">Travel</a>
          </li>
          <li>
            <a href="">Check-In</a>
          </li>
          <li>
            <a href="/account">Manage Your Bookings</a>
          </li>
        </div>

        <div  className="footerLinks">
          <span className="linkTitle">Quick Guide</span>
          <li>
            <a href="">FAQ</a>
          </li>
          <li>
            <a href="">How To</a>
          </li>
          <li>
            <a href="">Features</a>
          </li>
          <li>
            <a href="">Baggage</a>
          </li>
          <li>
            <a href="">Route Map</a>
          </li>
          <li>
            <a href="">Our Communities</a>
          </li>
        </div>

        <div  className="footerLinks">
          <span className="linkTitle">Services</span>
          <li>
            <a href="">Chauffeur</a>
          </li>
          <li>
            <a href="">Our Partners</a>
          </li>
          <li>
            <a href="">Destination</a>
          </li>
          <li>
            <a href="">Careers</a>
          </li>
          <li>
            <a href="">Transportation</a>
          </li>
          <li>
            <a href="">Program Rules</a>
          </li>
        </div>
      </div>

      <div className="copyRightDiv flex">
        <p>Developed by Arvic Micah Gingoyon</p>
      </div>
    </div>
  )
}

export default Footer