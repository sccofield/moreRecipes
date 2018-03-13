import React from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const MyRecipes = props => (
  <div>
    {props.userRecipes.length === 0 ? (
      <div>
        <p className="noRecipe">You have not created any recipe yet.</p>
        <p><Link to="/postRecipe">Click here</Link> to add a new recipe</p>
      </div>
    ) : (
      <section className="section text-center text-lg-left container">
        <nav className="row justify-content-center">
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel={<a>...</a>}
            breakClassName="break-me"
            pageCount={props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={props.handlePageClick}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
          />
        </nav>

        {props.userRecipes.map(userRecipe => (
          <div key={userRecipe.id}>
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="view overlay hm-white-slight z-depth-1">
                  <img
                    alt=""
                    src={userRecipe.imageUrl}
                    className="profileImage"
                  />
                  <a>
                    <div className="mask" />
                  </a>
                </div>
              </div>

              <div className="col-lg-7 tab-recipe">
                <h4 className="">
                  <Link to={`recipes/${userRecipe.id}`}>
                    <strong>{userRecipe.title}</strong>
                  </Link>
                </h4>
                <p>{userRecipe.description.slice(0, 80).concat(' ...')}</p>
                <p>
                  by
                  <a>
                    <strong> {userRecipe.userName}</strong>
                  </a>, { moment(userRecipe.createdAt).format('ll')}
                  <span className="btn btn-outline-info mx-1" id="editRecipe">
                    <Link className="" to={`/recipe/edit/${userRecipe.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true" />
                    </Link>
                  </span>
                  <a
                    id="deleteRecipe"
                    className="btn btn-outline-info mx-1"
                    data-toggle="modal"
                    data-target="#deleteButton"
                  >
                    <i className="fa fa-trash" aria-hidden="true" />
                  </a>
                </p>

                {/* <-- Modal --> */}
                <div
                  className="modal fade"
                  id="deleteButton"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Delete Recipe
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete this recipe?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          No
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary yesDelete"
                          onClick={props.onDelete}
                          id={userRecipe.id}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />
          </div>
        ))}
        <p><Link to="/postRecipe">Click here</Link> to add a new recipe</p>

      </section>
    )}
  </div>
);

MyRecipes.propTypes = {
  userRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  handlePageClick: PropTypes.func.isRequired
};
MyRecipes.defaultProps = {
  pageCount: null
};

export default MyRecipes;
