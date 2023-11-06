import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';

const Support = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <div data-aos='fade-up' data-aos-duration='1500' className="support container section">
      <div className="sectionContainer">
        <div className="titlesDiv">
          <small>travel support</small>
          <h2>Be assured when you plan your travels</h2>
          <p>Find help with booking and travel plans, see what to expect along the journey!</p>
        </div>

        <div className="infoDiv grid">
          <div className="textDiv grid">
            <div data-aos='fade-down' data-aos-duration='2000' className="singleInfo">
              <span className="number">01</span>
              <h4>Travel Requirements for Germany</h4>
              <p>
                Find help with booking and travel plans, see what to expect along the journey to your favorite destinations!
              </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='2500' className="singleInfo">
              <span className="number colorOne">02</span>
              <h4>Chauffeur Services at your arrival</h4>
              <p>
                Find help with booking and travel plans, see what to expect along the journey to your favorite destinations!
              </p>
            </div>

            <div data-aos='fade-down' data-aos-duration='3000' className="singleInfo">
              <span className="number colorTwo">03</span>
              <h4>Fully-covered Travel Insurance</h4>
              <p>
                Find help with booking and travel plans, see what to expect along the journey to your favorite destinations!
              </p>
            </div>
          </div>

          <div className="imgDiv">
            <img src = ""/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support