import 'aos/dist/aos.css';
import 'antd/dist/reset.css';

import { useEffect } from 'react';

import {
  Cascader,
  DatePicker,
  InputNumber,
  TimePicker,
} from 'antd';
import Aos from 'aos';
import dayjs from 'dayjs';

const NewFlight = () => {
    localStorage.setItem("createorigin", "Cebu CEB");
    localStorage.setItem("createdestination", "Manila MNL");
    localStorage.setItem("createdDate", "");
    localStorage.setItem("createtTime", "");
    localStorage.setItem("createaTime", "");
    localStorage.setItem("createPrice", "");
    const format = 'HH:mm';


    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])

    const handleFrom = (value) => {
        console.log(value[1])
        localStorage.setItem("createorigin", value[1]);
      }

      const handleTo = (value) => {
        console.log(value[1])
        localStorage.setItem("createdestination", value[1]);
      }

      function departDate (date, dateString){
        console.log(date, dateString);
        localStorage.setItem("createdDate", dateString);
      }

      function getPrice (value){
        console.log(value)
        localStorage.setItem("createPrice", value);
      }

      const createFlight = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                origin: localStorage.getItem("createorigin"),
                destination: localStorage.getItem("createdestination"),
                depart: localStorage.getItem("createdDate"),
                dTime: localStorage.getItem("createtTime"),
                aTime: localStorage.getItem("createaTime"),
                price: localStorage.getItem("createPrice"),
            }),
          };
          console.log(requestOptions)
        fetch("http://127.0.0.1:8000/api/flights/create", requestOptions).then((response) => response.json()).then((data) => {
              console.log(data);
              window.location.reload(true)
    })
    }

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
    <div className="create container section">
        <div className="sectionContainer grid" data-aos='fade-up' data-aos-duration='1500'>
            <div className="head">
                <h1>Add Flights</h1>
                <p>Adding new flights</p>
            </div>
            <div className='searchInputs flex'>
                <div className="singleInput flex">
                    <div className="texts">
                        <h4>From</h4>
                        <Cascader options={options} onChange={handleFrom} defaultValue = {['Philippines', 'Cebu CEB']} />
                    </div>
                </div>

                <div className="singleInput flex">
                    <div className="texts">
                        <h4>To</h4>
                        <Cascader options={options} onChange={handleTo} defaultValue = {['Philippines', 'Manila MNL']}/>
                    </div>
                </div>

                <div className="singleInput flex">
                    <div className="texts">
                        <h4>Depart</h4>
                        <DatePicker onChange={departDate}/>
                    </div>
                </div>

                <div className='singleInput flex'>
                    <div className="texts">
                        <h4>Takeoff Time</h4>
                        <TimePicker defaultValue={dayjs('12:00', format)} format={format} minuteStep = '5' onOk={(time) => {
                                localStorage.setItem("createtTime", time.format('HH:mm') + ':00');
                                console.log(time.format('HH:mm'));
                            }}/>
                    </div>
                </div>

                <div className='singleInput flex'>
                    <div className="texts">
                        <h4>Arrive Time</h4>
                        <TimePicker defaultValue={dayjs('12:00', format)} minuteStep = '5' format={format} onOk={(time) => {
                                localStorage.setItem("createaTime", time.format('HH:mm') + ':00');
                                console.log(time.format('HH:mm'));
                            }}/>
                    </div>
                </div>

                <div className='singleInput flex'>
                
                    <div className="texts">
                        <h4>Price</h4>
                        <InputNumber onChange={getPrice}/>
                    </div>
                </div>
            </div>
            <div className="btnBlock">
                <button className="btn" onClick={createFlight}>Add Flight</button>
            </div>
            
        </div>
    </div>
  )
}

export default NewFlight;