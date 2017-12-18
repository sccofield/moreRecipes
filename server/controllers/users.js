import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
        message: 'Password do not match'
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
      .then(user => res.status(201).json({
        status: 'success',
        message: `user with id ${user.id} has been created`,
      }))
      .catch(error =>
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
            message: 'invalid login details',
          });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return res.status(400).send({
            status: 'Error',
            message: 'Incorrect password',
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 7200 });
        res.status(200).send({
          status: 'success',
          message: 'Successfully signin',
          data: token,
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
              return res.status(400)
                .json({
                  status: 'Error',
                  message: 'You have added this recipe to your favorite already'
                });
            }
            db.Favorite.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId
            })
              .then(() => res.status(201)
                .json({
                  status: 'success',
                  message: 'Recipe added to favorite'
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
    db.Favorite.findAll({
      where: {
        userId: req.decoded.id
      },
      include: [
        {
          model: db.Recipe, attributes: ['title', 'ingredients', 'description']
        }
      ]
    })
      .then((favorite) => {
        if (favorite && Object.keys(favorite).length !== 0) {
          return res.status(200)
            .json({
              status: 'success',
              message: 'favorites',
              data: favorite
            });
        }
        return res.status(404)
          .json({
            status: 'Error',
            message: 'You don\'t have any favorites'
          });
      })
      .catch(error => res.status(500)
        .json({
          status: 'Error',
          message: error
        }));
  }
  /**
   * add upvote
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static upvote(req, res) {
    db.Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404)
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
              return res.status(400)
                .json({
                  status: 'Error',
                  message: 'Recipe has already been upvoted by you.'
                });
            }
            db.Upvote.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId,
              vote: true
            })
              .then(() => {
                db.Recipe.findById(req.params.recipeId)
                  .then((found) => {
                    found.increment('votes');
                    return res.status(201)
                      .json({
                        staus: 'success',
                        message: 'Recipe upvoted'
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
    db.Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(400)
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
              return res.status(400)
                .json({
                  status: 'Error',
                  message: 'Recipe has already been downvoted by you.'
                });
            }
            db.Downvote.create({
              userId: req.decoded.id,
              recipeId: req.params.recipeId,
              vote: true
            })
              .then(() => {
                db.Recipe.findById(req.params.recipeId)
                  .then((found) => {
                    found.decrement('votes');
                    return res.status(201)
                      .json({
                        staus: 'success',
                        message: 'Recipe downvoted'
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
