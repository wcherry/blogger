const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const sql = require("./db.js");
const md5 = require('md5');

passport.use(new LocalStrategy(
  async function(username, password, done) {
	  try{
		const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!validPassword(user.password, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
		} catch(err){
			return done(err);
		}
	}
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) { 
	findUser(id).then(user => {
		done(null, user);
		
	}).catch(err => {
		done(err, null);
	})
});

function validPassword(dbPassword, password){
	return dbPassword === md5(password);
}

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

async function findUserByUsername(username) {
	const users = await sql.query("SELECT * FROM users WHERE username = ?", username);
	if(users && Array.isArray(users) && users.length > 0){
		return users[0];
	} 
	return null;
}

async function findUser(id) {
	return await sql.query("SELECT * FROM users WHERE id = ?", id);
}

module.exports = router;