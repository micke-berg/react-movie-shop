interface ProductCategory {
  categoryId: number;
  category: null;
}

export interface IMovie {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  year: number;
  added: string;
  productCategory: Array<ProductCategory>;
}
