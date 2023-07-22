import { Tooltip } from "antd";
import { MoviesMainOutput } from "../../../components/mainPageComponents/FilmCarousel";
import { IMG_SIZE_500, IMG_URL } from "../../../config/Url";
import "./Movies.css";
import React from "react";
import { Link } from "react-router-dom";
import FilterSection from "../../../components/FilterSection/FilterSection";

interface Props {
  movies: MoviesMainOutput[];
}

const Movies = ({ movies }: Props) => {
  return (
    <div className="all-movies-cards">
      {movies.map((movie: MoviesMainOutput) => (
        <div className="all-movies-card">
          <Link to={`/detail/${movie.id}`}>
            <img
              className="click-movie"
              src={`${IMG_URL}${IMG_SIZE_500}${movie.poster_path}`}
              alt=""
            />
            <div className="all-movies-info">
              {movie.title.length > 28 ? (
                <Tooltip placement="bottom" title={movie.title}>
                  <p className="all-movies-title">{movie.title}</p>
                </Tooltip>
              ) : (
                <p className="all-movies-title">{movie.title}</p>
              )}
              <h4
                className="all-movies-imdb"
                style={{
                  color:
                    movie.vote_average > 7
                      ? "green"
                      : movie.vote_average > 4
                      ? "yellow"
                      : "red",
                }}
              >
                {movie.vote_average}
              </h4>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;
