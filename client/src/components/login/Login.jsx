import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { bindActionCreators } from 'redux';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import LoginForm from './LoginForm';
import loginUserActionCreator from '../../actions/login';

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
      errors: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }
  /**
 *
 *@returns {obj} obj
 * @memberof Login
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
      toastr.success('You are logged in');
      this.props.history.goBack();
      return;
    }

    if (nextProps.errorMessage) {
      this.setState({
        errors: nextProps.errorMessage
      });
    }
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
 *
 * @returns {obj} obj
 * @param {any} event
 * @memberof Login
 */
  onFocus(event) {
    this.setState({ errors: null });
  }

  /**
 * @description handles form submit events
 * @returns {null} null
 * @param {any} event
 * @memberof Login
 */
  onSubmit(event) {
    event.preventDefault();
    this.props.loginUserActionCreator(this.state);
  }


  /**
   * @description react render method
   * @returns {component} react component
   * @memberof Login
   */
  render() {
    return (

      <div className="main">
        <PageHeader user={this.props.isAuthenticated} />
        <div className="regForm">
          {this.props.loading && <div className="loader" />}
          <LoginForm
            onChange={this.onChange}
            state={this.state}
            onSubmit={this.onSubmit}
            onFocus={this.onFocus}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  errorMessage: state.user.errorMessage,
  loading: state.user.loading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUserActionCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);

