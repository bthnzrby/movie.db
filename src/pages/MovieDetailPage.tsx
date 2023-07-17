import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, DETAIL_URL } from "../config/Url";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import HeartOutlined from "@ant-design/icons";
export interface MovieDetailOutput {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: {
        backdrop_path: string;
        id: number;
        name: string;
        poster_path: string;
    };
    budget: number
    genres: Array<{id: number, name: string}>; //{id: number, name: string}[]
    homepage: string
    id: number
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    production_companies: Array<{id: number, name: string, origin_country: string, logo_path: string}>;
    production_countries: Array<any>;
    poster_path: string;
    release_date:string;
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
const MovieDetailPage = () => {
  const [movieDetail, setMovieDetail] = useState<MovieDetailOutput>();

  let params = useParams();
  
  useEffect(() => {
    axios
      .get(DETAIL_URL + params.id + "?" + API_KEY)
      .then((res) => {
        setMovieDetail(res.data)
        console.log(res.data)
    })
  }, [params.id]);

  console.log(movieDetail);
  
  return (
    <div className="movie-detail-page">
        <div>
            <Navbar/>
        </div>
        <div className="movie-detail-info">
            { 
            movieDetail &&
              <div className="movie-detail-preview">
                <div className="movie-detail-page-img">
                  <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt="" />                   
                </div>
                <div className="movie-detail-page-paragraph">
                  <h5> Release Date: {movieDetail.release_date}</h5>
                  <h1>{movieDetail.title}</h1>
                  {/* <HeartOutlined className="for-z-index"/> */}
                  <h3>{movieDetail.original_title}</h3>                   
                    <h3 style={{color:"black"}}>  "{movieDetail.tagline}"</h3>
                  {/* <h5>Language:{movieDetail.original_language} </h5> */}
                  <p>{movieDetail.overview}</p>
                  <div className="movie-detail-vote">
                    <h3> Counted Vote: {movieDetail.vote_count}</h3>
                    <h3 style={{color: movieDetail.vote_average >7 ? "green": movieDetail.vote_average >4 ? "yellow": "red" }}> imdb: {movieDetail.vote_average}</h3>
                  </div>
                </div>
              </div>
            }
        </div>
    </div>
  )
};

export default MovieDetailPage;
