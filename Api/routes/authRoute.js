import passport from '../passport-confing.js';
import pkg from 'jsonwebtoken'
import express from 'express'

const {sign} = pkg

const router = express.Router()

export const googleCallback = (req, res, next) => {
    passport.authenticate('google', {
      failureRedirect: 'https://urban-haven-lilac.vercel.app/login',
    })(req, res, next);
  };
  
  export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });


router.get('/user/auth/google', googleAuth);

  // Handling the result of Google authentication
  router.get(
    '/user/auth/google/callback',
    passport.authenticate('google', { failureRedirect: 'https://urban-haven-lilac.vercel.app/login' }),
    (req, res) => {
      // Extract relevant user data
      const { username, email, image, id } = req.user;
console.log(req.user , "user login")  
      console.log(image , "profile pic")
      // Create sanitized user object
      const tokenObject = {
        id,
        name: username,
        email,
        image: image,
        auth: 'google Auth',
      };
  
      const token = sign(tokenObject, process.env.SECRET, { expiresIn: '6h' });
  
      // Redirect to the home page with sanitized user data in query parameters
      const userData = JSON.stringify({ token, tokenObject });
      res.redirect(`https://urban-haven-lilac.vercel.app?user=${encodeURIComponent(userData)}`);
    }
  );
  
  export default router;
