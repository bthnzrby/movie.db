import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, DETAIL_URL } from "../config/Url";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
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

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div>
            { 
            movieDetail &&
              <div>
                
                  
              
                      <h1>{movieDetail.title}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} alt="" />
                    <div>{movieDetail.title}</div>
              </div>
            }
        </div>
    </div>
  )
};

export default MovieDetailPage;
