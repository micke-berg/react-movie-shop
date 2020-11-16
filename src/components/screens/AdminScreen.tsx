import React from "react";
import { deleteOrder } from "../../API";

import IOrder from "../../Interfaces/IOrder";
import Orders from "../Orders/Orders";

const AdminScreen: React.FC = () => {
  return (
    <div>
      <h1>Orders</h1>
      <Orders />
    </div>
  );
};

export default AdminScreen;