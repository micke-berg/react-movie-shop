import React from "react";

import { getOrders } from "../../API";

interface Props {}
function Orders(props: any) {
  const { orders } = props;

  return !orders ? (
    <div>Orders</div>
  ) : (
    <div className='orders'>
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ITEMS</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created}</td>
              <td>{order.totalPrice}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>
                {order.cartItems.map((item: any) => (
                  <div key={item.movie.id}>
                    {item.count} {" x "} {item.totalPrice}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
