import React from 'react';
import ReactPaginate from 'react-paginate';

import { Link } from 'react-router-dom';

const FavoriteRecipes = props => (
  <div>

    {props.favouriteRecipes.length === 0 ? (
      <p>You have not added any recipe to your favourites yet.</p>
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

        {props.favouriteRecipes.map(favouriteRecipe => (

          <div key={favouriteRecipe.id}>

            <div className="row">


              <div className="col-lg-4 mb-4">

                <div className="view overlay hm-white-slight z-depth-1">
                  <img alt="" src={favouriteRecipe.Recipe.imageUrl} className="profileImage" />
                  <a>
                    <div className="mask" />
                  </a>
                </div>
              </div>

              <div className="col-lg-7">

                <h4 className="">
                  <Link to={`recipes/${favouriteRecipe.Recipe.id}`}>
                    <strong>{favouriteRecipe.Recipe.title}</strong>
                  </Link>
                </h4>
                <p>{favouriteRecipe.Recipe.description}
                </p>
                <p>by
                  <a>
                    <strong> {favouriteRecipe.Recipe.userName}</strong>
                  </a>, {favouriteRecipe.Recipe.createdAt.slice(0, 10)}

                </p>


              </div>


            </div>

            <hr />
          </div>


        ))}


      </section>
    )}


  </div>
);

export default FavoriteRecipes;
