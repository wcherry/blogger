const express = require('express'),
	app = express(),
	session = require("express-session"),
    bodyParser = require("body-parser"),
	passport = require('passport'),
	flash = require("connect-flash"),
	//LocalStrategy = require('passport-local').Strategy,
	users = require('./user'),
	posts = require('./post'),
	port = process.env.SERVER_PORT || 3000

app.use(express.static("public"));
app.use(session({ secret: "cats boxing" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/users", users);
app.use("/api/posts", posts);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))