import '../styles/globals.scss';

import { Header } from "../components/partials/Header";
import { Footer } from '../components/partials/Footer';
import { Head } from 'next/document';

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </>
  );
}

export default MyApp
