const paymentProcessor = require('stripe')(process.env.AMAZON_APP_STRIPE_SECRET_KEY);
import { IProduct } from './Store'; 
import { ICurrency } from '../../../services/Payments';

export interface ICheckoutProduct {
  description: string;
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      images: string[];
    }
  }
}

function productsToCheckoutProducts(products: IProduct[], currency: ICurrency) {
  return products.map((p) => {
    return {
      description: p.description,
      quantity: 1,
      price_data: {
        currency,
        unit_amount: p.price * 100,
        product_data: {
          name: p.title,
          images: [p.image],
        }
      }
    };
  });
}

export interface IPayments {
  doCheckout: ({ products, currency, email }: { products: IProduct[], currency: ICurrency, email: string }) => Promise<object>;
}

export class Payments {
  private paymentProcessor;

  constructor() {
    this.paymentProcessor = paymentProcessor;
  }

  doCheckout({ products, currency, email }: { products: IProduct[], currency: ICurrency, email: string }) {
    const _products: ICheckoutProduct[] = productsToCheckoutProducts(products, currency);

    return this.paymentProcessor.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_rates: ['shr_1JiFCbKDkxRHfusriQfSNa97'],
      shipping_address_collection: {
        allowed_countries: [
          'CA', 'US', 'GB', 'IE', 'PT', 'ES', 'FR', 'DE',
          'IT', 'CH', 'NO', 'SE', 'PL', 'GR', 'DK', 'NL', 
          'BE', 'MC', 'BA', 'AT', 'CZ', 'FI'
        ]
      },
      line_items: _products,
      mode: 'payment',
      success_url: process.env.AMAZON_APP_HOST + '/success',
      cancel_url: process.env.AMAZON_APP_HOST + '/checkout',
      metadata: { email, images: JSON.stringify(products.map((p) => p.image)) }
    });
  }
}