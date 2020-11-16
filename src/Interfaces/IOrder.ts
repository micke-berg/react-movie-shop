import ICartItem from "./ICartItem";

export default interface IOrder {
  name: string;
  email: string;
  address: string;
  total: number;
  order: number;
  cartItems: [
    {
      id: string;
      title: string;
      price: number;
      count: number;
    }
  ];
}
