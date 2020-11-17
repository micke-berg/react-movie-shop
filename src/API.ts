import React, { useState } from "react";
import IOrder from "./Interfaces/IOrder";

import axios from "axios";
import { SEARCH_BASE_URL, API_URL, CATEGORIES_URL, ORDERS_URL } from "./config";

export async function createOrder(params: any) {
  await axios.post(ORDERS_URL, params).then((result) => {
    console.log(result);
    console.log(result.data);
  });
}

export async function getOrders(companyId: number) {
  const result = await axios
    .get(`${ORDERS_URL}?companyId=${companyId}`)
    .then((result) => {
      console.log(result);
      console.log("get orders result", result.data);
    });
}

export async function deleteOrder(id: number) {
  await axios.delete(`${ORDERS_URL}/${id}`).then((result) => {
    console.log("delete orders result", result);
  });
}
