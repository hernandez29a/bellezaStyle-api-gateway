import { IProduct } from './product.interface';

export interface ICategory {
  _id?: string;
  title: string;
  status: boolean;
  product: IProduct[];
}
