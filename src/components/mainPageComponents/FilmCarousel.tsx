import React, { useEffect, useState } from 'react'
import type { RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';
import type { DotPosition } from 'antd/es/carousel';
import axios from 'axios';
import { API_KEY, DETAIL_URL } from '../../config/Url';

export interface MoviesMainOutput {
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Array<number>
    id:number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  total_pages: number;
  total_results: number;
}


const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const FilmCarousel = () => {

  const [dotPosition, setDotPosition] = useState<DotPosition>('top');

  const [moviesPopuler, setMoviesPopuler] = useState<MoviesMainOutput>();
  const [moviesTopRated, setMoviesTopRated] = useState<MoviesMainOutput>();
  const [moviesUpcoming, setMoviesUpcoming] = useState<MoviesMainOutput>();

  useEffect(() => {
    axios
      .get(DETAIL_URL + "popular?" + API_KEY)
      .then((res) => {
        setMoviesPopuler(res.data)
        console.log(res.data)
    })
  }, [setMoviesPopuler]);

  useEffect(() => {
    axios
      .get(DETAIL_URL + "top_rated?" + API_KEY)
      .then((res) => {
        setMoviesTopRated(res.data)
        console.log(res.data)
    })
  }, [setMoviesTopRated]);
  
  useEffect(() => {
    axios
      .get(DETAIL_URL + "upcoming?" + API_KEY)
      .then((res) => {
        setMoviesUpcoming(res.data)
        console.log(res.data)
    })
  }, [setMoviesUpcoming]);

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPosition(value);
  };
  
  return (

    <div className='film-carousel'>
      <div>
        {/* <Radio.Group onChange={handlePositionChange} value={dotPosition} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Top</Radio.Button>
          <Radio.Button value="bottom">Bottom</Radio.Button>
          <Radio.Button value="left">Left</Radio.Button>
          <Radio.Button value="right">Right</Radio.Button>
        </Radio.Group> */}
        <Carousel dotPosition={dotPosition}>
          <div>
            {
            moviesPopuler && 
            <div>
              {moviesPopuler.results.id}
            </div>
            }
            
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>

      </div>
    </div>
  )
}

export default FilmCarousel