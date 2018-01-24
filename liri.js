// JavaScript Document
//node require
require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require ('request');
var dotenv = require('dotenv');
//global variables
var command = process.argv[2];

//params
var tParams = {screen_name: 'devtechconnect'};
//constructor functions
function Spotify(id, secret) {
	this.id = id;
	this.secret = secret
};
//api keys
var spotify = new Spotify(keys.spotify.id, keys.spotify.secret);
var client = new Twitter({
	consumer_key: keys.twitter.consumer_key, 
	consumer_secret: keys.twitter.consumer_secret, 
	access_token_key: keys.twitter.access_token_key, 
	access_token_secret: keys.twitter.access_token_secret
});

//console.log(spotify);
//console.log(client);
var methods = {
	checkTweets: function() {
		client.get('statuses/user_timeline', { screen_name: 'devtechconnect', count: 20 }, function(error, tweets, response) {
			if (!error) {
				for (var i = 0; i < tweets.length; i++) {
					console.log(tweets[i].text);
				};
			}
			else {
				console.log(error);
			}
		});
	},
	songInfo: function() {},
	movieInfo: function() {},
	randomEntry: function() {},
	
}

//print last 20 tweets
if (command == 'my-tweets') {
	methods.checkTweets();
};

