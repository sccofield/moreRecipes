import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logoutUserActionCreator from '../actions/logout';


const Navbar = props => (
  <nav
    className="navbar navbar-dark navbar-expand-lg
    justify-content-between py-3 sticky"
  >
    <div className="brand">

      <Link to="/" className="navbar-brand mr-0">More Recipes</Link>
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target=".dual-nav"
    >
      <span className="navbar-toggler-icon" />
    </button>


    <div className="navbar-collapse collapse dual-nav">
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/recipes">Explore Recipe</Link>
        </li>
        { props.isAuthenticated &&
          <li className="nav-item">
            <Link className="nav-link" to="/postRecipe">Post Recipe</Link>
          </li>
        }

        { props.isAuthenticated &&
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Profile</Link>
          </li>
        }

        { props.isAuthenticated &&

          <li className="nav-item">
            { /* eslint-disable jsx-a11y/anchor-is-valid */ }
            <Link
              className="nav-link"
              to="/"
              onClick={props.logout}
            >Logout
            </Link>
          </li>
        }

        {
          !props.isAuthenticated &&
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        }

        {
          !props.isAuthenticated &&
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        }

      </ul>
    </div>
  </nav>


);


const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUserActionCreator());
  }
});

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  isAuthenticated: null
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
