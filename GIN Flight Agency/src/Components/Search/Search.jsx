import 'aos/dist/aos.css';
import 'antd/dist/reset.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Cascader,
  DatePicker,
} from 'antd';
import Aos from 'aos';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { RxCalendar } from 'react-icons/rx';

const Search = () => {
    localStorage.setItem("origin", "Cebu CEB");
    localStorage.setItem("destination", "Manila MNL");

    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])

    const handleFrom = (value) => {
        console.log(value[1])
        localStorage.setItem("origin", value[1]);
      }

      const handleTo = (value) => {
        console.log(value[1])
        localStorage.setItem("destination", value[1]);
      }

      function departDate (date, dateString){
        console.log(date, dateString);
        localStorage.setItem("dDate", dateString);
      }

      function returnDate (date, dateString){
        console.log(date, dateString);
        localStorage.setItem("rDate", dateString);
      }


    //To send to backend
    const [roundTrip, setRoundTrip] = useState(true);
    localStorage.setItem("roundTrip", roundTrip);
    const [selected1, setSelected1] = useState('singleBtn')
    const selectBtn1 = () =>{
        setSelected1('singleBtn selected')
        setSelected2('singleBtn')
        setRoundTrip(false)
        localStorage.setItem("roundTrip", true);
        setReturnDisp('singleInput flex vanish')
        setInputDisp('searchInputs2 flex')
    }
    const [selected2, setSelected2] = useState('singleBtn selected')
    const selectBtn2 = () =>{
        setSelected2('singleBtn selected')
        setSelected1('singleBtn')
        setRoundTrip(true)
        localStorage.setItem("roundTrip", false);
        setReturnDisp('singleInput flex')
        setInputDisp('searchInputs flex')
    }
    
    const [returnDisp, setReturnDisp] = useState('singleInput flex')
    const [inputDisp, setInputDisp] = useState('searchInputs flex')

    //Search Inputs
    const options = [
        {
          value: 'Philippines',
          label: 'Philippines',
          children: [
            {
              value: 'Cebu CEB',
              label: 'Cebu CEB',
            },
            {
                value: 'Manila MNL',
                label: 'Manila MNL',
            },
            {
                value: 'General Santos GEN',
                label: 'General Santos GEN',
            },
          ],
        },
        {
          value: 'South Korea',
          label: 'South Korea',
          children: [
            {
              value: 'Seoul (Incheon) ICN',
              label: 'Seoul (Incheon) ICN',
            },
          ],
        },
      ];

  return (
    <div className="search container section">
        <div className="sectionContainer grid" data-aos='fade-up' data-aos-duration='1500'>
            <div className="btns flex">
                <button className={selected1} onClick={selectBtn1}>
                    <span>One-Way</span>
                </button>

                <button className={selected2} onClick={selectBtn2}>
                    <span>Round Trip</span>
                </button>
            </div>

            <div className={inputDisp}>
                <div className="singleInput flex">
                    <div className="iconDiv">
                        <HiOutlineLocationMarker className='icon'/>
                    </div>
                    <div className="texts">
                        <h4>From</h4>
                        <Cascader options={options} onChange={handleFrom} defaultValue = {['Philippines', 'Cebu CEB']} />
                    </div>
                </div>

                <div className="singleInput flex">
                    <div className="iconDiv">
                    <HiOutlineLocationMarker className='icon'/>
                    </div>
                    <div className="texts">
                        <h4>To</h4>
                        <Cascader options={options} onChange={handleTo} defaultValue = {['Philippines', 'Manila MNL']}/>
                    </div>
                </div>

                <div className="singleInput flex">
                    <div className="iconDiv">
                        <RxCalendar className='icon'/>
                    </div>
                    <div className="texts">
                        <h4>Depart</h4>
                        <DatePicker onChange={departDate}/>
                    </div>
                </div>

                <div className={returnDisp}>
                    <div className="iconDiv">
                        <RxCalendar className='icon'/>
                    </div>
                    <div className="texts">
                        <h4>Return</h4>
                        <DatePicker onChange={returnDate}/>
                    </div>
                </div>

                <button className="btn btnBlock"><a href="/bookings">Search Flight</a></button>
            </div>
            
        </div>
    </div>
  )
}

export default Search