import React, { useState } from "react";
import "./Thumb.style.scss";

import IMovie from "../../Interfaces/IMovie";
import ICartItem from "../../Interfaces/ICartItem";
import IProduct from "../../Interfaces/IProduct";

import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";

// interface addToCartProps {
//   movie: IMovie;
// }

interface Props {
  addToCart(value: IMovie): void;
  movie: IMovie;
  openModal(product: IMovie): void;
  // movie: addToCartProps;
}

const Thumb: React.FC<Props> = ({ addToCart, movie, openModal }) => {
  const truncate = (str: any, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <li key={movie.id} className='thumb-li'>
      <a href={`#${movie.id}`} onClick={() => openModal(movie)}>
        <img src={movie.imageUrl} alt={movie.name} />
      </a>
      <div className='title-price'>
        <p>{truncate(movie.name, 50)}</p>

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
