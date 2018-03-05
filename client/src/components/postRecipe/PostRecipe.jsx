import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import axios from 'axios';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import PostRecipeForm from './PostRecipeForm';
import FormValidator from './FormValidator';
import postRecipeActionCreator,
{ clearNewRecipe } from '../../actions/postRecipe';

/**
 *
 *
 * @class PostRecipe
 * @extends {React.Component}
 */
class PostRecipe extends React.Component {
  /**
   * Creates an instance of PostRecipe.
   * @memberof PostRecipe
   */
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      ingredients: '',
      errors: [],
      image: null
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   *
   * @returns {obj} obj
   * @memberof PostRecipe
   */
  componentWillMount() {
    this.props.clearNewRecipe();
  }

  /**
 *
 * @returns {obj} obj
 * @param {any} nextProps
 * @memberof PostRecipe
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.newRecipe) {
      toastr.success('Your recipe has been added');
      this.props.history.push(`recipes/${nextProps.newRecipe.id}`);
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
   * @description handles form submit events
   * @returns {null} null
   * @param {any} event
   * @memberof Login
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const imageUpload = new FormData();

      if (this.state.image) {
        imageUpload.append('file', this.state.image);
        imageUpload.append('upload_preset', 'ftpwkq8d');
        imageUpload.append('api_key', '897164162315899');
        axios.post(
          'https://api.cloudinary.com/v1_1/sccofield/image/upload',
          imageUpload
        )
          .then((res) => {
            const postData = this.state;
            postData.imageUrl = res.data.secure_url;
            this.props.postRecipeActionCreator(postData);
          });
      } else {
        this.props.postRecipeActionCreator(this.state);
      }
      //
    }
  }

  /**
 *
 * @returns {obj} object
 * @param {any} files
 * @memberof PostRecipe
 */
  handleDrop(files) {
    this.setState({ image: files[0] });
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
   *
   *
   * @returns {null} null
   * @memberof PostRecipe
   */
  render() {
    return (
      <div className="main">
        <PageHeader />
        <div className="container">
          <div className="row content">
            <div className="col-lg-10">
              <PostRecipeForm
                className="mb-4"
                onChange={this.onChange}
                state={this.state}
                onSubmit={this.onSubmit}
                errors={this.state.errors}
                errorMessage={this.props.errorMessage}
                handleDrop={this.handleDrop}
                imagePreview={this.state.image && this.state.image.preview}
                handleEditorChange={this.handleEditorChange}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  newRecipe: state.recipe.newRecipe
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ postRecipeActionCreator, clearNewRecipe }, dispatch);

PostRecipe.propTypes = {
  clearNewRecipe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  postRecipeActionCreator: PropTypes.func.isRequired,
  newRecipe: PropTypes.shape({
    id: PropTypes.string
  }),
  errorMessage: PropTypes.arrayOf(PropTypes.string)
};

PostRecipe.defaultProps = {
  newRecipe: null,
  errorMessage: null
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRecipe);
