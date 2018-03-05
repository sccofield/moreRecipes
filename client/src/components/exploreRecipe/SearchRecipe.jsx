import React from 'react';

const SearchRecipe = () => (
  <section className="container search">
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Search for recipes and ingredients"
          />
          <span className="input-group-btn">
            <button className="btn btn-secondary" type="button">Search</button>
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default SearchRecipe;
