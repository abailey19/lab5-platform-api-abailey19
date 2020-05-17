import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (!username || !email || !password) {
    return res.status(422).send('You must provide a username, email, and password');
  }

  User.find({ username, email }).then((result) => {
    if (result.length > 0) {
      return res.status(409).send('An account with this username and email already exists.');
    } else {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = password;
      user.save()
        .then((result2) => {
          res.send({
            user: result2,
            token: tokenForUser(user),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    }
  });
};
