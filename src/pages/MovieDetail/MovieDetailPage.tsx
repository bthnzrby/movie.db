import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, DETAIL_URL, IMG_SIZE_500, IMG_URL } from "../../config/Url";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./MovieDetailPage.css";
import { MoviesMainOutput } from "../../components/mainPageComponents/FilmCarousel";
import { Tooltip, message } from "antd";
import { HeartFilled } from "@ant-design/icons";
// import { Firestore } from "firebase/firestore";
import {
  addFavorites,
  getFavorites,
  removeFavorites,
} from "../../Firebase/Firebase";
import { useAuth } from "../../Context/AuthContext";

// import HeartOutlined from "@ant-design/icons";
export interface MovieDetailOutput {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    backdrop_path: string;
    id: number;
    name: string;
    poster_path: string;
  };
  budget: number;
  genres: Array<{ id: number; name: string }>; //{id: number, name: string}[]
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: Array<{
    id: number;
    name: string;
    origin_country: string;
    logo_path: string;
  }>;
  production_countries: Array<any>;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieReviewsOutput {
  author: string;
  content: string;
}

export interface MovieCastOutput {
  cast_id: number;
  character: any;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  popularity: number;
  profile_path: string;
  original_name: string;
}

const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetailOutput>();
  const [movieCredits, setMovieCredits] = useState<Array<MovieCastOutput>>([]);
  const [movieRecommendation, setMovieRecommendation] = useState<
    Array<MoviesMainOutput>
  >([]);
  const [movieReviews, setMovieReviews] = useState<Array<MovieReviewsOutput>>(
    []
  );
  const [isClicked, setIsClicked] = useState(false);

  const { getUser } = useAuth();
  let params = useParams();

  useEffect(() => {
    getFavorites(getUser().uid).then((res) => {
      // console.log(res);
      const result = res.find((movie) => movie.id === movieDetail?.id);
      if (result) setIsClicked(true);
      else setIsClicked(false);
    });
  }, [movieDetail]);

  useEffect(() => {
    axios.get(DETAIL_URL + params.id + "?" + API_KEY).then((res) => {
      setMovieDetail(res.data);
    });
  }, [params.id]);

  useEffect(() => {
    axios.get(DETAIL_URL + params.id + "/credits?" + API_KEY).then((res) => {
      setMovieCredits(res.data.cast);
      // console.log(res.data.cast);
    });
  }, [params.id]);

  useEffect(() => {
    axios
      .get(DETAIL_URL + params.id + "/recommendations?" + API_KEY)
      .then((res) => {
        setMovieRecommendation(res.data.results);
        // console.log(res.data.results);
      });
  }, [params.id]);

  useEffect(() => {
    axios.get(DETAIL_URL + params.id + "/reviews?" + API_KEY).then((res) => {
      setMovieReviews(res.data.results);
      console.log(res.data.results);
    });
  }, [params.id]);

  const handleIconClick = () => {
    if (!isClicked) {
      setIsClicked(true);
      addFavorites(movieDetail, getUser().uid);
      message.info("Favorilere Başarıyla Eklendi");
    } else {
      setIsClicked(false);
      removeFavorites(movieDetail, getUser().uid);
      message.info("Favorilerden Başarıyla Çıkarıldı");
    }
  };
  //  setTodos(todos.filter((el) => el.id !== todo.id));
  // const handleAddToFavorites = async () => {
  //   try {
  //     await colRef('favorites').add({
  //       title: movieDetail.data.results.title,
  //       director: movieDetail.data.results.director,
  //     });
  //     console.log('Film favorilere eklendi!');
  //   } catch (error) {
  //     console.error('Film favorilere eklenirken bir hata oluştu:', error);
  //   }
  // };

  return (
    <div className="movie-detail-page">
      <div>
        <Navbar />
      </div>
      <div className="movie-detail-info">
        {movieDetail && (
          <div className="movie-detail-preview">
            <div className="movie-detail-page-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                alt=""
              />
            </div>
            <div className="movie-detail-page-paragraph">
              <h5> Release Date: {movieDetail.release_date}</h5>
              <h1>{movieDetail.title}</h1>
              <HeartFilled
                style={{ color: isClicked ? "red" : "black" }}
                onClick={handleIconClick}
                className="for-z-index"
              />
              <h3>{movieDetail.original_title}</h3>
              <h3 style={{ color: "black" }}> "{movieDetail.tagline}"</h3>
              <div className="genres">
                {movieDetail.genres.map(
                  (genre: { id: number; name: string }, i: number) => (
                    <div>
                      <h4> {genre.name}</h4>
                    </div>
                  )
                )}
              </div>
              {/* <h5>Language:{movieDetail.original_language} </h5> */}
              <p>{movieDetail.overview}</p>
              <div className="movie-detail-vote">
                <h3> Counted Vote: {movieDetail.vote_count}</h3>
                <h3
                  style={{
                    color:
                      movieDetail.vote_average > 7
                        ? "green"
                        : movieDetail.vote_average > 4
                        ? "yellow"
                        : "red",
                  }}
                >
                  {" "}
                  imdb: {movieDetail.vote_average}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="cast">
        <div className="cast-info">
          <h1>Cast</h1>
          <div className="cast-cards">
            {movieCredits.map((castD: MovieCastOutput) => (
              <div className="cast-card">
                <div className="cast-img">
                  <img
                    src={`	https://www.themoviedb.org/t/p/w138_and_h175_face${castD.profile_path}`}
                    alt=""
                  />
                </div>
                <div className="cast-names">
                  <h3>{castD.original_name}</h3>
                  {castD.character.length > 18 ? (
                    <Tooltip placement="bottom" title={castD.character}>
                      <h4> {castD.character}</h4>
                    </Tooltip>
                  ) : (
                    <h4> {castD.character}</h4>
                  )}

                  {/* <h4> {castD.character}</h4> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="recommendation">
        <div className="recommendation-info">
          <h1>Recommendation</h1>
          <div className="recommendation-cards">
            {movieRecommendation &&
              movieRecommendation.map((recom: MoviesMainOutput) => (
                <div className="recommendation-card">
                  <Link to={`/detail/${recom.id}`}>
                    <div className="recommendation-img">
                      <img
                        src={`${IMG_URL}${IMG_SIZE_500}${recom.poster_path}`}
                        alt=""
                      />
                    </div>
                    <div className="recommedation-movie-info">
                      {recom.title.length > 15 ? (
                        <Tooltip placement="bottom" title={recom.title}>
                          <p className="movie-title">{recom.title}</p>
                        </Tooltip>
                      ) : (
                        <p className="movie-title">{recom.title}</p>
                      )}
                      <h4
                        className="recommendation-movie-imdb"
                        style={{
                          color:
                            recom.vote_average > 7
                              ? "green"
                              : recom.vote_average > 4
                              ? "yellow"
                              : "red",
                        }}
                      >
                        {recom.vote_average}
                      </h4>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="reviews">
        <div className="reviews-info">
          <h1>Reviews</h1>
          <div className="reviews-cards">
            {movieReviews &&
              movieReviews.map((reviews: MovieReviewsOutput) => (
                <div className="reviews-card">
                  <div className="author">{reviews.author}</div>
                  {/* <hr className="hr" /> */}
                  <div className="review-content">{reviews.content}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
