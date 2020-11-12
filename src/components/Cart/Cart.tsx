import React from "react";
import { ICartItem } from "../../Interfaces/ICart";

function Cart(props: ICartItem | any) {
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
    </div>
  );
}

export default Cart;
