import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './routers/AppRouter';


const Jsx = () => (
  <Provider>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Jsx />, document.getElementById('app'));
