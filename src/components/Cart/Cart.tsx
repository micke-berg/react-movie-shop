import React, { useState } from "react";
import { Fade } from "react-awesome-reveal";

import "./Cart.styles.scss";
import { ICartItem } from "../../Interfaces/ICartItem";
import { IMovie } from "../../Interfaces/IMovie";
import { IOrder } from "../../Interfaces/IOrder";

interface CartProps {
  cartItems: ICartItem[];

  // createOrder(value: IOrder): void;
  removeFromCart(cartItem: ICartItem): void;
}

const Cart: React.FC<CartProps> = ({ cartItems, removeFromCart }) => {
  // const { cartItems } = props;

  const [showCheckOut, setShowCheckOut] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const createOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const order = {
      name: formState.name,
      email: formState.email,
      address: formState.address,
      // cartItems: cartItems,
    };
    // createOrder(order);
  };

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
                  Total:{" "}
                  {cartItems.reduce(
                    (a, c) => a + c.movie.price * cartItems.length,
                    0
                  )}{" "}
                  KR
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
              </Fade>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
