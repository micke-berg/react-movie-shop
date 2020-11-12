import React from "react";
import "./Products.style.scss";

import { IMovie } from "../../Interfaces/IMovie";

interface IProductsProps {
  addToCart(value: IMovie): void;
  products: IMovie[];
}

function Products(props: IProductsProps) {
  return (
    <div>
      <ul className='products'>
        {props.products.map((product) => (
          <li key={product.id}>
            <div className='product'>
              <a href={product.imageUrl}>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.name}</p>
              </a>
              <div className='product-price'>
                <div>{product.price} KR</div>
                <button
                  onClick={() => props.addToCart(product)}
                  className='button primary'>
                  Add To Cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
