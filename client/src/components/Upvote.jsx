import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import upvoteRecipeActionCreator from '../actions/upvote';

/**
 *
 *
 * @class Favourite
 * @extends {React.Component}
 */
class Upvote extends React.Component {
  /**
   * Creates an instance of Favourite.
   * @param {any} props
   * @memberof Favourite
   */
  constructor(props) {
    super(props);
    //  this.props.id
    this.upvote = this.upvote.bind(this);
  }
  /**
   *@param {obj} event
   *@return {obj} obj
   * @memberof Favourite
   */
  upvote() {
    const { id } = this.props;
    this.props.upvoteRecipeActionCreator(id);
  }
  /**
 *
 *
 * @returns {ob} obj
 * @memberof Favourite
 */
  hasVoted() {
    const result =
    this.props.upvote.find(vote => vote.userId === this.props.userId);
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
        className={`btn btn-outline-info m-1 ${this.hasVoted() ? 'vote' : ''}`}
        onClick={this.upvote}
      >
        <i
          className="fa fa-thumbs-o-up"
          aria-hidden="true"
        /> upvote
      </button>
    );
  }
}


Upvote.propTypes = {
  id: PropTypes.number.isRequired,
  upvote: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired,
  upvoteRecipeActionCreator: PropTypes.func.isRequired

};


const mapDispatchToProps = dispatch =>
  bindActionCreators({ upvoteRecipeActionCreator }, dispatch);

export default connect(null, mapDispatchToProps)(Upvote);

