import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import HomePage from '../components/homePage/HomePage';
import ExploreRecipe from '../components/exploreRecipe/ExploreRecipe';
import RecipeDetail from '../components/RecipeDetail';
import PostRecipe from '../components/postRecipe/PostRecipe';
import Register from '../components/register/Register';
import Login from '../components/login/Login';
import NotFoundPage from '../components/NotFoundPage';
import Dashboard from '../components/dashboard/Dashboard';
import EditRecipe from '../components/editRecipe/EditRecipe';

import AuthRoute from './AuthRoute';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" name="Home page" component={HomePage} exact />
        <Route path="/recipes" component={ExploreRecipe} exact />
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Route path="/recipe/edit/:id" exact component={EditRecipe} />
        <AuthRoute Route path="/postRecipe" component={PostRecipe} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <AuthRoute path="/dashboard" component={Dashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>

  </BrowserRouter>
);

export default AppRouter;
