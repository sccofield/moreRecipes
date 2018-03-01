import React from 'react';
import toastr from 'toastr';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/configStore';

import AppRouter from './routers/AppRouter';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-bottom-left',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut'
};

const Jsx = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Jsx />, document.getElementById('app'));
