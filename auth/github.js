const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const dotenv = require('dotenv');
const user = require('../controllers/userCont');
dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.LOCAL_CLIENT_ID,
    clientSecret: process.env.LOCAL_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    // Here, check if the user exists in your database
    // If not, create a new user with profile info
    //console.log("Profile: ", profile);
    const existingUser = await user.getUserByGithubId(profile.id);
    if (existingUser) {
        return done(null, existingUser);
    }
    // Create a new user in the database
    const newUser = {
        username: profile.username,
        email: profile.email,
        github_id: profile.id,
        profile_url: profile.profileUrl,
        avatar_url: profile._json.avatar_url,
        created_at: new Date(),
        password: null, // Password is not needed for OAuth users
    };
    await user.createGitUser(newUser);
    // Return the new user
    done(null, newUser);
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
