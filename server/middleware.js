import jwt from 'jsonwebtoken';

/**
 * @class middleware
 */
class Middleware {
  /**
   * token check
   * @param {object} req expres req object
   * @param {object} res exp res object
   * @param {object} next exp next object
   * @returns {json} json
   * @memberof UserController
   */
  checkToken(req, res, next) {
    const decoded = jwt.decode(req.query.token || req.body.token || req.headers.token);
    if (!decoded) {
      return res.status(401).json({
        message: 'you have to be logged in to create recipe',
      });
    }
    next();
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

export default Middleware;
