import React from 'react';
import PropTypes from 'prop-types';
import Recipe from '../Recipe';

const LatestRecipe = props => (
  <div>
    <section className="container title">
      <h3>Latest Recipes</h3>
      <hr />
    </section>

    <section className="container recipes">
      <div className="row">
        {props.recipes.map(recipe => (
          <div className="col-md-6 col-lg-4" key={recipe.id}>
            <Recipe recipe={recipe} />

          </div>
        ))}
      </div>


    </section>
  </div>
);

LatestRecipe.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object)
};

LatestRecipe.defaultProps = {
  recipes: null
};

export default LatestRecipe;
