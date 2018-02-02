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
          return res.json({
            status: 'fail',
            message: 'Failed to authenticate token.'
          });
        }
        req.decoded = decoded;
        // console.log(req.decoded);
        // console.log(req.decoded.id);
        next();
      });
    } else {
      return res.status(401).json({
        status: 'fail',
        message: 'No token provided.'
      });
    }
  }
  // /**
  //  * check if user is admin
  //  * @param {object} req expres req object
  //  * @param {object} res exp res object
  //  * @param {object} next exp next object
  //  * @returns {json} json
  //  * @memberof Middleware
  //  */
  // static isAdmin(req, res, next) {
  //   if (req.params.id === 1) {
  //     return next();
  //   }
  //   return res.status(500).json({
  //     status: 'Error',
  //     message: 'You are not and admin and don\'t have the priviledge'
  //   });
  // }
}

export default Middleware;
