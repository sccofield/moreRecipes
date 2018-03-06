import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { checkId } from './helpers';

import db from '../models';


const saltRounds = Number(process.env.SALTROUNDS);

/**
 * @class UserController
 */
class UserController {
  /**
   * creates new user
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof UserController
   */
  static signup(req, res) {
    const {
      userName, email, password, cPassword
    } = req.body;

    if (!userName) {
      return res.status(400).json({
        status: 'Error',
        message: 'Username is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email is required'
      });
    }

    if (!password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Password is required'
      });
    }

    if (password !== cPassword) {
      return res.status(400).json({
        status: 'Error',
        message: 'Passwords do not match'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'Error',
        message: 'Password must be more than 6 characters'
      });
    }

    db.User.create({
      userName,
      email,
      password: bcrypt.hashSync(req.body.password, saltRounds)
    })
      .then((user) => {
        const token = jwt.sign({
          id: user.id, userName: user.userName
        }, process.env.SECRET);
        return res.status(201).json({
          status: 'success',
          message: `user with id ${user.id} has been created`,
          token,
          user: {
            username: user.userName,
            email: user.email,
            id: user.id
          }
          // userData
        });
      }).catch(error =>
        res.status(400).json({
          status: 'Error',
          message: error.errors[0].message
        }));
  }
  /**
   * authenticate user
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static signin(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input your email'
      });
    }
    if (!password) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input your password'
      });
    }
    db.User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            message: 'Invalid login details. Email or password wrong',
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(400).send({
            status: 'Error',
            message: 'Invalid login details. Email or password wrong',
          });
        }
        const token = jwt.sign({
          id: user.id, userName: user.userName
        }, process.env.SECRET);
        res.status(200).send({
          status: 'success',
          message: 'Successfully signin',
          token,
          user: {
            username: user.userName,
            email: user.email,
            id: user.id
          }
        });
      })
      .catch(error => res.status(400).json({
        status: 'fail',
        message: error.errors[0].message
      }));
  }
  /**
   * add favorite
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static addFavorite(req, res) {
    const { recipeId } = req.params;
    checkId(req, res, recipeId);
    db.Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404)
            .json({
              status: 'Error',
              message: `A recipe with Id ${req.params.recipeId} dose not exist`
            });
        }

        db.Favorite.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        })
          .then((favorite) => {
            if (favorite) {
              return favorite.destroy()
                .then(() => {
                  res.status(200).json({
                    message: 'You have removed recipe from favorite'
                  });
                });
            }
            db.Favorite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then(newFavorite => res.status(201)
                .json({
                  status: 'success',
                  message: 'Recipe added to favorite',
                  favorite: newFavorite// has userId and recipeId
                }))
              .catch(() => res.status(500)
                .json({
                  status: 'Error',
                  message: 'favorite not added. server error'
                }));
          })
          .catch(() => res.status(500)
            .json({
              status: 'Error',
              message: 'favorite not added. server error'
            }));
      })
      .catch(() => res.status(500)
        .json({
          status: 'Error',
          message: 'favorite not added. server error'
        }));
  }
  /**
   * get favorite
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static getFavorite(req, res) {
    db.Favorite.findAndCountAll({
      where: {
        userId: req.decoded.id
      }
    }).then((all) => {
      const limit = 2;
      let offset = 0;
      const page = parseInt((req.query.page || 1), 10);
      const numberOfItems = all.count;
      const pages = Math.ceil(numberOfItems / limit);
      offset = limit * (page - 1);
      db.Favorite.findAll({
        where: {
          userId: req.decoded.id
        },
        include: [
          {
            model: db.Recipe
          }
        ],
        limit,
        offset
      })
        .then(favorite =>
          res.status(200)
            .json({
              message: 'favorites',
              data: favorite,
              limit,
              pages,
              numberOfItems,
              page
            }))
        .catch(error => res.status(500)
          .json({
            status: 'Error',
            message: error
          }));
    });
  }


  /**
   * add upvote
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static upvote(req, res) {
    const { recipeId } = req.params;
    checkId(req, res, recipeId);
    db.Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404)
            .json({
              status: 'Error',
              message: 'Recipe dose not exist'
            });
        }
        db.Downvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        })
          .then((vote) => {
            if (vote) {
              vote.destroy();
            }
          });

        db.Upvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        })
          .then((vote) => {
            if (vote) {
              return vote.destroy()
                .then(() => {
                  res.status(200).json({
                    message: 'You have removed upvote'
                  });
                });
            }
            db.Upvote.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId,
              vote: true
            })
              .then((newVote) => {
                db.Recipe.findById(req.params.recipeId)
                  .then((found) => {
                    found.increment('votes');
                    return res.status(201)
                      .json({
                        staus: 'success',
                        message: 'Recipe upvoted',
                        vote: newVote
                      });
                  })
                  .catch((error) => {
                    res.status(500)
                      .json({
                        status: 'Error',
                        message: error
                      });
                  });
              });
          })
          .catch((error) => {
            res.status(500)
              .json({
                status: 'Error',
                message: error
              });
          });
      })
      .catch((error) => {
        res.status(500)
          .json({
            status: 'Error',
            message: error
          });
      });
  }
  /**
   * add downvote
   * @param {object} req express req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static downvote(req, res) {
    const { recipeId } = req.params;
    checkId(req, res, recipeId);
    db.Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(400)
            .json({
              status: 'Error',
              message: 'Recipe dose not exist'
            });
        }

        db.Upvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        })
          .then((vote) => {
            if (vote) {
              vote.destroy();
            }
          });

        db.Downvote.findOne({
          where: {
            userId: req.decoded.id,
            recipeId: req.params.recipeId
          }
        })
          .then((vote) => {
            if (vote) {
              return vote.destroy()
                .then(() => {
                  res.status(200).json({
                    message: 'You have removed down vote'
                  });
                });
            }
            db.Downvote.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId,
              vote: true
            })
              .then((newVote) => {
                db.Recipe.findById(req.params.recipeId)
                  .then((found) => {
                    found.decrement('votes');
                    return res.status(201)
                      .json({
                        staus: 'success',
                        message: 'Recipe downvoted',
                        vote: newVote
                      });
                  })
                  .catch((error) => {
                    res.status(500)
                      .json({
                        status: 'Error',
                        message: error
                      });
                  });
              });
          })
          .catch((error) => {
            res.status(500)
              .json({
                status: 'Error',
                message: error
              });
          });
      })
      .catch((error) => {
        res.status(500)
          .json({
            status: 'Error',
            message: error
          });
      });
  }
}

export default UserController;
