import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Order.style.scss";

import { ORDERS_URL } from "../../api/config";
import { getOrders } from "../../api/API";

import IOrderData from "../../Interfaces/IOrderData";

function Orders() {
  const [orders, setOrders] = useState([]);
  const companyId = 13932;

  async function getOrders(companyId: number) {
    await axios.get(`${ORDERS_URL}?companyId=${companyId}`).then((result) => {
      // console.log(result);
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
          {orders.map((order: IOrderData) => (
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
