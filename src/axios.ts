import React, { useState, useEffect } from "react";
import axios from "axios";
import { IMovie } from "./Interfaces/IMovie";

async function getMovies() {
  const movieResult = await axios.get<IMovie[]>(
    "https://medieinstitutet-wie-products.azurewebsites.net/api/products"
  );
  console.log(movieResult);
  return movieResult;
}

useEffect(() => {
  getMovies();
}, []);
