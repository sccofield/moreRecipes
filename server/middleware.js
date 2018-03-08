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
   * @memberof Middleware
   */
  static verify(req, res, next) {
    const { token } = req.headers;
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            status: 'Error',
            message: 'Failed to authenticate token.'
          });
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return res.status(401).json({
        status: 'Error',
        message: 'No token provided.'
      });
    }
  }
}

export default Middleware;
