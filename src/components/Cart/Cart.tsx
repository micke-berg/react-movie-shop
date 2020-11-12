import React, { useState } from "react";

import "./Cart.styles.scss";
import { ICartItems } from "../../Interfaces/ICartItems";
import { IMovie } from "../../Interfaces/IMovie";
import { IOrder } from "../../Interfaces/IOrder";
import { count } from "console";

interface ICartProps {
  cartItems: IMovie[];
  count: number;
  // setCartItems(value: IMovie): void;
  createOrder(value: IOrder): void;
  removeFromCart(value: IMovie): void;
}

function Cart(props: ICartProps) {
  const { cartItems } = props;

  const [showCheckOut, setShowCheckOut] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
  });

  interface HandleInputProps {
    name: string;
    email: string;
    address: string;
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const createOrder = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();

    const order = {
      name: formState.name,
      email: formState.email,
      address: formState.address,
      cartItems: props.cartItems,
    };
    props.createOrder(order);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className='cart cart-header'>Cart is empty</div>
      ) : (
        <div className='cart cart-header'>
          You have {cartItems.length} in the cart
        </div>
      )}
      <div>
        <div className='cart'>
          <ul className='cart-items'>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div>
                  <img src={item.imageUrl} alt='' />
                </div>
                <div>
                  <div>{item.name}</div>
                  <div className='right'>
                    {item.price} KR x{props.count}{" "}
                    <button onClick={() => props.removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div>
            <div className='cart'>
              <div className='total'>
                <div>
                  Total:{" "}
                  {cartItems.reduce((a, c) => a + c.price * props.count, 0)} KR
                </div>
                <button
                  onClick={() => setShowCheckOut(true)}
                  className='button primary'>
                  Proceed
                </button>
              </div>
            </div>
            {showCheckOut && (
              <div className='cart'>
                <form onSubmit={createOrder}>
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
