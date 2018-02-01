import React from 'react';

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
          {props.state.errors && <ul>{props.state.errors.map(error => <li>{error}</li>)}</ul>}
          <form onSubmit={props.onSubmit}>
            <div className="form-group">
              <input
                type="name"
                className="form-control"
                name="userName"
                placeholder="Username"
                value={props.state.userName}
                onChange={props.onChange}
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
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary recipeButton"
            >Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

);

export default RegisterForm;
