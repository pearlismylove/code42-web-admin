import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
