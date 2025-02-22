const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.LOCAL_CLIENT_ID,
    clientSecret: process.env.LOCAL_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    // Here, check if the user exists in your database
    // If not, create a new user with profile info
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
