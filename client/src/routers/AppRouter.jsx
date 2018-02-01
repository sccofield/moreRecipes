import React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';

import HomePage from '../components/HomePage';
import ExploreRecipe from '../components/ExploreRecipe';
import Register from '../components/register/Register';
import Login from '../components/Login';
import Footer from '../components/Footer';
import NotFoundPage from '../components/NotFoundPage';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" name="Home page" component={HomePage} exact />
        <Route path="/recipes" component={ExploreRecipe} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>

  </BrowserRouter>
);

export default AppRouter;
