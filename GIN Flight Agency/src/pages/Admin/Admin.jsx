import Navbar from '../../Components/Navbar/Navbar';
import AllFlights from './AllFlights/AllFlights';
import NewFlight from './NewFlight/NewFlight';
import UserTable from './UserTable/UserTable';

const Admin = () => {
    if(localStorage.getItem("is_admin") === 'true'){
        return (
            <>
                <Navbar/>
                <div className="admin section">
                    <div className="headText">
                        <h1>Admin Page</h1>
                        <small>Be careful and deliberate in what you do</small>
                    </div>
                <NewFlight/>
                
                    <UserTable/>
                    <AllFlights/>
                
                </div>
            </>
          )
    }else{
        window.location.href="/"
    }
}

export default Admin