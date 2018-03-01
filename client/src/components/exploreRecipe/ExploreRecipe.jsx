import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import PageHeader from '../PageHeader';
import Footer from '../Footer';
import SearchRecipe from './SearchRecipe';
import PopularRecipe from '../homePage/PopularRecipe';
import getRecipeActionCreator from '../../actions/recipes';

/**
 *
 *
 * @class ExploreRecipe
 */
class ExploreRecipe extends React.Component {
  /**
   * Creates an instance of ExploreRecipe.
   * @param {any} props
   * @memberof ExploreRecipe
   */
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      recipes: [],
    };

    this.getRecipes = this.getRecipes.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   *
   *@return {null} null
   * @memberof ExploreRecipe
   */
  componentWillMount() {
    // this.props.getRecipeActionCreator();
    this.getRecipes();
  }

  /**
   *@param {number} page
   * @return {null} null
   * @memberof ExploreRecipe
   */
  getRecipes(page) {
    let queryString = '/api/v1/recipes';
    if (page) {
      queryString += `?page=${page}`;
    }
    axios.get(queryString)
      .then((res) => {
        console.log(res);
        this.setState({
          recipes: res.data.recipes,
          pageCount: res.data.pages,
        });
      });
  }

  /**
 *
 *@returns {null} null
 * @param {any} page
 * @memberof ExploreRecipe
 */
  handlePageClick(page) {
    this.getRecipes(page.selected + 1);
  }
  /**
   *
   *
   * @returns {obj} obj
   * @memberof ExploreRecipe
   */
  render() {
    return (
      <div className="main">
        <PageHeader />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 content">
              <SearchRecipe />
              <nav className="row justify-content-center">
                <ReactPaginate
                  previousLabel="previous"
                  nextLabel="next"
                  breakLabel={<a>...</a>}
                  breakClassName="break-me"
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName="pagination"
                  subContainerClassName="pages pagination"
                  activeClassName="active"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  previousLinkClassName="page-link"
                />
              </nav>
              {
                this.state.recipes &&
                <div className="exploreRecipe">
                  <PopularRecipe recipes={this.state.recipes} />
                </div>
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipe.recipes
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getRecipeActionCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExploreRecipe);
