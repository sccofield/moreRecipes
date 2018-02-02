import React from 'react';
import Recipe from '../Recipe';

const LatestRecipe = () => (
  <div>
    <section className="container title">
      <h3>Latest Recipes</h3>
      <hr />
    </section>

    <section className="container recipes ">

      <div className="row">
        <div className="col-md-4">
          <Recipe />


        </div>

        <div className="col-md-4">
          <Recipe />

        </div>

        <div className="col-md-4">
          <Recipe />

        </div>
      </div>

    </section>
  </div>
);

export default LatestRecipe;
