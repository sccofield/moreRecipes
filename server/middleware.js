import jwt from 'jsonwebtoken';

const secret = 'I love andela';


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
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers.token;
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded;
        // console.log(req.decoded);
        // console.log(req.decoded.id);
        next();
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}

export default Middleware;
