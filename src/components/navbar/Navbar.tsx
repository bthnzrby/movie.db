import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
import SearchBar from './searchBar/SearchBar';

const Navbar = () => {
  
  return (
    <div className='navbar'>
        <div className='logo'>
           <Link to= {"/"}>Ana Sayfa</Link>
        </div>
        <div className="search-bar">
          <SearchBar/>
        </div>
        <div className='profil'> <Link to= {"/Profil"}>Profil</Link> </div>

        

    </div>
  )
}

export default Navbar