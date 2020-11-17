import React, { useState } from "react";
import "./Thumb.style.scss";

import IMovie from "../../Interfaces/IMovie";

import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";
interface Props {
  movie: IMovie;
  addToCart(value: IMovie): void;
  openModal(product: IMovie): void;
}

const Thumb: React.FC<Props> = ({ movie, addToCart, openModal }) => {
  const truncate = (str: any, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <li key={movie.id} className='thumb-li'>
      <a href={`#${movie.id}`} onClick={() => openModal(movie)}>
        <img src={movie.imageUrl} alt={movie.name} />
      </a>
      <div className='thumb-info'>
        <p>{truncate(movie.name, 45)}</p>

        <div className='thumb-product-price'>
          <div>{movie.price} KR</div>
          <button onClick={() => addToCart(movie)} className='button primary'>
            Add To Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default Thumb;
