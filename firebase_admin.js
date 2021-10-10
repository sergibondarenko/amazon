import * as storageAdmin from 'firebase-admin';

const firebaseConfig = {
  'type': 'service_account',
  'project_id': process.env.AMAZON_APP_FIREBASE_ADMIN_PROJECT_ID,
  'private_key_id': process.env.AMAZON_APP_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  'private_key': process.env.AMAZON_APP_FIREBASE_ADMIN_PRIVATE_KEY,
  'client_email': process.env.AMAZON_APP_FIREBASE_ADMIN_CLIENT_EMAIL,
  'client_id': process.env.AMAZON_APP_FIREBASE_ADMIN_CLIENT_ID,
  'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
  'token_uri': 'https://oauth2.googleapis.com/token',
  'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
  'client_x509_cert_url': process.env.AMAZON_APP_FIREBASE_ADMIN_CLIENT_X509_CERT_URL 
}

function normalizeStorageCredentials(credentials) {
  return {
    ...credentials,
    private_key: credentials.private_key.replace(/\\n/g, '\n')
  }
}

export const adminClient = !storageAdmin.apps.length
  ? storageAdmin.initializeApp({
    credential: storageAdmin.credential.cert(normalizeStorageCredentials(firebaseConfig))
  })
  : storageAdmin.app();

export function getTimestamp() {
  return storageAdmin.firestore.FieldValue.serverTimestamp();
}
