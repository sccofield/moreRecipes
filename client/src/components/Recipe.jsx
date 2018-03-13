import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Recipe = props => (
  <div>
    {
      props.recipe &&

      <div className="card">
        <div className="view overlay hm-white-slight image-width">
          <img
            src={props.recipe.imageUrl}
            className="img-fluid image-width"
            alt=""
          />
          <a>
            <div className="mask" />
          </a>
        </div>
        {/* <a className="btn-floating btn-action" href="#">
          <i className="fa fa-heart-o" />
        </a> */}
        <div className="card-body">
          <Link to={`recipes/${props.recipe.id}`}>
            <h4 className="card-title">{props.recipe.title}</h4>
            <hr />
          </Link>
          <p className="card-text">
            {props.recipe.description.slice(0, 140).concat(' ...')}
          </p>

          <p className="author">By
            <span> {props.recipe.userName}</span>
          </p>
        </div>

        <div className="card-data">
          <ul>
            <li>
              <i className="fa fa-clock-o" />
              {moment(props.recipe.createdAt).format('ll')}
            </li>
            <li>

              <i className="fa fa-comments-o" /> {props.recipe.Reviews.length}
            </li>
            <li>
              <i className="fa fa-thumbs-up" /> {props.recipe.Upvotes.length}
            </li>
            <li>
              <i className="fa fa-thumbs-down" />
              {props.recipe.Downvotes.length}
            </li>

          </ul>
        </div>

      </div>
    }
    {
      !props.recipe &&
      <h1>No Recipe added yet ...</h1>
    }
  </div>
);

Recipe.propTypes = {
  recipe: PropTypes.shape({
    imageUrl: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    userName: PropTypes.string,
    createdAt: PropTypes.string,
    Reviews: PropTypes.array,
    Downvotes: PropTypes.array,
    Upvotes: PropTypes.array
  })
};

Recipe.defaultProps = {
  recipe: null
};

export default Recipe;
