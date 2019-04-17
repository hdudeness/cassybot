# Cassy The Casino Bot

Team Software Project 3's Discord Casino Bot:

CassyBot is a Discord bot being developed using Node.js, Discord.js, and Better SQL 3. Cassy can perform a few simple tasks which include playing music, flipping a coin, and assisting the user. In the future, Cassy will be able to join any server and provide the server with Casino Games! She will support the games: Blackjack, Roulette, and Slots! Contact us to learn more!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Installing Node.js:

```
1. Visit https://nodejs.org/en/ or https://nodejs.org/en/download/
2. Click on the 'Current' Download or click the 'Current' Tab within the download page
3. Run the file
4. After installation, close the terminal
5. Open the terminal and type 'node --version'
6. v11.12.0 should appear
7. If this is not the case contact Tyler
```

Installing node_modules:

```
1. npm install - installs all dependencies
2. Check for the node_modules folder
```
How to run media play feature:

```
1. Install FFmpeg https://github.com/adaptlearning/adapt_authoring/wiki/Installing-FFmpeg
2. Extract zip file to any accessable location and record the path to the bin folder. (i.e, C:\FFmpeg\bin)
3. Open CMD as administrator
4. Run the following command, inserting the path your previously took note of: 
	setx /M PATH "C:\YOUR-PATH-TO-BIN-HERE\FFmpeg\bin;%PATH%"
5. Run start.bat
6. In Discord, join any voice channel.
7. Test the bot by running the command "!play NAME-OF-ANY-SONG" without the quotations.
8. The bot should join the voice call and start playing the song (Make sure you have the bot's voice volume up).
9. If you have no errors in the terminal, you're all set.
```

### Installing

Step by step example on how to get your development environment running:

Step 1: Download Nodejs, Set Up a Discord Account, and Set Up FFMPEG

```
Download Nodejs at nodejs.org and install it (instructions above).
Create An Account at Discord.com.
Installing FFMPEG Instructions above.
```

Step 2: Create Your Test Bot

```
To create an application go to discordapp.com/developers/applications/me.
After logging in, click New Application.
Give the bot a name and click Save Changes.
Find your way to the right-hand menu and click Add Bot (it is found under Build-a-bot).
```

Step 3: Get Your Bot's Authorization Token

```
In the box marked App Bot User, look for Token: Click to reveal.
That is your bot's authorization token, DO NOT SHARE IT OR PUSH IT.
```

Step 4: Send Your Bot to Your Server

```
The final URL should look like this, but with your client ID number in it instead of this fake one:
https://discordapp.com/oauth2/authorize?&client_id=000000000000000001&scope=bot&permissions=8

Copy the URL with your client ID number in it into your browser.
```

Step 5: Set Up Your Editor and Begin!

```
Install an IDE to edit the JavaScript Files (Visual Studio Code is recommended).
Finally, go to ./cassybot/json/config.json.
Open the file and paste your personal token where it says token: "PASTE HERE"
```

Additional help and images can be found here: https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/

## Running the tests

To run automated tests for this system, simply run the !testsuite command.


## Deployment

Add additional notes about how to deploy this on a live system


## Built With -- Dependency Versions

* [Node.js](https://nodejs.org/en/) - 11.10 - The framework used
* [Discord.js](https://discord.js.org/#/) - 11.4.2 - Discord bot library 
* [Better SQlite3](https://github.com/JoshuaWise/better-sqlite3) - 5.4.0 - Database for currency system

## Contributing


## Versioning


## Authors

* **Tyler Marenger** - *Initial work* - [tjmareng](https://github.com/tjmareng)
* **Christian Clemmons** - *Initial work* - [ccclemmo](https://github.com/ccclemmo)
* **Harry Taylor** - *Initial work* - [hdudeness](https://github.com/hdudeness)
* **Colton Nelson** - *Initial work* - [nelcol31](https://github.com/nelcol31)
* **Joe Tressler** - *Initial work*
