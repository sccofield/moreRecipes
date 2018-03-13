import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import favouriteRecipeActionCreator from '../actions/favourite';

/**
 *
 *
 * @class Favourite
 * @extends {React.Component}
 */
export class Favourite extends React.Component {
  /**
   * Creates an instance of Favourite.
   * @param {any} props
   * @memberof Favourite
   */
  constructor(props) {
    super(props);
    //  this.props.id
    this.favourite = this.favourite.bind(this);
  }
  /**
   *@param {obj} event
   *@return {obj} obj
   * @memberof Favourite
   */
  favourite() {
    const { id } = this.props;
    this.props.favouriteRecipeActionCreator(id);
  }
  /**
 *
 *
 * @returns {ob} obj
 * @memberof Favourite
 */
  hasFavorited() {
    const result =
    this.props.favorites.find(fav => fav.userId === this.props.userId);
    if (result) {
      return true;
    }

    return false;
  }
  /**
   *
   *
   * @returns {obj} obj
   * @memberof Favourite
   */
  render() {
    return (
      <a
        id="favouriteButton"
        className={
          `btn btn-outline-info m-1 ${this.hasFavorited() ? 'favourite' : ''}`
        }
      >
        <i
          className="fa fa-heart"
          aria-hidden="true"
          onClick={this.favourite}
        />
      </a>
    );
  }
}

Favourite.propTypes = {
  favouriteRecipeActionCreator: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired
};


export const mapDispatchToProps = dispatch =>
  bindActionCreators({ favouriteRecipeActionCreator }, dispatch);

export default connect(null, mapDispatchToProps)(Favourite);

