import axios from 'axios'
import React from 'react'
import { API_KEY, DETAIL_URL } from '../config/Url'
import { useParams } from 'react-router-dom'
const MovieDetailPage = () => {

    let params = useParams();
    axios.get(DETAIL_URL + params.id + API_KEY ).then(
        res => console.log(res)        
    )
  return (
    <div>MovieDetailPage</div>
  )
}

export default MovieDetailPage