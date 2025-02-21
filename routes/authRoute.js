const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/pets'); // Redirect to pets API after login
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out successfully" });
    });
});

module.exports = router;
