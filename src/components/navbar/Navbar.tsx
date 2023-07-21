import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css";
import SearchBar from './searchBar/SearchBar';

const Navbar = () => {
  
  return (
    <div className='navbar'>
        <div className='logo'>
           <Link className='navbar-links' to= {"/"}>Main Page</Link>
           <Link className='navbar-links' to= {"/AllMovies"}>All Movies</Link>
        </div>
        <div className="search-bar">
          <SearchBar/>
        </div>
        <div className='profil'> 
        <Link className='navbar-links' to= {"/SignUp"}> Sign up </Link> 
        <Link className='navbar-links' to= {"/SignIn"}> Sign in </Link> 

        </div>

        

    </div>
  )
}

export default Navbar