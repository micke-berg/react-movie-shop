import React, { useState } from "react";
import "./Products.style.scss";

import { IMovie } from "../../Interfaces/IMovie";
import { ICartItem } from "../../Interfaces/ICartItem";
import { IProduct } from "../../Interfaces/IProduct";

import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";
import Thumb from "../Thumb/Thumb";

// interface ProductsData {
//   products: IMovie[];
//   name: string;
//   id: number;
//   imageUrl: string;
//   price: number;
// }

interface Props {
  products: IMovie[];
  addToCart(product: IMovie): void;
}

const Products: React.FC<Props> = ({ products, addToCart }) => {
  const [modalProduct, setModalProduct] = useState<IMovie | null>(null);

  const truncate = (str: any, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const openModal = (product: IMovie) => {
    setModalProduct(product);
  };

  const closeModal = () => {
    setModalProduct(null);
  };

  // console.log("cartItems products component", state.product);

  return (
    <div>
      {/* <Fade direction={"up"} cascade> */}
      <ul className='products-list'>
        {products.map((movie) => (
          <Thumb movie={movie} addToCart={addToCart} openModal={openModal} />
        ))}
      </ul>
      {/* </Fade> */}
      {modalProduct && (
        <Modal isOpen={true} onRequestClose={closeModal} className='modal'>
          <Zoom>
            <button onClick={closeModal}>X</button>
            <div className='modal-wrapper'>
              <div className='modal-product-details'>
                <img src={modalProduct.imageUrl} alt={modalProduct.name} />
                <div className='modal-products-detail-description'>
                  <h1>
                    <strong>{modalProduct.name}</strong>
                  </h1>
                  <p className='year-category'>{modalProduct.year}</p>

                  <div>
                    <div className='modal-product-price'>
                      {modalProduct.price}
                    </div>
                    <button
                      className='button primary'
                      onClick={() => {
                        addToCart(modalProduct);
                        closeModal();
                      }}></button>
                  </div>
                </div>
              </div>
              {/* <p>{product.description}</p> */}
              <p>{truncate(modalProduct.description, 150)}</p>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
