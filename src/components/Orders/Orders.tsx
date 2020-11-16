import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDERS_URL } from "../../config";

import "./Order.style.scss";
import { getOrders } from "../../API";

interface Props {}
function Orders(props: any) {
  const [orders, setOrders] = useState([]);
  const companyId = 13932;

  async function getOrders(companyId: number) {
    await axios
      .get(`${ORDERS_URL}?companyId=${companyId}`)
      .then((result: any) => {
        console.log(result);
        console.log("get orders result", result.data);
        setOrders(result.data);
      });
  }

  useEffect(() => {
    getOrders(companyId);
  }, []);

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
            <th>EMAIL</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.created}</td>
              <td>{order.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
