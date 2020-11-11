import React from "react";
import "./Products.style.scss";

function Products(props: any) {
  return (
    <div>
      <ul className='products'>
        {props.products.map((product: any) => (
          <li key={product.id}>
            <div className='product'>
              <a href={product.imageUrl}>
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </a>
              <div className='product-price'>
                <div>{product.price} KR</div>
                <button className='button primary'>Add To Cart</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
