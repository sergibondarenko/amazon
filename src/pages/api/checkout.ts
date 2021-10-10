import type { NextApiRequest, NextApiResponse } from 'next'
import { Payments } from './services';

export default async function checkoutRoute(req: NextApiRequest, res: NextApiResponse) {
  const { products, currency, email } = req.body;
  const paymentsService = new Payments();

  try {
    const session = await paymentsService.doCheckout({ products, currency, email });
    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('checkout', err);
    return res.status(500);
  }
}