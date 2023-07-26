import React, { useEffect, useState } from "react";
import { getFavorites } from "../../Firebase/Firebase";
import { MovieDetailOutput } from "../MovieDetail/MovieDetailPage";
import { useAuth } from "../../Context/AuthContext";
import { IMG_SIZE_500, IMG_URL } from "../../config/Url";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import Navbar from "../../components/navbar/Navbar";
import "./Favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Array<MovieDetailOutput>>([]);
  const { getUser } = useAuth();

  const fetchFavorites = async () => {
    const res = await getFavorites(getUser().uid);
    setFavorites(res);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <Navbar />
      <div className="favorites-background">
        <div className="favorites-movies-cards">
          {favorites.map((favorite) => (
            <div className="favorites-movies-card">
              <Link to={`/detail/${favorite.id}`}>
                <img
                  className="click-movie"
                  src={`${IMG_URL}${IMG_SIZE_500}${favorite.poster_path}`}
                  alt=""
                />
                <div className="favorites-movies-info">
                  {favorite.title.length > 28 ? (
                    <Tooltip placement="bottom" title={favorite.title}>
                      <p className="favorites-movies-title">{favorite.title}</p>
                    </Tooltip>
                  ) : (
                    <p className="favorites-movies-title">{favorite.title}</p>
                  )}
                  <h4
                    className="favorites-movies-imdb"
                    style={{
                      color:
                        favorite.vote_average > 7
                          ? "green"
                          : favorite.vote_average > 4
                          ? "yellow"
                          : "red",
                    }}
                  >
                    {favorite.vote_average}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
