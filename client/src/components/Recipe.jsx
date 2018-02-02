import React from 'react';

const Recipe = () => (
  <div className="card">
    <div className="view overlay hm-white-slight">
      <img src="img/rice.jpg" className="img-fluid" alt="" />
      <a>
        <div className="mask" />
      </a>
    </div>
    <a className="btn-floating btn-action" href="#">
      <i className="fa fa-heart-o" />
    </a>
    <div className="card-body">
      <a href="recipeDetail.html">
        <h4 className="card-title">Baked Rice and Stew</h4>
        <hr />
      </a>
      <p className="card-text">Lorem ispum lorem ispum lorem ispim lorem ispum lorem ispim lorem sosos fmffmfnod kdoe lorem ispum lorem ispulm
                lssumr.
      </p>

      <p className="author">By
        <span>Michael Umanah</span>
      </p>
      <div className="voteButton">
        <a className="btn btn-outline-info"><i className="fa fa-thumbs-o-up" aria-hidden="true" /> upvote</a>
        <a className="btn btn-outline-info"><i className="fa fa-thumbs-o-down" aria-hidden="true" /> downvote</a>
      </div>
    </div>

    <div className="card-data">
      <ul>
        <li>
          <i className="fa fa-pencil" aria-hidden="true" />
        </li>
        <li>
          <i className="fa fa-clock-o" /> 05/10/2015
        </li>
        <li>

          <i className="fa fa-comments-o" />12
        </li>
        <li>

          <i className="fa fa-thumbs-up" />210
        </li>

      </ul>
    </div>

  </div>
);

export default Recipe;
