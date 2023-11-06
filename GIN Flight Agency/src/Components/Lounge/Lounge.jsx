import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';

const Lounge = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <div className="lounge container section">
      <div className="sectionContainer grid">
        <div className="imgDiv">
          <img src=""/>
        </div>

        <div className="textDiv">
          <h2 data-aos='fade-down' data-aos-duration='1500'>Unaccompanied Minor Lounge</h2>

            <div className="grids grid">
              <div data-aos='fade-right' data-aos-duration='1500' className="singleGrid">
                <span className="gridTitle">
                  Help through the airport
                </span>
                <p>You can also call airlines from your phone and book a flight ticket to one of your favorite destinations</p>
              </div>

              <div data-aos='fade-right' data-aos-duration='1500' className="singleGrid">
                <span className="gridTitle">
                  Priority Boarding
                </span>
                <p>You can also call airlines from your phone and book a flight ticket to one of your favorite destinations</p>
              </div>

              <div data-aos='fade-right' data-aos-duration='1500' className="singleGrid">
                <span className="gridTitle">
                  Care on the Airport
                </span>
                <p>You can also call airlines from your phone and book a flight ticket to one of your favorite destinations</p>
              </div>

              <div data-aos='fade-right' data-aos-duration='1500' className="singleGrid">
                <span className="gridTitle">
                  Chauffeur Drive Service
                </span>
                <p>You can also call airlines from your phone and book a flight ticket to one of your favorite destinations</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lounge;