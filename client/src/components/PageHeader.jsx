import React from 'react';

const PageHeader = () => (
  <header style={{ backgroundColor: 'black', backgroundImage: 'none' }}>
    <div className="container">

      <nav className="navbar navbar-dark navbar-expand-lg justify-content-between py-3 sticky">
        <div className="brand">

          <a href="index.html" className="navbar-brand mr-0">More Recipes</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-nav">
          <span className="navbar-toggler-icon" />
        </button>


        <div className="navbar-collapse collapse dual-nav">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/recipes">Explore Recipe</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/postRecipe">Post Recipe</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/profile">profile</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/register">Register</a>
            </li>
          </ul>
        </div>
      </nav>


    </div>

  </header>

);

export default PageHeader;
