import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./searchBar/SearchBar";
import { useAuth } from "../../Context/AuthContext";
import { logOut } from "../../Firebase/Firebase";
import { Button, message } from "antd";

const Navbar = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  
  const logOut1 =async () => {
    try {
      await logOut()
      message.info( "Çıkış Başarılı")
      localStorage.removeItem("userData")
    } catch (error) {
      console.log(error);

    }
  }


  return (
    <div className="navbar">
      <div className="logo">
        <Link className="navbar-links" to={"/"}>
          Main Page
        </Link>
        <Link className="navbar-links" to={"/AllMovies"}>
          All Movies
        </Link>
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="profil">
        {!user ? (
          <div>
            <Link className="navbar-links" to={"/SignUp"}>
              {" "}
              Sign up{" "}
            </Link>
            <Link className="navbar-links" to={"/SignIn"}>
              {" "}
              Sign in{" "}
            </Link>
          </div>
        ) : (
          <div>
            <Link className="favories" to={"Favories"}> Favories</Link>
            <Link className="log-out" to={"/SignIn"} onClick={logOut1}> log out</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
