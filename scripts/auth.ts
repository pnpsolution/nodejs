import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as myConfig from 'config';

let config: any = myConfig.get('Config');
const ExtractJwt = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: config.auth.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

class Auth {
  constructor () {
    let strategy = new Strategy(params, function (payload, done) {
      const user = payload;
      if (user) {
        return done(null, user);
      } else {
        return done(new Error('User not found'), null);
      }
    });
    passport.use(strategy);
  }

  initialize (): any {
    return passport.initialize();
  }

  authenticate (): any {
    return passport.authenticate('jwt', config.auth.jwtSession);
  }
}
const jwt = new Auth();
export = jwt;