# cassybot
Team Software Project 3's Discord Casino Bot

--------Dependency versions (MAKE SURE YOU ARE UP TO DATE WITH REPO!!!)--------

Node.js - 11.10
Discord.js - 11.4.2
Better SQlite3 - 5.4.0


--------How to run media play feature--------
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
