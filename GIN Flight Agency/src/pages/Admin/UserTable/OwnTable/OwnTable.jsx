/* eslint-disable react/prop-types */
import 'antd/dist/reset.css';

import React, {
  useEffect,
  useState,
} from 'react';

// form and modal modules
import {
  Modal,
  Table,
} from 'antd';

const {Column} = Table;

class OwnTable extends React.Component {
    
    render(){
        const OpenFlightTable = ({ visible, onCancel}) => {
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
    const mine = flights.filter(f => tickets.some(item => (item.FID === f.FID && item.owner == localStorage.getItem("userTable"))));

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
                owner: localStorage.getItem("userTable"),
                FID: value
            }),
          };
          console.log(requestOptions)
          fetch('http://127.0.0.1:8000/api/deleteticket', requestOptions).then((response)=> response.json()
          ).then((data) => console.log(data));
          window.location.reload(true)
    };

            
          return (
            <Modal
            width = '1000px'
            visible={visible}
            title="Flights"
            cancelText="Close"
            onCancel={onCancel}
            footer={null}
          >
                <Table dataSource={mine} pagination = {{pageSize:5}} >
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
                render={(text, record)=><button className="btn" onClick={()=> cancelFlight(record.FID)}>Cancel</button>}
                />
                </Table>
        </Modal>
          );
        };
        
        const FlightTable = () => {
          const [visible, setVisible] = useState(false);
        
          return (
            <div >
              <button className = 'btn register'
                type="primary"
                onClick={() => {
                  setVisible(true);
                }}
              >
                Check Flights
              </button>
              <OpenFlightTable
                visible={visible}
                onCancel={() => {
                  setVisible(false);
                }}
              />
            </div>
          );
        };

    return (
            <div>
             <FlightTable />
            </div>
    );
  }
  }
  export default OwnTable;