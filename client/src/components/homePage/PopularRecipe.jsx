import React from 'react';
import PropTypes from 'prop-types';
import Recipe from '../Recipe';

const PopularRecipe = props => (
  <div id="popularRecipe">
    <section className="container title">
      <h3>{props.title || 'Popular Recipes'}</h3>
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

PopularRecipe.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

PopularRecipe.defaultProps = {
  recipes: null,
  title: null
};

export default PopularRecipe;

