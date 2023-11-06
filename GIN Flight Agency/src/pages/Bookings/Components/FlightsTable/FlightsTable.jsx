import 'aos/dist/aos.css';

import {
  useEffect,
  useState,
} from 'react';

import {
  Modal,
  Table,
} from 'antd';
import Aos from 'aos';

const { Column} = Table;

const FlightsTable = () => {
    const [visible, setVisible] = useState(false)
    
    const showWarning = () => {
        setVisible(true)
    }

    const onCancel = () => {
        setVisible(false)
    }
    

    useEffect(()=>{
        Aos.init({duration: 2000})
      }, [])
      
    const [roundTrip, setRoundTrip] = useState(false);
    
    useEffect(() => {
    setRoundTrip(localStorage.getItem("roundTrip"))
    if (roundTrip == "true") {
        setRetDisp('sectionContainer')
    }
    else{
        setRetDisp('vanish')
    }
    }, [roundTrip]);

    const [retDisp, setRetDisp] = useState('sectionContainer')

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
    useEffect(() => {
        getFlights();
    }, [])

    const getFlights = () => {
        fetch("http://127.0.0.1:8000/api/getflights").then((response) => response.json()).then((data) => {
              console.log(data);
              setFlights(data);
    })
    }


    const taken = flights.filter(f => tickets.some(item => item.FID === f.FID));
    const remaining = flights.filter(item => !taken.includes(item));
    const departF = remaining.filter(item => (item.origin === localStorage.getItem("origin") && item.destination == localStorage.getItem("destination") && item.depart == localStorage.getItem("dDate")));
    const returnF = remaining.filter(item => (item.origin === localStorage.getItem("destination") && item.destination == localStorage.getItem("origin") && item.depart > localStorage.getItem("dDate") && item.depart >= localStorage.getItem("rDate") ));
    
    const bookTicket = (value) =>{
        if (localStorage.getItem("owner") == "" || localStorage.getItem("owner") == null){
            console.log("Please log in!")
            showWarning();
        }else{
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
          fetch('http://127.0.0.1:8000/api/createticket', requestOptions).then((response)=> response.json()
          ).then((data) => console.log(data));
          window.location.reload(true)
        }
    }

    return(
        <div className="bookings section container">
            <Modal
            visible={visible}
            width = '400px'
            onCancel={onCancel}
            footer = {null}>
                <h4>Please log in before booking a flight!</h4>
            </Modal>
            <div data-aos='fade-up' data-aos-duration='1500' className="head">
                <div className="logoDiv">
                    
                </div>
                <h1>Bookings</h1>
                <small>Travel With Us and Fulfill Your Wanderlust</small>
            </div>
            <div data-aos='fade-up' data-aos-duration='1500' className="sectionContainer">
                <div className="textDiv">
                    <div className="mainText">
                        <h2>Available Depart Flights</h2>
                    </div>
                </div>
                <div className="tableDiv">
                <Table dataSource={departF}>
                <Column title="Flight ID" dataIndex="FID" key="FID" />
                <Column title="From" dataIndex="origin" key="origin" />
                <Column title="To" dataIndex="destination" key="destination" />
                <Column title="Depart" dataIndex="depart" key="depart" />
                <Column title="Take Off" dataIndex="dTime" key="dTime" />
                <Column title="Arrive" dataIndex="aTime" key="aTime" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column
                dataIndex="FID"
                key="FID"
                render={(text, record)=><button className="btn" onClick={()=> bookTicket(record.FID)}>Book</button>}
                />
                </Table>
            </div>
            <div data-aos='fade-up' data-aos-duration='1500' className = {retDisp}>
            <div className="textDiv">
                <div className="mainText">
                <h2>Available Return Flights</h2>
                </div>
                <Table dataSource={returnF}>
                <Column title="Flight ID" dataIndex="FID" key="FID" />
                <Column title="From" dataIndex="origin" key="origin" />
                <Column title="To" dataIndex="destination" key="destination" />
                <Column title="Depart" dataIndex="depart" key="depart" />
                <Column title="Take Off" dataIndex="dTime" key="dTime" />
                <Column title="Arrive" dataIndex="aTime" key="aTime" />
                <Column title="Price" dataIndex="price" key="price" />
                <Column
                dataIndex="FID"
                key="FID"
                render={(text, record)=><button className="btn" onClick={()=> bookTicket(record.FID)}>Book</button>}
                />
                </Table>
            </div>
            </div>
            </div>
        </div>
)};


export default FlightsTable