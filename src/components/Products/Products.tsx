import React, { useState } from "react";
import "./Products.style.scss";

import Modal from "react-modal";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";

import IMovie from "../../Interfaces/IMovie";

import Thumb from "../Thumb/Thumb";
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

  return (
    <div>
      <ul className='products-list'>
        {products.map((movie) => (
          <Thumb
            key={movie.id}
            movie={movie}
            addToCart={addToCart}
            openModal={openModal}
          />
        ))}
      </ul>
      {modalProduct && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: "40px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              height: "100",
              border: "1px solid #ccc",
              background: "#181818",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "10px",
              opacity: "0.95",
            },
          }}>
          <Zoom>
            <div className='modal-wrapper '>
              <Link
                to='/'
                className='close-modal button-close-modal'
                onClick={closeModal}>
                +
              </Link>
              <div className='modal-product-details'>
                <img src={modalProduct.imageUrl} alt={modalProduct.name} />
                <div className='modal-products-info'>
                  <div>
                    <h1 className='product-name'>{modalProduct.name}</h1>
                    <span className='year'>{modalProduct.year}</span>
                  </div>
                  <div className='price-buy'>
                    <div className='modal-product-box'>
                      <div className='modal-product-price'>
                        {modalProduct.price} KR
                      </div>
                    </div>
                    <p>{modalProduct.description}</p>
                    <button
                      className='button primary'
                      onClick={() => {
                        addToCart(modalProduct);
                        closeModal();
                      }}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
