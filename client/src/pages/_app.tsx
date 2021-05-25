import '../styles/globals.scss';

import { Header } from "../components/partials/Header";
import { Footer } from '../components/partials/Footer';
import { UserProvider } from './../contexts/UserContext';
import { UserRegProvider } from '../contexts/UserRegContext';
import { SearchDataProvider } from '../contexts/search';

function MyApp({ Component, pageProps }) {
  return (
      <UserProvider>
        <UserRegProvider>
            <SearchDataProvider>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </SearchDataProvider>
        </UserRegProvider>
      </UserProvider>
  );
}

export default MyApp
