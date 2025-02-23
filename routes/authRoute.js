const express = require('express');
//const axios = require('axios');
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


/*router.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.LOCAL_CLIENT_ID,
            client_secret: process.env.LOCAL_SECRET,
            code: code
        }, {
            headers: { Accept: 'application/json' }
        });

        const accessToken = response.data.access_token;
        res.json({ access_token: accessToken });

    } catch (error) {
        res.status(500).json({ message: "OAuth authentication failed" });
    }
});*/

// Logout
/*router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ message: "Logged out successfully" });
    });
});*/
router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
  
      req.session.destroy(() => {
        res.clearCookie('connect.sid'); // Clear session cookie
        res.redirect('/'); // Redirect to homepage or login page
      });
    });
  });
  

module.exports = router;
