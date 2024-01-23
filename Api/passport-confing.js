import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {prisma} from './Config/prismaConfig.js'


passport.use(
  new GoogleStrategy(
    {
      clientID: "936099558670-2fvsa6824ckrgu412fgbu86s0hm6g82a.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: 'http://localhost:8000/api/user/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("I am here")
// console.log(profile , "Profile ")
console.log(profile.photos[0]?.value ,"photo")
console.log(profile._json.picture , "profile photo")
      try {
        // Checking if the user already exists  database
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.emails[0]?.value },
        });

        if (existingUser) {
          // If the user exists, return the user data
          return done(null, existingUser);
        } else {
          // If the user doesn't exist, create a new user in your database
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails[0]?.value,
              image: profile.photos[0]?.value ,
              password: 'temporary-password'
            },
          });

          // Return the newly created user data
          return done(null, newUser);
        }
      } catch (error) {
        console.error('Error in Google strategy callback:', error);
        return done(error, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    const userId = user.id; // Assuming your user object has an 'id' property

    const foundUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    done(null, foundUser || null);
  } catch (error) {
    done(error, null);
  }
});


// Rest of your Google strategy setup comes here
// ...

export default passport;



