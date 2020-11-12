import React from "react";
import "./Cart.styles.scss";
import { ICartItems } from "../../Interfaces/ICartItems";
import { IMovie } from "../../Interfaces/IMovie";
import { count } from "console";

interface ICartProps {
  cartItems: IMovie[];
  count: number;
  removeFromCart(value: IMovie): void;
}

function Cart(props: ICartProps) {
  const { cartItems } = props;

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
          <div className='cart'>
            <div className='total'>
              <div>
                Total:{" "}
                {cartItems.reduce((a, c) => a + c.price * props.count, 0)} KR
              </div>
              <button className='button primary'>Proceed</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
