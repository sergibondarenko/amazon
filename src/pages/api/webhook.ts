import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro';
import { Payments, Storage } from './services';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

export default async function webhookRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(400).send('Only the POST request is allowed.');
  }

  const payload = (await buffer(req)).toString();
  const paymentService = new Payments();
  const paymentSession = paymentService.getSessionForWebhook({ reqHeaders: req.headers, payload });

  if (!paymentSession) {
    return res.status(400).send('The webhook event cannot be verified.');
  }

  try {
    const storageService = new Storage();
    await storageService.putOrder({
      id: paymentSession.id,
      email: paymentSession.metadata.email,
      amount: paymentSession.amount_total,
      amountShipping: paymentSession.total_details.amount_shipping,
      images: paymentSession.metadata.images
    });

    return res.status(200);
  } catch (err) {
    console.error('Fail to put order via the webhook.', err);
    return res.status(400).send('Fail to put order via the webhook.');
  }
}
