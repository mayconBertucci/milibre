import '../styles/globals.scss';

import { Header } from "../components/partials/Header";
import { Footer } from '../components/partials/Footer';
import { UserProvider } from './../contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
      <UserProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
  );
}

export default MyApp
