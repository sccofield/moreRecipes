import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import downvoteRecipeActionCreator from '../actions/downvote';

/**
 *
 *
 * @class Favourite
 * @extends {React.Component}
 */
export class Downvote extends React.Component {
  /**
   * Creates an instance of Favourite.
   * @param {any} props
   * @memberof Favourite
   */
  constructor(props) {
    super(props);
    //  this.props.id
    this.downvote = this.downvote.bind(this);
  }
  /**
   *@param {obj} event
   *@return {obj} obj
   * @memberof Favourite
   */
  downvote() {
    const { id } = this.props;
    this.props.downvoteRecipeActionCreator(id);
  }
  /**
 *
 *
 * @returns {ob} obj
 * @memberof Favourite
 */
  hasVoted() {
    const result =
    this.props.downvote.find(vote => vote.userId === this.props.userId);
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
      <button
        id="downvoteButton"
        className={`btn btn-outline-info m-1 ${this.hasVoted() ? 'vote' : ''}`}
        onClick={this.downvote}
      >
        <i
          className="fa fa-thumbs-o-up"
          aria-hidden="true"
        /> downvote
      </button>
    );
  }
}

Downvote.propTypes = {
  id: PropTypes.number.isRequired,
  downvote: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  downvoteRecipeActionCreator: PropTypes.func.isRequired

};


export const mapDispatchToProps = dispatch =>
  bindActionCreators({ downvoteRecipeActionCreator }, dispatch);

export default connect(null, mapDispatchToProps)(Downvote);

