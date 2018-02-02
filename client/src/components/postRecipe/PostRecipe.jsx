import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import PostRecipeForm from './PostRecipeForm';
import FormValidator from './FormValidator';
import postRecipeActionCreator from '../../actions/postRecipe';

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
      image: {}
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleDrop(files) {
    this.setState({ image: files[0] });
  }

  /**
 * @description handles form change events
 * @returns {null} null
 * @param {any} event
 * @memberof Login
 */
  onChange(event) {
    console.log(event.target.files);
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
    if (this.validate) {
      const imageUpload = new FormData();
      imageUpload.append('file', this.state.image);
      imageUpload.append('upload_preset', 'ftpwkq8d');
      imageUpload.append('api_key', '897164162315899');
      axios.post('https://api.cloudinary.com/v1_1/sccofield/image/upload', imageUpload)
        .then((res) => {
          const postData = this.state;
          postData.imageUrl = res.data.secure_url;
          this.props.postRecipeActionCreator(postData);
        });

      //
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
   *
   *
   * @returns {null} null
   * @memberof PostRecipe
   */
  render() {
    return (
      <div>
        <PageHeader />
        <PostRecipeForm
          className="mb-4"
          onChange={this.onChange}
          state={this.state}
          onSubmit={this.onSubmit}
          errors={this.state.errors}
          errorMessage={this.props.errorMessage}
          handleDrop={this.handleDrop}
          imagePreview={this.state.image.preview}
        />
        <Footer />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch =>
  bindActionCreators({ postRecipeActionCreator }, dispatch);

export default connect(null, mapDispatchToProps)(PostRecipe);
