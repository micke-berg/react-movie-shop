export default interface IOrderData {
  id: number;
  companyId: number;
  created: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: [];
}
