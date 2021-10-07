import 'tailwindcss/tailwind.css';
import { Provider } from 'react-redux';
import '../styles.css';
import { AuthProvider } from '../auth';
import { store } from '../app/store';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;
