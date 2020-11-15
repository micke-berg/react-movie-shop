import React, { useState } from "react";
import { IOrder } from "./Interfaces/IOrder";

import axios from "axios";
import { SEARCH_BASE_URL, API_URL, CATEGORIES_URL, ORDERS_URL } from "./config";

const [orders, setOrders] = useState<IOrder[]>([]);

export const clearOrder = () => {};

async function deleteOrder(id: number) {
  const result = await axios.delete(`${ORDERS_URL}/${id}`);
  console.log("delete orders result", result);
  // const filteredOrders = orders.filter((item) => item.id !== id);
  // setOrders(filteredOrders);
}

export async function createOrder(data: any) {
  const result = await axios.post(`${ORDERS_URL},${data}`);
  console.log("create order result", result.data);
  // setOrders(result.data);
  // localStorage.clear("cartItems");
  return result;
}

// -----------------
async function getOrders(companyId: number) {
  const result = await axios.get(`${ORDERS_URL}/${companyId}`);

  console.log("get orders result", result.data);
  setOrders(result.data);
  return result;
}

let params = {
  id: 0,
  companyId: 5490,
  created: new Date(),
  // createdBy: customerEmail,
  paymentMethod: "mastercard",
  // totalPrice: totalPrice,

  // props.message.reduce(
  //   (a, c) => a + c.amount * c.product.price,
  //   0
  // )

  status: 0,
  // orderRows: orderMovies,
};

async function checkOut(params: any) {
  const result = await axios.post(`${ORDERS_URL},${params}`);
  console.log(result.data);

  // localStorage.clear("cartItems");
  clearOrder();
}
