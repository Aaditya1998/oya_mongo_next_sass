import "../styles/globals.scss";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
let persistor = persistStore(store);
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Oya</title>
        <meta
          name="description"
          content="Oya: A ecommerse store for Electronics related to Battories, Electric Vehicals and Chargers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate Loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
export default MyApp;
