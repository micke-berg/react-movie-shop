import { ICartItem } from "./ICartItem";

export interface IOrder {
  name: string;
  email: string;
  address: string;
  total: number;
}
