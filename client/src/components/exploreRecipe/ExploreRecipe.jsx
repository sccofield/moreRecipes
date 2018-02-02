import React from 'react';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import SearchRecipe from './SearchRecipe';
import PopularRecipe from '../homePage/PopularRecipe';

const ExploreRecipe = () => (
  <div>
    <PageHeader />
    <SearchRecipe />
    <PopularRecipe />
    <Footer />
  </div>
);

export default ExploreRecipe;
