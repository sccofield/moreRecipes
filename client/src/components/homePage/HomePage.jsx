import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HomePageHeader from './HomePageHeader';
import Footer from '../Footer';
import PopularRecipe from './PopularRecipe';
import LatestRecipe from './LatestRecipe';
import getHomeRecipeActionCreator from '../../actions/homeRecipe';
/**
 *
 *
 * @class HomePage
 * @extends {React.Component}
 */
class HomePage extends React.Component {
  /**
   * Creates an instance of HomePage.
   * @memberof HomePage
   */
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getHomeRecipeActionCreator();
  }
  /**
 *
 * @returns {null} null
 *
 * @memberof HomePage
 */
  render() {
    return (
      <div>
        <HomePageHeader />
        <div>
          <PopularRecipe />

          <LatestRecipe />


          <section className="cta text-center">
            <h3>Do you have a beautiful Recipe</h3>
            <p>Share it with the world and get awesome feedbacks</p>
            <button type="button" className="btn btn-primary btn-lg recipeButton">Post Recipe</button>
          </section>


        </div>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getHomeRecipeActionCreator }, dispatch);

export default connect(null, mapDispatchToProps)(HomePage);
