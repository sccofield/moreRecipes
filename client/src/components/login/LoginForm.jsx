import React from 'react';

const LoginForm = props => (
  <div>
    <div className="row justify-content-md-center">
      <div className="col-md-8 col-lg-6 col-12">
        <div className="registeration text-center">
          <h2>Login</h2>

          <div className="form-header">
            <p>Already have an account?
              <span>Sign in</span>
            </p>
          </div>
          {props.state.errors && <p className="errorMessage">{props.state.errors}</p>}
          <form onSubmit={props.onSubmit}>
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
                onFocus={props.onFocus}
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
                onFocus={props.onFocus}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary recipeButton"
            >Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

);

export default LoginForm;
