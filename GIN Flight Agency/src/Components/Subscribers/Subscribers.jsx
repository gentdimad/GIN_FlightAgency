import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';

const Subscribers = () => {
  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])
  
  return (
    <div  className="subscribe section">
      <div data-aos='fade-up' data-aos-duration='1000' className="sectionContainer container">
        <h2>Subscribe to our Newsletters & Get the Latest News!</h2>
        <div className="inputDiv flex">
          <input type="email" placeholder="Enter your email address"/>
          <button className="btn">Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Subscribers