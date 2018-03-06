import React from 'react';
import PropTypes from 'prop-types';

const SearchRecipe = props => (
  <section className="container search">
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="Search for recipes and ingredients"
            value={props.searchQuery}
            onChange={props.onSearchChange}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-secondary"
              onClick={props.handleSearchRecipes}
              type="button"
            >Search
            </button>
          </span>
        </div>
      </div>
    </div>
  </section>
);

SearchRecipe.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  handleSearchRecipes: PropTypes.func.isRequired
};

export default SearchRecipe;
