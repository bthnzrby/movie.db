import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, DETAIL_URL } from "../config/Url";
import { useParams } from "react-router-dom";
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
  const [movieDetail, setMovieDetail] = useState<MovieDetailOutput >();

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
      { 
      movieDetail &&
        <div>{movieDetail.title}

                <h1>{movieDetail.title}</h1>
                <img src={`t/p/w533_and_h300_bestv2${movieDetail.poster_path}`} alt="" />
                
        </div>
        
      }
    </div>
  )
};

export default MovieDetailPage;
