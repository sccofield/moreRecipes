import React from 'react';
import { connect } from 'react-redux';
import logoutUserActionCreator from '../actions/logout';
import Navbar from './Navbar';

export const Header = () => (
  <header style={{ backgroundColor: 'black', backgroundImage: 'none' }}>
    <div className="container">
      <Navbar />
    </div>

  </header>

);

export const mapDispatchToProps = dispatch => ({

  logoutUser: () => {
    dispatch(logoutUserActionCreator());
  }
});

export default connect(mapDispatchToProps)(Header);
