
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient, IHttpClient } from './HttpClient';
import { IProduct } from './Store';

export const DEFAULT_CURRENCY = 'EUR';
export type ICurrency = 'EUR';

function loadPaymentProcessor() {
  return loadStripe(process.env.AMAZON_APP_STRIPE_PUBLIC_KEY);
}

export interface ICheckoutSession {
  id: string;
}

export interface IPayments {
  getCurrency: () => Promise<ICurrency>;
  doCheckout: ({ products, currency, email }: { products: IProduct[], currency: ICurrency, email: string }) => Promise<void>; 
}

export class Payments implements IPayments {
  private paymentProcessor;
  private httpClient: IHttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  getCurrency() {
    return Promise.resolve(DEFAULT_CURRENCY) as Promise<ICurrency>;
  }

  async doCheckout({ products, currency, email }: { products: IProduct[], currency: ICurrency, email: string }) {
    try {
      const checkoutSession = await this.httpClient.post({
        path: '/api/checkout', data: { products, currency, email }
      }) as ICheckoutSession;

      this.paymentProcessor = await loadPaymentProcessor();
      const res = await this.paymentProcessor.redirectToCheckout({ sessionId: checkoutSession.id });    

      if (res.error) throw res.error;
    } catch (err) {
      console.error('doCheckout', err); 
    }
  }
}