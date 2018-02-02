import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import LoginForm from './LoginForm';
import loginUserActionCreator from '../../actions/login';

import FormValidator from './formValidator';

/**
 *
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
  /**
   * Creates an instance of Login
   * @param {any} props
   * @memberof Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 * @description handles form change events
 * @returns {null} null
 * @param {any} event
 * @memberof Login
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handles form submit events
 * @returns {null} null
 * @param {any} event
 * @memberof Login
 */
  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.props.loginUserActionCreator(this.state).then(() => { this.props.history.goBack() ;});
    }
  }

  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof Login
 */
  validate() {
    const { errors } = FormValidator(this.state);
    if (errors.length > 0) {
      this.setState({ errors });
      return false;
    }
    this.setState({ errors: [] });
    return true;
  }


  /**
   * @description react render method
   * @returns {component} react component
   * @memberof Login
   */
  render() {
    return (
      <div>
        <PageHeader user={this.props.isAuthenticated} />
        <LoginForm
          onChange={this.onChange}
          state={this.state}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
          errorMessage={this.props.errorMessage}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  errorMessage: state.user.errorMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUserActionCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

