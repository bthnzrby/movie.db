import React, { useEffect, useState } from "react";
import { getFavories } from "../../Firebase/Firebase";
import { MovieDetailOutput } from "../MovieDetail/MovieDetailPage";
import { useAuth } from "../../Context/AuthContext";

const Favories = () => {
  const [favories, setFavories] = useState<Array<MovieDetailOutput>>([]);
  const { getUser } = useAuth();

  const fetchFavories = async () => {
    const res = await getFavories(getUser().uid);
    console.log(res);
    setFavories(res);
  };

  useEffect(() => {
    fetchFavories();
  }, []);

  return <div>{favories.map((favori) => favori.original_title)}</div>;
};

export default Favories;
