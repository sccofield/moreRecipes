import React from 'react';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import MyRecipes from './MyRecipes';
import FavoriteRecipes from './FavoriteRecipes';
import getUserRecipesActionCreator from '../../actions/getUserRecipes';
import deleteRecipeActionCreator from '../../actions/deleteRecipe';
import { getFavouriteRecipeCreator } from '../../actions/favourite';

/**
 *
 *
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
   * Creates an instance of Dashboard.
   * @param {any} props
   * @memberof Dashboard
   */
  constructor(props) {
    super(props);

    this.handlePageClick = this.handlePageClick.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleFavClick = this.handleFavClick.bind(this);
  }
  /**
 *
 * @returns {null} null
 * @memberof Dashboard
 */
  componentWillMount() {
    this.props.getUserRecipesActionCreator();
    this.props.getFavouriteRecipeCreator();
  }

  /**
 *
 * @returns {obj} obj
 * @param {any} nextProps
 * @memberof PostRecipe
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.userRecipes.length < this.props.userRecipes.length) {
      toastr.success('Recipe deleted');
    }
  }


  /**
   *
   *@returns {null} null
   * @param {any} event
   * @memberof Dashboard
   */
  onDelete(event) {
    const { id } = event.target;
    this.props.deleteRecipeActionCreator(id);
    $('#deleteButton').modal('hide');
  }

  /**
 *
 *@returns {null} null
 * @param {any} page
 * @memberof Dashboard
 */
  handlePageClick(page) {
    this.props.getUserRecipesActionCreator(page.selected + 1);
  }

  /**
 *
 *@returns {null} null
 * @param {any} page
 * @memberof Dashboard
 */
  handleFavClick(page) {
    this.props.getFavouriteRecipeCreator(page.selected + 1);
  }
  /**
   *
   *
   * @returns {null} object
   * @memberof Dashboard
   */
  render() {
    return (
      <div className="main">
        <PageHeader />
        <section className="text-left container">
          <div className="author-box">
            <h3 className="h3-responsive text-center">
              Hi {this.props.userDetail.username} !
            </h3>
            <hr />
            <div className="row">
              <div className="col-12 col-sm-2">
                <img
                  src="img/mikee.png"
                  alt=""
                  className="img-fluid rounded-circle z-depth-2"
                />
              </div>
              <div className=" col-12 col-sm-10">
                <h4>
                  <strong>Welcome to your More Recipe Dashboard</strong>
                </h4>
                <p>
                  Here, you can view all the recipes that you have created.
                  You can also see all your favourited recipes here too.
                </p>


                <blockquote className="blockquote">
                  <p className="mb-0">
                    Cooking is like painting or writing a song.
                    Just as there are only so many notes or colors,
                    there are only so many flavors - it is how you combine them
                    that sets you apart.
                  </p>
                  <footer className="blockquote-footer">Wolfgang Puck

                  </footer>
                </blockquote>


              </div>

              <div className="profileTab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#myRecipes"
                      role="tab"
                    >
                      My Recipes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#favorites"
                      role="tab"
                    >
                      Favorites
                    </a>
                  </li>
                </ul>

                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="myRecipes"
                    role="tabpanel"
                  >
                    <MyRecipes
                      userRecipes={this.props.userRecipes}
                      pageCount={this.props.recipePageCount}
                      handlePageClick={this.handlePageClick}
                      onDelete={this.onDelete}
                    />
                  </div>
                  <div className="tab-pane" id="favorites" role="tabpanel">
                    <FavoriteRecipes
                      favouriteRecipes={this.props.favouriteRecipes}
                      pageCount={this.props.favPageCount}
                      handlePageClick={this.handleFavClick}
                      userId={this.props.userDetail.id}
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>


        </section>


        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userRecipes: state.recipe.userRecipes,
  userDetail: state.user.user,
  recipePageCount: state.recipe.pageCount,
  favouriteRecipes: state.recipe.favouriteRecipes,
  favPageCount: state.recipe.favPageCount
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getUserRecipesActionCreator,
    deleteRecipeActionCreator,
    getFavouriteRecipeCreator
  }, dispatch);

Dashboard.propTypes = {
  getUserRecipesActionCreator: PropTypes.func.isRequired,
  getFavouriteRecipeCreator: PropTypes.func.isRequired,
  deleteRecipeActionCreator: PropTypes.func.isRequired,
  userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  userDetail: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string
  }).isRequired,
  recipePageCount: PropTypes.number,
  favouriteRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favPageCount: PropTypes.number
};

Dashboard.defaultProps = {
  favPageCount: null,
  recipePageCount: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
