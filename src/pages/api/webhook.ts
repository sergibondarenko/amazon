import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro';
import * as firebaseAdmin from 'firebase-admin';
const stripe = require('stripe')(process.env.AMAZON_APP_STRIPE_SECRET_KEY);
import firebaseServiceAccount from '../../../firebase_admin_permissions';

firebaseServiceAccount.private_key = firebaseServiceAccount.private_key.replace(/\\n/g, '\n');

console.log('firebaseServiceAccount', firebaseServiceAccount);

function getFirebaseAdminApp() {
  return !firebaseAdmin.apps.length
    ? firebaseAdmin.initializeApp({ credential: firebaseAdmin.credential.cert(firebaseServiceAccount) })
    : firebaseAdmin.app();
}

async function fulfillOrder(app, session) {
  return app.firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()  
    })
    .then(() => {
      console.log('success, order was added to the DB', session.id);
    }); 
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
};

export default async function webhookRoute(req: NextApiRequest, res: NextApiResponse) {
  const app = getFirebaseAdminApp();
  const endpointSecret = process.env.AMAZON_APP_STRIPE_SIGNING_SECRET;

  if (req.method === 'POST') {
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const sig = req.headers['stripe-signature'];

    let event;
    // Verify that the event was posted by stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.error('The webhook event cannot be verified.', err);
      return res.status(400).send('The webhook event cannot be verified.');
    }

    // Handle the completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;      

      // Fulfill the order
      return fulfillOrder(app, session).then(() => {
        return res.status(200);
      }).catch((err) => {
        console.error('Webhook error', err);
        return res.status(400).send('Webhook error.')
      });
    }
  }
}