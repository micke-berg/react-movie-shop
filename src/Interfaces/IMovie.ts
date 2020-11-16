export interface IProductCategory {
  categoryId: number;
  category: null;
}

export default interface IMovie {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: string;
  productCategory: Array<IProductCategory>;
}
