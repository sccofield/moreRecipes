import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configStore';

import AppRouter from './routers/AppRouter';


const Jsx = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Jsx />, document.getElementById('app'));
