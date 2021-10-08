import { HttpClient, IHttpClient } from './HttpClient';

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

export interface IStore {
  getProducts: () => Promise<IProduct[]>;
}

export class Store implements IStore {
  private httpClient: IHttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  getProducts() {
    return this.httpClient.get({ path: 'https://fakestoreapi.com/products' }) as Promise<IProduct[]>;
  }
}