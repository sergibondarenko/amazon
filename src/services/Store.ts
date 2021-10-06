
export interface IProductRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
}

export class Store {
  getProducts() {
    return fetch('https://fakestoreapi.com/products')
      .then((res) => res.json());
  }
}