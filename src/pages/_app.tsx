import 'tailwindcss/tailwind.css';
import '../styles.css';
import { AuthProvider } from '../auth';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
