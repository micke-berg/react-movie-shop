export default interface IPostOrder {
  email: string;
  name: string;
  address: string;
  total: number;
  cartItems: [
    {
      id: string;
      title: string;
      price: number;
      count: number;
    }
  ];
}
