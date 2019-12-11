'use strict';

var session 	= require('express-session');
var MongoStore	= require('connect-mongo')(session);
var db 		    = require('../database');
var config 		= require('../config');

/**
 * Initialize Session
 * Uses MongoDB-based session store
 *
 */
var init = function () {

	console.log ("process.env.NODE_ENV" + process.env.NODE_ENV)
	
	if(true) {
		console.log('Used MongoStore');
		return session({
			secret: config.sessionSecret,
			resave: false,
			saveUninitialized: false,
			unset: 'destroy',
			cookie: {maxAge: 365 * 24 * 60 * 60 * 1000},
			store: new MongoStore({ mongooseConnection: db.Mongoose.connection })
		});
	} else {
		console.log('Not Used MongoStore');
		return session({
			secret: config.sessionSecret,
			resave: false,
			unset: 'destroy',
			saveUninitialized: true
		});
	}
}

module.exports = init();