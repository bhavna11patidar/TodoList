const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys=require('./keys');
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({
        email: email,
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { "error_msg": "no user found" });
          } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { "error_msg": "Password not matched" });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        //console.log(user);
      done(err, user);
    });
  });
};

/*
module.exports=function (passport){
  passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile);
    User.findOne({googleId:profile.id}).
    then((user)=>{
      if(user){
        done(null,user)
      }else{
        const newUser={
          googleId:profile.id,
          name:profile.displayName,
          email:profile.emails[0].value,
          password:"1234",   
        }
        new User(newUser).save()
        .then(user=>{
          done(null,user)
        })
        .catch(err=>{
          console.log(err);
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
      //console.log(user);
    done(err, user);
  });
});

}
*/
