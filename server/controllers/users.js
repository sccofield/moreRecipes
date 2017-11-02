import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../models';


const saltRounds = 10;

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
    if (req.body.password !== req.body.cPassword) {
      return res.status(500).json({
        status: 'Error',
        message: 'password do not match'
      });
    }

    db.User.create({
      userName: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds)
    })
      .then(user => res.status(201).json({
        status: 'success',
        message: `user with id ${user.id} has been created`,
      }))
      .catch(error => res.status(500).json({
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
    if (!req.body.email) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input your email'
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
        status: 'Error',
        message: 'Please input your password'
      });
    }
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(400).send({
            status: 'Error',
            message: 'invalid login details',
          });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
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
      .catch(error => res.status(500).json({
        status: 'fail',
        message: error.errors[0].message
      }));
  }
  /**
   * get user
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static getUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (id === req.decoded.id || req.decoded.id === 1) {
      db.User.findOne({
        where: {
          id: req.params.id
        },
      })
        .then((user) => {
          if (user) {
            return res.status(200).json({
              status: 'success',
              data: user,
            });
          }
          return res.status(500).json({
            status: 'Error',
            message: 'user does not exist'
          });
        })
        .catch(error => res.status(500).json({
          status: 'fail',
          message: error.errors[0].message
        }));
    } else {
      return res.status(500).json({
        status: 'Fail',
        message: 'You don\'t have privilledge to view this user'
      });
    }
  }
  /**
   * get user
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @returns {json} json
   * @memberof userController
   */
  static getAllUser(req, res) {
    if (req.decoded.id === 1) {
      db.User.findAll()
        .then(users => res.status(200).json({
          status: 'success',
          data: users
        }))
        .catch(error => res.status(500).json({
          status: 'fail',
          message: error
        }));
    } else {
      return res.status(500).json({
        status: 'Error',
        message: 'You don\'t have priviledge for this action'
      });
    }
  }
}

export default UserController;
