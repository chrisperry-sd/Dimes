/* eslint no-console: 0 */
const User = require('../models/users');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.loadUserDetails = async function (req, res) {
  try {
    const users = await User.find();
    res.json(users.filter((user) => user.username === req.user.username));
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};

exports.signup = async function (req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201);
    res.send(newUser);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};

exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.send({
        error: {
          field: 'username',
          message: 'that username does not exist',
        },
      });
      return;
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      res.send({
        error: {
          field: 'password',
          message: 'incorrect password',
        },
      });
      return;
    }

    const accessToken = jwt.sign(
      user.toJSON(),
      process.env.ACCESS_TOKEN_SECRET,
    );

    res.json({ accessToken: accessToken });
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};

exports.logout = async function (req, res) {
  try {
  } catch (error) {}
};
