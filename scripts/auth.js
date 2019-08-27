const passport = require('passport');
const passportJWT = require('passport-jwt');
const myConfig = require('config');
const config = myConfig.get('Config');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.auth.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer')
};
class Auth {
  constructor() {
    let strategy = new Strategy(params, function(payload, done) {
      const user = payload;
      if (user) {
        return done(null, user);
      } else {
        return done(new Error('User not found'), null);
      }
    });
    passport.use(strategy);
  }
  initialize() {
    return passport.initialize();
  }
  authenticate() {
    return passport.authenticate('jwt', config.auth.jwtSession);
  }
}

const jwt = new Auth();
module.exports = jwt;
