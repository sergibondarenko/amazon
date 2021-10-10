import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface IStorageOrder {
  id: string;
  amount: number;
  amountShipping: number;
  images: string[],
  timestamp: number,
  items?: any;
}

export interface IStorage {
  getOrders: ({ email }: { email: string }) => Promise<IStorageOrder[]>;
}

export class Storage implements IStorage {
  async getOrders({ email }: { email: string }): Promise<IStorageOrder[]> {
    try {
      let q = query(collection(db, `users/${email}/orders`), orderBy('timestamp', 'desc'));
      let qSnapshot = await getDocs(q);

      const orders = [];

      qSnapshot.forEach((doc) => {
        const data = doc.data();
        orders.push({
          id: doc.id,
          amount: data.amount,
          amountShipping: data.amount_shipping,
          images: data.images,
          timestamp: data.timestamp.seconds * 1000, // ms
        });
      });

      return orders;
    } catch (err) {
      console.error('Fail to get orders.', err);
      throw err;
    }
  }
}