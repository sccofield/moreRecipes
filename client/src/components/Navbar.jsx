import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logoutUserActionCreator from '../actions/logout';

/**
 *
 *
 * @class Navbar
 * @extends {React.Component}
 */
class Navbar extends React.Component {
/**
 * Creates an instance of Navbar.
 * @param {any} props
 * @memberof Navbar
 */
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
  }

  /**
   *
   *
   * @returns {null}null
   * @memberof Navbar
   */
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-lg justify-content-between py-3 sticky">
        <div className="brand">

          <a href="/" className="navbar-brand mr-0">More Recipes</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
          <span className="navbar-toggler-icon" />
        </button>


        <div className="navbar-collapse collapse dual-nav">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/recipes">Explore Recipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/postRecipe">Post Recipe</Link>
            </li>
            { this.props.isAuthenticated &&

              <span>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">profile</Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={this.props.logout}

                  >Logout
                  </Link>
                </li>
              </span>
            }

            {
              !this.props.isAuthenticated &&

              <span>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </span>

            }

          </ul>
        </div>
      </nav>


    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logoutUserActionCreator());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
