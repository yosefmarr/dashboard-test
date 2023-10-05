import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import Config from '../config/config.mjs';
import User from '../models/User.mjs';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Config.secret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id);
      if (!user) {
        throw new Error('User not found');
      }

      if (user.status !== 'active') {
        throw new Error('User not active');
      }

      return done(null, user);
    } catch (error) {
      return done(new Error('Unauthorized'), false);
    }
  })
);

const requireAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default requireAuth;
