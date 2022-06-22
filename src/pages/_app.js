import '../styles/globals.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer
});

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};
