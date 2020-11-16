import React from "react";
import { deleteOrder } from "../../API";

import IOrder from "../../Interfaces/IOrder";

interface Props {
  order: IOrder;
  deleteOrder(IOrder: IOrder): void;
  checkOut(IOrder: IOrder): void;
}
const AdminScreen: React.FC<Props> = ({ deleteOrder, checkOut, order }) => {
  deleteOrder(order);
  checkOut(order);

  return <div>AdminScreen</div>;
};

export default AdminScreen;
