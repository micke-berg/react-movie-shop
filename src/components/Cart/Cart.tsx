import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { Fade, Zoom } from "react-awesome-reveal";

import { createOrder } from "../../API";

import { ORDERS_URL } from "../../config";

import "./Cart.styles.scss";
import { ICartItem } from "../../Interfaces/ICartItem";
import { IMovie } from "../../Interfaces/IMovie";
import { IOrder } from "../../Interfaces/IOrder";

interface CartProps {
  cartItems: ICartItem[];
  // order: IOrder;
  removeFromCart(cartItem: ICartItem): void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  // order,
  removeFromCart,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [creatingOrder, setCreatingOrder] = useState<IOrder[]>([]);
  const [order, setOrder] = useState<IOrder[] | null>([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [showCheckOut, setShowCheckOut] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
    order: "",
    cartItems: "",
  });
  const companyId = 13932;

  const handleInput = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const createOrders = (e: any) => {
    e.preventDefault();

    const order = {
      name: formState.name,
      email: formState.email,
      address: formState.address,
      cartItems: cartItems,
      total: totalPrice,
    };
    createOrder(order);
  };

  const clearOrder = () => {
    setOrder(null);
  };

  const closeModal = () => {
    clearOrder();
  };

  console.log(formState);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total = total + item.movie.price * item.quantity;
      return setTotalPrice(total);
    });
  }, [cartItems]);

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
      {order && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <Zoom>
            <button className='close-modal' onClick={closeModal}>
              X
            </button>
            <div className='order-details'>
              <h3>Your order has been placed.</h3>
              <h2>Order: {order.id}</h2>
              <ul>
                <li>
                  <div>Name:</div>
                  <div>{order.name}</div>
                </li>
                <li>
                  <div>Email:</div>
                  <div>{order.email}</div>
                </li>
                <li>
                  <div>Address:</div>
                  <div>{order.adress}</div>
                </li>
                <li>
                  <div>Date:</div>
                  <div>{order.created}</div>
                </li>
                <li>
                  <div>Total:</div>
                  <div>{order.total}</div>
                </li>
                <li>
                  <div>Cart Items:</div>
                  <div>
                    {cartItems.map((item) => (
                      <div>
                        {item.count}
                        {" x "}
                        {item.name}
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
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
