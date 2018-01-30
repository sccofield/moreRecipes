import React from 'react';

import PageHeader from './PageHeader';
import Footer from './Footer';

/**
 *
 * @class Register
 * @extends {React.Component}
 */
class Register extends React.Component {
  /**
   * Creates an instance of Register.
   * @param {any} props
   * @memberof Register
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  /**
   * @description react render method
   * @returns {component} react component
   * @memberof Register
   */
  render() {
    return (
      <div>
        <PageHeader />
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

                <form>
                  <div className="form-group">
                    <input type="name" className="form-control" placeholder="Name" />
                  </div>
                  <div className="form-group">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                  </div>

                  <div className="form-group">
                    <input type="password" className="form-control" placeholder="Re-enter Password" />
                  </div>
                  <button type="submit" className="btn btn-primary recipeButton">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>


        <Footer />

      </div>

    );
  }
}


export default Register;

