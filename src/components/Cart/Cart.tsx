import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";

import "./Cart.styles.scss";

import { createOrder } from "../../api/API";

import { ORDERS_URL } from "../../api/config";

import ICartItem from "../../Interfaces/ICartItem";
import IOrder from "../../Interfaces/IOrder";
import { Link } from "react-router-dom";

interface CartProps {
  cartItems: ICartItem[];
  removeFromCart(cartItem: ICartItem): void;
  resetCartItems(): void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  removeFromCart,
  resetCartItems,
}) => {
  const [showSubmittedModal, setShowSubmittedModal] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderState, setOrderState] = useState<any | null>({
    name: "",
    email: "",
    address: "",
  });

  const [checkOut, setCheckOut] = useState({
    name: "",
    email: "",
    address: "",
  });

  const companyId = 13932;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderState({ ...orderState, [e.target.name]: e.target.value });
  };

  const createOrders = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      id: 0,
      companyId: companyId,
      created: new Date().toISOString(),
      createdBy: orderState.email,
      paymentMethod: "mastercard",
      total: totalPrice,
      status: 0,
      orderRows: [],
    };

    createOrder(order);
    setShowSubmittedModal(true);
  };

  const clearOrder = () => {
    setOrderState(null);
    resetCartItems();
    setTotalPrice(0);
    localStorage.clear();
  };

  const closeModal = () => {
    clearOrder();
    setShowSubmittedModal(false);
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.movie.price * item.quantity;
      return setTotalPrice(total);
    });
  }, [cartItems]);

  Modal.setAppElement("body");

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='cart cart-header'>Cart is empty</div>
      ) : (
        <div className='cart cart-header'>
          You have {cartItems.length} item{cartItems.length >= 2 ? "s" : ""} in
          the cart
        </div>
      )}
      {showSubmittedModal && (
        <Modal
          isOpen={true}
          onRequestClose={() => closeModal()}
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
              padding: "20px",
              opacity: "0.95",
            },
          }}>
          <Zoom>
            <div className='bg-dark'>
              <div className='order-details'>
                <span className='close-modal '>
                  <Link
                    to='/'
                    className='button-close-modal'
                    onClick={() => closeModal()}>
                    +
                  </Link>
                </span>
                <div className='success-message'>
                  Your order has been placed
                </div>
                <h2>Order: {Math.floor(Math.random() * 11000 - 6000)}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{orderState.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{orderState.email}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{new Date().toISOString()}</div>
                  </li>
                  <li>
                    <div>Total:</div>
                    <div>{totalPrice} KR</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {cartItems.map((item) => (
                        <div key={item.movie.id}>
                          {item.quantity}
                          {" x "}
                          {item.movie.name}
                        </div>
                      ))}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
      <div>
        <div className='cart'>
          <Fade direction={"left"} triggerOnce={true} cascade>
            <ul className='cart-items'>
              {cartItems.map((item) => (
                <li className='cart-info' key={item.movie.id}>
                  <div>
                    <img src={item.movie.imageUrl} alt={item.movie.name} />
                  </div>
                  <div>
                    <div>{item.movie.name}</div>
                    <div className='cart-items-right'>
                      {item.movie.price} KR x {item.quantity}{" "}
                      <button
                        className='button primary'
                        onClick={() => {
                          removeFromCart(item);
                        }}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className='cart'>
              <div className='total'>
                <div>
                  Total: <span className='total-sum'>{totalPrice} KR</span>
                </div>
                <button
                  onClick={() => setShowCheckOut(true)}
                  className='button primary'>
                  Proceed
                </button>
              </div>
            </div>
            {showCheckOut && (
              <Fade direction={"right"} triggerOnce={true} cascade>
                <div className='cart'>
                  <form onSubmit={createOrders}>
                    <ul className='form-container'>
                      <li>
                        <label>Email</label>
                        <input
                          name='email'
                          type='email'
                          required
                          onChange={handleInput}></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name='name'
                          type='text'
                          required
                          onChange={handleInput}></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name='address'
                          type='text'
                          required
                          onChange={handleInput}></input>
                      </li>
                      <li>
                        <button type='submit' className='button primary'>
                          Check Out
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
