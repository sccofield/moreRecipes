import React from 'react';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({
  component: Component, path, isAuthenticated, ...rest
}) => {
  if (isAuthenticated) {
    return <Route component={Component} path={path} {...rest} />;
  }

  toastr.warning('You are not authenticated to view that!');
  return <Redirect to="/login" />;
};


const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


export default connect(mapStateToProps, null)(AuthRoute);
