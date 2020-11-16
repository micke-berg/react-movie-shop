import IMovie from "./IMovie";

export interface ICart {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: string;
  productCategory: [
    {
      categoryId: string;
      category: null;
    }
  ];
}

export interface ICartItem {
  cartItems: IMovie;
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
