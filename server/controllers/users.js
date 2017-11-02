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
        message: 'Please input your email'
      });
    }
    if (!req.body.password) {
      return res.status(400).send({
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
            message: 'invalid login details',
          });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(400).send({
            message: 'Incorrect password',
          });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 7200 });
        res.status(200).send({
          message: 'Successfully signin',
          token,
          userId: user.id,
        });
      })
      .catch(error => res.status(500).send(error));
  }
}

export default UserController;
