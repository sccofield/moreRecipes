import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Favourite from '../components/Favourite';
import PageHeader from './PageHeader';
import Footer from './Footer';
import getSingleRecipeActionCreator from '../actions/singleRecipes';
import Review from './review/Review';
import Upvote from './Upvote';
import Downvote from './Downvote';

/**
 *
 *
 * @class recipeDetail
 */
class RecipeDetail extends React.Component {
  /**
   *
   * @returns { obj} obj
   * @memberof RecipeDetail
   */
  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getSingleRecipeActionCreator(this.props.match.params.id);
  }

  /**
 *
 *
 * @returns { obj} obj
 * @memberof recipeDetail
 */
  render() {
    return (
      <div className="main">
        {
          this.props.recipe &&

          <div>
            <PageHeader />
            <div className="container">


              <div className="row">
                <div className="content">
                  <div className="col-lg-12">
                    <div className="row justify-content-md-center">
                      <div className="recipeTitle">
                        <h2 className="text-capitalize">
                          {this.props.recipe.title}
                        </h2>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <img
                        alt=""
                        className="img-fluid img-thumbnail recipeImage"
                        src={this.props.recipe.imageUrl}
                      />
                      {
                        this.props.isAuthenticated &&
                        <div>
                          <Upvote
                            id={this.props.recipe.id}
                            upvote={this.props.recipe.Upvotes}
                            userId={this.props.user.id}
                          />
                          <Downvote
                            id={this.props.recipe.id}
                            downvote={this.props.recipe.Downvotes}
                            userId={this.props.user.id}
                          />
                          <Favourite
                            id={this.props.recipe.id}
                            favorites={this.props.recipe.Favorites}
                            userId={this.props.user.id}
                          />

                          {
                            this.props.user.id === this.props.recipe.userId &&
                            <Link
                              className="btn btn-outline-info m-1"
                              to={`/recipe/edit/${this.props.recipe.id}`}
                            >
                              <i className="fa fa-pencil" aria-hidden="true" />
                            </Link>
                          }

                        </div>
                      }


                      <div className="author pt-2">
                        <p>Author:
                          <span> {this.props.recipe.userName}</span>
                        </p>
                        <p>Posted on:
                          <span>
                            { moment(this.props.recipe.createdAt).format('ll')}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-6">


                      <div className="ingredients pt-3">
                        <h3>Ingredients</h3>
                        <ul>
                          {
                            this.props.recipe.ingredients.split(',')
                              .map(ingredient =>
                                (
                                  <li
                                    key={Math.floor(Math.random() * 1000)}
                                    className="text-capitalize"
                                  >
                                    {ingredient}
                                  </li>
                                ))
                          }
                        </ul>
                      </div>

                      <div className="methods pt-3">
                        <h3>Description</h3>
                        <p>{this.props.recipe.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <Review
                        recipeId={this.props.recipe.id}
                        history={this.props.history}
                      />

                    </div>
                  </div>
                </div>
              </div>


            </div>


            <Footer />
          </div>
        }
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  getSingleRecipeActionCreator: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({}).isRequired,
  recipe: PropTypes.shape({
    Review: PropTypes.array,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    imageUrl: PropTypes.string,
    ingredients: PropTypes.string,
    title: PropTypes.string,
    userName: PropTypes.string,
    Favorites: PropTypes.array,
    Upvotes: PropTypes.array,
    Downvotes: PropTypes.array,
    userId: PropTypes.number
  }),
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number
  }).isRequired

};

RecipeDetail.defaultProps = {
  recipe: null
};


const mapStateToProps = state => ({
  recipe: state.recipe.singleRecipe,
  user: state.user.user,
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getSingleRecipeActionCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
