const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // since we assign the token to the user, we need specific data of the user to which we assign token, we require/expect id of the user.
  return jwt.sign({ id }, 'anyKey', { expiresIn: '5d' });
};

module.exports = generateToken;
