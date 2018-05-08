import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

/**
 * Default success response callback
 * @param {Obj} data - Response data
 * @param {*} statusCode - Status code, default 200
 */
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

/**
 * Default error response callback
 * @param {string} message - Error message
 * @param {*} statusCode - Status code, default 400
 */
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

/**
 * Manage user endpoints
 */
class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  /**
   * Parse user data from jwt.
   * @param {Obj} req - The request object
   * @param {Obj} res - The response object
   * @param {string} secretToken  - The jwt secret salt
   */
  parseUser(req, res, secretToken) {
    // Validate auth headers
    if (req.headers && req.headers.authorization) {
      // Get auth token
      const { authorization } = req.headers;
      let decoded;
      try {
        // Prepare token string
        const token = authorization.replace('bearer ', '');
        // Decode data
        decoded = jwt.decode(token, secretToken);
      } catch (e) {
        return defaultResponse({}, HttpStatus.UNAUTHORIZED);
      }
      // Get user in data
      this.Users.findOne({ where: { id: decoded.id } })
        .then((user) => {
          // Return user id and name
          const userData = {
            id: user.id,
            name: user.name,
          };
          res.status(HttpStatus.OK);
          res.json(userData);
        })
        .catch(err => defaultResponse(err.message, HttpStatus.UNAUTHORIZED));
    }
    return defaultResponse({}, HttpStatus.UNAUTHORIZED);
  }

  /**
   * Create user.
   * @param {Obj} data - The user data
   */
  create(data) {
    return this.Users.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(err => errorResponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default UsersController;
