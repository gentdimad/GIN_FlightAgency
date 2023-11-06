import 'aos/dist/aos.css';

import {
  useEffect,
  useState,
} from 'react';

import { Table } from 'antd';
import Aos from 'aos';

const { Column } = Table;

const MyFlights = () => {

    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])

    const [tickets, setTickets] = useState([])
    useEffect(() => {
        getTickets();
    }, [])

    const getTickets = () => {
        fetch("http://127.0.0.1:8000/api/gettickets").then((response) => response.json()).then((data) => {
              console.log(data);
              setTickets(data);
    })
    }

    const [flights, setFlights] = useState([])
    const mine = flights.filter(f => tickets.some(item => (item.FID === f.FID && item.owner == localStorage.getItem("owner"))));


    useEffect(() => {
        getFlights();
    }, [])

    const getFlights = () => {
        fetch("http://127.0.0.1:8000/api/getflights").then((response) => response.json()).then((data) => {
              console.log(data);
              setFlights(data);
    })
    }


    const cancelFlight = (value) => {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                owner: localStorage.getItem("owner"),
                FID: value
            }),
          };
          console.log(requestOptions)
          fetch('http://127.0.0.1:8000/api/deleteticket', requestOptions).then((response)=> response.json()
          ).then((data) => console.log(data));
          window.location.reload(true)
    }

  return (
    <div className="myflights section container">

            <div data-aos='fade-up' data-aos-duration='1500' className="head">
                <div className="logoDiv">
                    
                </div>
                <h1>Your Flights</h1>
                <small>Your Upcoming Travels</small>
            </div>
            <div data-aos='fade-up' data-aos-duration='1500' className="sectionContainer">
                <Table dataSource={mine} pagination={false} >
                <Column title="Flight ID" dataIndex="FID" key="FID" />
                <Column title="From" dataIndex="origin" key="origin" />
                <Column title="To" dataIndex="destination" key="destination" />
                <Column title="Depart" dataIndex="depart" key="depart" />
                <Column title="Take Off" dataIndex="dTime" key="dTime" />
                <Column title="Arrive" dataIndex="aTime" key="aTime" />
                <Column
                dataIndex="FID"
                key="FID"
                render={(text, record)=><button className="btn" onClick={()=> cancelFlight(record.FID)}>Cancel</button>}
                />
                </Table>
            </div>
        </div>
  )
}

export default MyFlights