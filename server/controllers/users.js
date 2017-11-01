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
    if (!(req.body.username && req.body.email && req.body.password && req.body.cPassword)) {
      return res.status(500).json({
        message: 'Please fill in all the details'
      });
    }
    if (req.body.password !== req.body.cPassword) {
      return res.status(500).json({
        message: 'password do not match'
      });
    }

    db.User.create({
      userName: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds)
    })
      .then(() => res.status(201).json({
        status: 'success',
        message: 'account created successfully',
      }))
      .catch(error => res.status(500).json({
        message: error.errors[0].message
      }));
  }
}

export default UserController;
