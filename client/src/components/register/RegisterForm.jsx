import React from 'react';
import PropTypes from 'prop-types';

const RegisterForm = props => (
  <div className="main">
    <div className="row justify-content-md-center">
      <div className="col-md-8 col-lg-6 col-12">
        <div className="registeration text-center">
          <h2>Register</h2>

          <div className="form-header">
            <p>Already have an account?
              <span>Sign in</span>
            </p>
          </div>
          {
            props.errorMessage &&
            <p className="errorMessage">{props.errorMessage}</p>
          }
          {
            props.state.errors &&
            <ul className="errorMessage">{
              props.state.errors.map(error => <li key={Math.floor(Math.random() * 1000)} >{error}</li>)
            }
            </ul>}
          <form onSubmit={props.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="userName"
                placeholder="Name"
                value={props.state.userName}
                onChange={props.onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email"
                value={props.state.email}
                onChange={props.onChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={props.state.password}
                onChange={props.onChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="cPassword"
                className="form-control"
                placeholder="Re-enter Password"
                value={props.state.cPassword}
                onChange={props.onChange}
                required
              />
            </div>
            <button
              type="submit"
              id="registerSubmit"
              className="btn btn-primary recipeButton"
            >Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

RegisterForm.propTypes = {
  errorMessage: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  state: PropTypes.shape({
    cPassword: PropTypes.string,
    password: PropTypes.string,
    userName: PropTypes.string,
    errors: PropTypes.array,
    email: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};
RegisterForm.defaultProps = {
  errorMessage: null,
  errors: null,
  onChange: null,
  onSubmit: null
};
export default RegisterForm;
