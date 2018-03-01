import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import RegisterForm from './RegisterForm';
import registerUserActionCreator from '../../actions/register';

import FormValidator from './formValidator';

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
      userName: '',
      password: '',
      cPassword: '',
      errors: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 *
 *  @returns {obj} obj
 * @memberof Register
 */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      toastr.warning('You are logged in already.');
      this.props.history.push('/dashboard');
    }
  }

  /**
 *
 *
 * @param {any} nextProps
 * @returns {obj} obj
 * @memberof Login
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      toastr.success('Registeration sucess. you are logged in');
      this.props.history.goBack();
    }
  }


  /**
 * @description handles form change events
 * @returns {null} null
 * @param {any} event
 * @memberof Register
 */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
 * @description handles form submit events
 * @returns {null} null
 * @param {any} event
 * @memberof Register
 */
  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      this.props.registerUserActionCreator(this.state).then(() => {
      });
    }
  }

  /**
 *
 *
 * @returns {boolean} boolean
 * @memberof Register
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
   * @memberof Register
   */
  render() {
    return (
      <div>
        <PageHeader user={this.props.isAuthenticated} />
        <RegisterForm
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
  bindActionCreators({ registerUserActionCreator }, dispatch);

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  registerUserActionCreator: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  history: PropTypes.shape({
    goBack: PropTypes.func,
    push: PropTypes.func
  }).isRequired
};

Register.defaultProps = {
  errorMessage: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

