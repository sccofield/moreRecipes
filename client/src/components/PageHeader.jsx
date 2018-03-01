import React from 'react';
import { connect } from 'react-redux';
import logoutUserActionCreator from '../actions/logout';
import Navbar from './Navbar';

const PageHeader = () => (
  <header style={{ backgroundColor: 'black', backgroundImage: 'none' }}>
    <div className="container">
      <Navbar />
    </div>

  </header>

);

const mapDispatchToProps = dispatch => ({

  logoutUser: () => {
    dispatch(logoutUserActionCreator());
  }
});

export default connect(mapDispatchToProps)(PageHeader);
