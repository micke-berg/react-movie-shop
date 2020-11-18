import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";

import { ORDERS_URL } from "../api/config";

import Orders from "../components/Orders/Orders";

const AdminScreen: React.FC = () => {
  const [orderId, setOrderId] = useState(0);

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("getValue called", e.target.value);
    setOrderId(e.target.value);
  };

  async function deleteOrder(orderId: number) {
    await axios.delete(`${ORDERS_URL}/${orderId}`).then((result: any) => {
      console.log(result);
      console.log("order delete succeeded", result.data);
      setOrderId(0);
    });
  }

  const runDeleteOrder = () => {
    deleteOrder(orderId);
  };

  console.log("order id", orderId);
  return (
    <div>
      <header className='admin-header'>
        <Link to='/'>Home</Link>
        <div>
          <input
            placeholder=' Enter order id...'
            required
            onChange={handleChange}
          />
          <button onClick={runDeleteOrder} className='button primary'>
            Delete
          </button>
        </div>
      </header>
      <Orders runDeleteOrder={runDeleteOrder} />
    </div>
  );
};

export default AdminScreen;
