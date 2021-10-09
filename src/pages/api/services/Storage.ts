import { adminClient, getTimestamp } from '../../../../firebase_admin';
// import * as storageAdmin from 'firebase-admin';
// import storageAdminCredentials from '../../../../firebase_admin';
// 
// function normalizeStorageCredentials(credentials) {
//   return {
//     ...credentials,
//     private_key: credentials.private_key.replace(/\\n/g, '\n')
//   }
// }
// 
// function getStorageAdminClient() {
//   return !storageAdmin.apps.length
//     ? storageAdmin.initializeApp({
//       credential: storageAdmin.credential.cert(normalizeStorageCredentials(storageAdminCredentials))
//     })
//     : storageAdmin.app();
// }
// 
// function getTimestamp() {
//   return storageAdmin.firestore.FieldValue.serverTimestamp();
// }

export interface IStoredOrder {
  id: string;
  email: string;
  amount: number;
  amountShipping: number;
  images: string;
}

export interface IStorage {
  putOrder: (order: IStoredOrder) => Promise<object>;
}

export class Storage implements IStorage {
  private adminClient;

  constructor() {
    this.adminClient = adminClient;
  }

  putOrder(order: IStoredOrder) {
    return this.adminClient
      .firestore()
      .collection('users')
      .doc(order.email)
      .collection('orders')
      .doc(order.id)
      .set({
        amount: order.amount / 100,
        amount_shipping: order.amountShipping / 100,
        images: JSON.parse(order.images),
        timestamp: getTimestamp()
      }); 
  }
}