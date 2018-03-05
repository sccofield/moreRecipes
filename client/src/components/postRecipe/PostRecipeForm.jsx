import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';


const PostRecipeForm = props => (
  <main className="container">

    <div className="row justify-content-md-center">
      <div className="col-md-8">

        <h1>Add New Recipe</h1>
        {props.state.errors &&
          <ul className="errorMessage">{
            props.state.errors.map(error => (
              <li key={Math.floor(Math.random() * 1000)
              }
              >{error}
              </li>))}
          </ul>
        }

        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label htmlFor="recipeTitle">Recipe title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="recipeTitle"
              placeholder="Enter recipe title"
              value={props.state.title}
              onChange={props.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Recipe ingredients</label>

            <textarea
              className="form-control"
              name="ingredients"
              id="ingredients"
              placeholder="Enter recipe ingredients seperated by commas"
              rows="5"
              value={props.state.ingredients}
              onChange={props.onChange}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              seperate each ingredients with a comma (,)
            </small>

          </div>

          <div className="form-group">
            <label htmlFor="post">Recipe description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              rows="5"
              placeholder="Enter recipe description"
              value={props.state.description}
              onChange={props.onChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imgurl">Recipe image</label>
            <Dropzone
              onDrop={props.handleDrop}
              multiple={false}
            >
              <p className="text-center pt-4">
                Click to upload image
              </p>
              { props.imagePreview &&

              <div className="form-group">
                <img
                  src={props.imagePreview}
                  alt=""
                  className="img img-responsive img-thumbnail imagePreview"
                />
              </div>
              }
            </Dropzone>


          </div>


          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    </div>
  </main>

);

PostRecipeForm.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDrop: PropTypes.func.isRequired,
  imagePreview: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  state: PropTypes.shape({
    description: PropTypes.string,
    errors: PropTypes.array,
    image: PropTypes.string,
    ingredients: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
};

PostRecipeForm.defaultProps = {
  imagePreview: null
};

export default PostRecipeForm;
