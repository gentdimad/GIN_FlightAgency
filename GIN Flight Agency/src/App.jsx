import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Account from './pages/Account/Account';
import Admin from './pages/Admin/Admin';
import Bookings from './pages/Bookings/Bookings';
import Homepage from './pages/Homepage/Homepage';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/bookings" element={<Bookings/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </Router>
  </>
  )
}

export default App;
