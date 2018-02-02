import React from 'react';
import Navbar from '../Navbar';

const HomePageHeader = () => (
  <header>
    <div className="container">
      <Navbar />

      <div className="jumbotron text-center">
        <h2>The best recipes in the world come from real people like you</h2>
        <p>Collaborate with the community, get reviews, earn votes while showcasing your awesome recipe.</p>
        <button className="btn btn-primary recipeButton" type="submit">Post Recipe</button>
      </div>

    </div>

  </header>

);

export default HomePageHeader;
