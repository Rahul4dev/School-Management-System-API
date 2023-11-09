// Hash Password
const bcrypt = require('bcryptjs');

exports.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

exports.isPasswordMatched = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};
