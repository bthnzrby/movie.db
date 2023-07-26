import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "./searchBar/SearchBar";
import { useAuth } from "../../Context/AuthContext";
import { logOut } from "../../Firebase/Firebase";
import { message } from "antd";

const Navbar = () => {
  const { user } = useAuth();

  const logOutLink = async () => {
    try {
      await logOut();
      message.info("Çıkış Başarılı");
      localStorage.removeItem("userData");
      // history.push('/LogIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar-white">
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
          {user && localStorage.getItem("userData") ? (
            <div className="in-out">
              <Link className="navbar-links" to={"/Favorites"}>
                {" "}
                Favorites
              </Link>
              <Link
                className="navbar-links"
                to={"/SignIn"}
                onClick={logOutLink}
              >
                {" "}
                Log Out
              </Link>
            </div>
          ) : (
            <div className="in-out">
              <Link className="navbar-links" to={"/SignUp"}>
                {" "}
                Sign up{" "}
              </Link>
              <Link className="navbar-links" to={"/SignIn"}>
                {" "}
                Sign in{" "}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
