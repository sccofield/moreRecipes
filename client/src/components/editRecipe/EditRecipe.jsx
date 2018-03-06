import React from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import EditRecipeForm from './EditRecipeForm';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import FormValidator from './FormValidator';
import getEditRecipeActionCreator,
{ editRecipeActionCreator } from '../../actions/editRecipe';

/**
 *
 *
 * @class EditRecipe
 * @extends {React.Component}
 */
class EditRecipe extends React.Component {
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
      recipe: {},
      errors: []
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   *
   * @returns { obj} obj
   * @memberof RecipeDetail
   */
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getEditRecipeActionCreator(this.props.match.params.id);
  }

  /**
 *
 * @returns {obj} obj
 * @param {any} nextProps
 * @memberof PostRecipe
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.editedRecipe) {
      this.props.history.push(`/recipes/${nextProps.editedRecipe.id}`);
      toastr.success('Recipe edited succesfully');
    }
    if (nextProps.recipe) {
      this.setState({
        title: nextProps.recipe.title,
        description: nextProps.recipe.description,
        ingredients: nextProps.recipe.ingredients,
        imageUrl: nextProps.recipe.imageUrl,
        recipe: nextProps.recipe
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
   * @description handles form submit events
   * @returns {null} null
   * @param {any} event
   * @memberof Login
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      const imageUpload = new FormData();

      if (this.state.newImage) {
        imageUpload.append('file', this.state.newImage);
        imageUpload.append('upload_preset', 'ftpwkq8d');
        imageUpload.append('api_key', '897164162315899');
        axios.post(
          'https://api.cloudinary.com/v1_1/sccofield/image/upload',
          imageUpload
        )
          .then((res) => {
            const postData = this.state;
            postData.imageUrl = res.data.secure_url;
            this.props.editRecipeActionCreator(
              this.props.match.params.id,
              postData
            );
          });
      } else {
        this.props.editRecipeActionCreator(
          this.props.match.params.id,
          this.state
        );
      }
    }
  }

  /**
 *
 * @returns {obj} object
 * @param {any} files
 * @memberof PostRecipe
 */
  handleDrop(files) {
    this.setState({
      newImage: files[0],
      imageUrl: files[0].preview
    });
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
 * @returns {obj} obj
 * @memberof EditRecipe
 */
  render() {
    return (
      <div className="main">
        {
          this.state.recipe &&
          <div>
            <PageHeader />
            <div className="container">
              <div className="row content">
                <div className="col-lg-10">
                  <EditRecipeForm
                    state={this.state}
                    onChange={this.onChange}
                    handleDrop={this.handleDrop}
                    onSubmit={this.onSubmit}
                  />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        }
      </div>


    );
  }
}

const mapStateToProps = state => ({
  recipe: state.recipe.editRecipe,
  editedRecipe: state.recipe.editedRecipe
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getEditRecipeActionCreator,
    editRecipeActionCreator
  }, dispatch);


EditRecipe.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.string,
    imageUrl: PropTypes.string
  }),
  editRecipeActionCreator: PropTypes.func.isRequired,
  getEditRecipeActionCreator: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: ({
      id: PropTypes.string,
    })
  }).isRequired,
  editedRecipe: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
};

EditRecipe.defaultProps = {
  editedRecipe: null,
  recipe: null
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
