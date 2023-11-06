import 'aos/dist/aos.css';

import { useEffect } from 'react';

import Aos from 'aos';

import airplane from '../../assets/airplane.png';
import video from '../../assets/video.mp4';

const Home = () => {

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  return (
    <div className="home flex container">
        <div className="mainText">
            <h1 data-aos='fade-up' data-aos-duration='2500'>Travel With Us and Fulfill Your Wanderlust</h1>
        </div>

        <div className="homeImages flex">
            <div className="videoDiv">
                <video src={video} autoPlay muted loop className = 'video'></video>
            </div>

            <img src={airplane} className = 'plane'/>
        </div>
    </div>
  )
}

export default Home