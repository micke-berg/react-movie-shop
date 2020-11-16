import React, { useState } from "react";
import IOrder from "./Interfaces/IOrder";

import axios from "axios";
import { SEARCH_BASE_URL, API_URL, CATEGORIES_URL, ORDERS_URL } from "./config";

// export async function getCategories() {
//   const result = await axios.get(CATEGORIES_URL);
//   console.log("get categories result", result.data);
//   // setCategoriesResult(result.data);

//   return result;
// }

export async function createOrder(order: any) {
  await axios.post(`${ORDERS_URL}${order}`).then((result: any) => {
    localStorage.clear();
  });
}

export async function checkOut(params: any) {
  const result = await axios.post(`${ORDERS_URL},${params}`);
  console.log("check out result", result.data);

  localStorage.clear();
}

export async function getOrders(companyId: number) {
  const result = await axios
    .get(`${ORDERS_URL}/${companyId}`)
    .then((result: any) => {});

  console.log("get orders result", result);
  // setOrders(result.data);
  return result;
}

export async function deleteOrder(id: number) {
  const result = await axios.delete(`${ORDERS_URL}/${id}`);
  console.log("delete orders result", result);
  const filteredOrders = result.data.filter((item: any) => item.id !== id);
  // setOrders(filteredOrders);
  return filteredOrders;
}
