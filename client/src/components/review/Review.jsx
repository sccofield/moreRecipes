import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import addReviewActionCreator from '../../actions/addReview';

/**
 *
 * @returns {obj} obj
 * @class Review
 * @extends {React.Component}
 */
class Review extends React.Component {
  /**
   * @param {any} props
   * Creates an instance of Review.
   * @memberof Review
   */
  constructor(props) {
    super(props);
    this.state = {
      review: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
 *
 * @returns {obj} obj
 * @param {any} nextProps
 * @memberof PostRecipe
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.reviews.length > this.props.reviews.length) {
      this.setState({
        review: ''
      });
    }
  }

  /**
 *
 * @returns { obj} obj
 * @param {any} event
 * @memberof Review
 */
  onChange(event) {
    this.setState({
      review: event.target.value
    });
  }

  /**
 *
 * @returns {obj} obj
 * @param {any} event
 * @memberof Review
 */
  onSubmit(event) {
    event.preventDefault();
    // if (this.props.isAuthenticated === false) {
    //   this.props.history.push('/login');
    //   toastr.warning('You have to be logged in to make a review');
    // } else {
    this.props.addReviewActionCreator(this.state, this.props.recipeId);
    event.target.reset();
    // }
  }


  /**
   *
   *
   * @returns {obj} obj
   * @memberof Review
   */
  render() {
    return (
      <div className="">
        <h3 className="text-center">Reviews</h3>
        <hr />
        <div className="review">
          {
            this.props.isAuthenticated &&
            <form
              className="form-group md-form"
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            >
              <textarea
                name="review"
                className="form-control"
                id="exampleTextarea"
                rows="4"
                placeholder="Enter review here"
                value={this.state.review}
              />
              <button
                type="submit"
                className="btn btn-primary recipeButton mt-2"
              >
                Add Review
              </button>
            </form>
          }
          {
            !this.props.isAuthenticated &&

            <p className="text-center">
              You have to be logged in to leave a review.
              <Link to="/login">Click here to login.</Link>
            </p>

          }
        </div>
        {
          this.props.reviews.length > 0 &&
          <div>

            {this.props.reviews.slice(0).reverse().map(review => (
              <div className="singleReview text-center" key={review.id}>

                <p>{review.review}</p>
                <hr />
                <div className="reviewTime">
                  <p><span>{review.userName} - </span>
                    {moment(review.createdAt).fromNow()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        }

      </div>


    );
  }
}

Review.propTypes = {
  addReviewActionCreator: PropTypes.func.isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
  recipeId: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Review.defaultProps = {
  reviews: null
};
const mapStateToProps = state => ({
  reviews: state.recipe.singleRecipe.Reviews,
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addReviewActionCreator }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Review);
