import {
  useEffect,
  useState,
} from 'react';

import { AiOutlineGlobal } from 'react-icons/ai';
import { BsPhoneVibrate } from 'react-icons/bs';
import { CgMenuGridR } from 'react-icons/cg';
import { SiConsul } from 'react-icons/si';

import logo from '../../assets/logo.png';
import Login from './Login/Login';
import Register from './Register/Register';

const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    
    const handleNameClick = () => {
        if(isAdmin == "true"){
            window.location.href="/admin"
        }else{
            window.location.href="/account"
        }
    }

    useEffect(() => {
    setLoggedInUser(localStorage.getItem("authenticated"))
    setIsAdmin(localStorage.getItem("is_admin"))
    if (loggedInUser == "true") {
        setLoggedIn('seen')
        setLoggedOut('vanish')
        if(isAdmin == "true"){
            addBG('vanish')
        }
    }
    }, [loggedInUser, isAdmin]);

    const currentUser = localStorage.getItem("owner")
    const[loggedIn, setLoggedIn] = useState('vanish')
    const[loggedOut, setLoggedOut] = useState('seen')
    const[active, setActive] = useState('navBarMenu')
    const showNavBar = ()=>{
        setActive('navBarMenu showNavBar')
    }

    const logOut = () => {
        localStorage.setItem("authenticated", false);
        localStorage.setItem("is_admin", false);
        localStorage.setItem("owner", "");
        setLoggedIn('vanish')
        setLoggedOut('seen')
        if(isAdmin == "true"){
            setIsAdmin(false)
            localStorage.setItem("owner", "");
            window.location.href="/"
        }
      }

    const removeNavBar = ()=>{
        setActive('navBarMenu')
    }

    const[noBG, addBG] = useState('navBarTwo')
    const addBGColor = ()=>{
        if(isAdmin == "true"){
            addBG('vanish')
        }else{
            if(window.scrollY >= 10){
                addBG('navBarTwo withBG')
            }else{
                addBG('navBarTwo')
            }
        }
    }
    window.addEventListener('scroll', addBGColor)


  return (
    <div className = 'navBar flex'>
        <div className="navBarOne flex">
            <div>
                <SiConsul/>
            </div>

            <div className="none flex">
                <li className="flex"><BsPhoneVibrate/>Support</li>
                <li className="flex"><AiOutlineGlobal/>Languages</li>
            </div>

            <div className="atb flex">
                <span className={loggedOut}><Login/></span>
                <span className={loggedOut}><Register/></span>
                <span className={loggedIn} ><a onClick = {handleNameClick}>Hello, {currentUser}!</a></span>
                <span className={loggedIn}><button className="btn"  onClick={logOut}>Sign Out</button></span>
            </div>
        </div>

        <div className={noBG}>
            <div className="logoDiv">
                <img src={logo} className='Logo'/>
            </div>

            <div className={active}>
            <ul className="menu flex">
                <li onClick = {removeNavBar} className="listItem"><a href="/">Home</a></li>
                <li onClick = {removeNavBar} className="listItem">About</li>
                <li onClick = {removeNavBar} className="listItem">Offers</li>
                <li onClick = {removeNavBar} className="listItem">Seats</li>
                <li onClick = {removeNavBar} className="listItem">Destinations</li>
            </ul>

            <button onClick = {removeNavBar} className="btn flex btnOne">
                Contact
            </button>
            </div>

            <button className="btn flex btnTwo">
                Contact
            </button>

            <div onClick = {showNavBar} className="toggleIcon">
                    <CgMenuGridR className = 'icon'/>
            </div>

        </div>

        

    </div>
  )
}

export default Navbar