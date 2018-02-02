import React from 'react';
import Dropzone from 'react-dropzone';

const PostRecipeForm = props => (
  <main className="container">

    <div className="row justify-content-md-center">
      <div className="col-md-8">

        <h1>Post Recipe</h1>

        <form onSubmit={props.onSubmit}>
          <div className="form-group">
            <label>Recipe title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="recipeTitle"
              placeholder="Enter recipe title"
              value={props.state.title}
              onChange={props.onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="post">Recipe ingredients</label>
            <textarea
              className="form-control"
              name="ingredients"
              id="ingredients"
              placeholder="Enter recipe ingredients"
              rows="5"
              value={props.state.ingredients}
              onChange={props.onChange}
            />
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="imgurl">Recipe image</label>
            <Dropzone onDrop={props.handleDrop} />
          </div>

          { props.imagePreview &&

            <div className="form-group">
              <img src={props.imagePreview} alt="" className="img img-responsive" />
            </div>
          }

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>

);

export default PostRecipeForm;
