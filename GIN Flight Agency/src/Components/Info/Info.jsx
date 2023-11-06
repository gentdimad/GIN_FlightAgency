import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';
import {
  BsBookmarkCheck,
  BsShieldCheck,
} from 'react-icons/bs';
import { RxCalendar } from 'react-icons/rx';

const Info = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])
  
  return (
    <div className="info section">
      <div className="infoContainer container">
        <div className="titleDiv flex">
          <h2 data-aos='fade-down' data-aos-duration='1500'>Travel, make memories, and let out your inner child</h2>
          <button data-aos='fade-left' data-aos-duration='1500' className="btn">
            View All
          </button>
        </div>

        <div className="cardsDiv grid">
          <div data-aos='fade-up' data-aos-duration='2000' className="singleCard grid">
            <div className="iconDiv flex">
              <RxCalendar className='icon'/>
            </div>
            <span className="cardTitle">Book & Relax</span>
            <p>You can also call airlines from your phone and book a flight ticket!</p>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="singleCard grid">
            <div className="iconDiv flex  colorOne">
              <BsShieldCheck className='icon'/>
            </div>
            <span className="cardTitle">Smart Checklist</span>
            <p>You can also call airlines from your phone and book a flight ticket!</p>
          </div>

          <div data-aos='fade-up' data-aos-duration='2000' className="singleCard grid">
            <div className="iconDiv flex colorTwo">
              <BsBookmarkCheck className='icon'/>
            </div>
            <span className="cardTitle">Save More</span>
            <p>You can also call airlines from your phone and book a flight ticket!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info