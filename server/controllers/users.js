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
  signup(req, res) {
    if (!req.body.password === req.body.confirmPassword) {
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
  signin(req, res) {
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
        const token = jwt.sign({ user }, 'secret', { expiresIn: 7200 });
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
