// JavaScript Document

//node require
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require ('request');
var dotenv = require('dotenv');
var fs = require('fs');
var cmd=require('node-cmd');

//global variables
var command = process.argv[2];
var userVariable = process.argv[3];
var randomData = null;
var response = null;

//params
var tParams = {screen_name: 'devtechconnect', count: 20 };

//api key objects
//spotify
var spotify = new Spotify({
	id: keys.spotify.id, 
	secret: keys.spotify.secret,
});
//twitter
var client = new Twitter({
	consumer_key: keys.twitter.consumer_key, 
	consumer_secret: keys.twitter.consumer_secret, 
	access_token_key: keys.twitter.access_token_key, 
	access_token_secret: keys.twitter.access_token_secret,
});

//console.log(spotify);

//methods object
var methods = {
	
	//twitter method
	checkTweets: function() {
		client.get('statuses/user_timeline', tParams, function(error, tweets, response) {
			
			//if no error
			if (!error) {
				
				//response loop
				for (var i = 0; i < tweets.length; i++) {
					
					//response variables
					var createdAt = tweets[i].created_at;
					var created = createdAt.substr(0, 16);
					var tweet = tweets[i].text;
					
					//console log response
					console.log("============================================");
					console.log("Date: " + created);
					console.log("Tweet: " + tweet);
				};
			}
			//else return error
			else {
				console.log(error);
			}
		});
	},
	
	//spotify funtion
	songInfo: function() {
		if (userVariable === undefined) {
			userVariable = "The Sign";
		};
		
		spotify.search({ type: 'track', query: userVariable}, function(err, data) {
			//response variable based on user variale
			if (userVariable == "The Sign") {
				for (var n = 0; n <6; n++) {
					//ace of base version
					var response  = data.tracks.items[5];	
				};
			}
			else {
				for (var o = 0; o < 1; o++) {
					var response = data.tracks.items[o];
				};
			};
			
			//error handling
			if (err) {
				console.log('Error occured: ' + err);
				return;
			};
			
			//data loop
			for (var m = 0; m < 1; m++) {
				//variables
				var artist = response.artists[0].name;
				var song = response.name;
				var link = response.preview_url;
				var album = response.album.name;
				
				//console log response
				console.log("============================================");
				console.log("Artist: " + artist);
				console.log("Song Title: " + song);
				console.log("Preview link: " + link);
				console.log("Album: " + album);
			};			
		})
	},
	
	//omdb method
	movieInfo: function() {
		
		//if no user input regarding movie title
		if (userVariable === undefined) {
			console.log("============================================");
			console.log("If you haven't watched 'Mr. Nobody,' you should: <http://www.imdb.com/title/tt0485947/>");
			console.log("It's on Netflix!");
			userVariable = "Mr. Nobody";
		};
		
		//omdb request
		request("http://www.omdbapi.com/?t=" + userVariable + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
			
			//if no error
  			if (!error && response.statusCode === 200) {
				
				//response variables
				var title = JSON.parse(body).Title;
				var release = JSON.parse(body).Year;
				var imdbRating = JSON.parse(body).imdbRating;
				var ratings = JSON.parse(body).Ratings;
				var country = JSON.parse(body).Country;
				var language = JSON.parse(body).Language;
				var plot = JSON.parse(body).Plot;
				var actors = JSON.parse(body).Actors;
				
				//console log response
				console.log("============================================");
				console.log("Title: " + title);
				console.log("Release Year: " + release);
				console.log("IMDB Rating: " + imdbRating);
				
				//Rotten Tomatoes rating loop
				for (var j = 0; j < ratings.length; j++) {
					if (ratings[j].Source === 'Rotten Tomatoes') {
						var rottenIndex = j;
						console.log("Rotten Tomatoes Rating: " + ratings[rottenIndex].Value);
					};
				};
				console.log("Produced In: " + country);
				console.log("Language: " + language);
				console.log("Plot: " + plot);
				console.log("Actors: " + actors);
				console.log("============================================");
  			} 
			//else console.log error
			else {
				console.log(error);
			};
		});
	},
	
	//read random text method
	randomText: function() {
		fs.readFile("random.txt", "utf8", function(err, data) {
			
			//error handling
			if (err) {
				console.log(err);
			};
			
			//global variable update
			randomData = data;
			
			//console log response
			console.log(randomData);
			
			//run node liri.js based on text in random.txt
			cmd.get('node liri.js ' + randomData, function(err, data) {
				if (err) {
					console.log(err);
				};
				console.log(data);
			});
		});
	}
};

//switch statement to update command global variable and call method
switch (command) {
	case 'my-tweets':
		methods.checkTweets();
		break;
	case 'spotify-this-song':
		methods.songInfo();
		break;
	case 'movie-this':
		methods.movieInfo();
		break;
	case 'do-what-it-says':
		methods.randomText();
		break;
};




