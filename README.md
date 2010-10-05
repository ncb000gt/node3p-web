Node3p-web
===============

Node3p is a tool for downloading files from AmazonMP3. Because you don't always download you files from home, it's nice to be able to save your music to your main music computer. This allows you to upload an AMZ file. The tool will then parse that file and proceed to download the files you've specified. While there are other ways to do this, the web interface is purely a convenience tool.

Enjoy.


How to Use It
===============

* Install NodeJS
* Install the required libs
** From source, just clone this and type `npm install` from the cloned directory 
** From npm, type `npm install node3p` 
* Run `node3p-web` from the CLI
* Buy some tunes
* Open the web interface
* Upload
* Profit


Configuration
==============

The server works with a configuration file that is to be located at `/usr/local/etc/node3p-web/config.js`. The config file uses the regular exports syntax. The options are as follows:
* downloadLocation: the path to download your files to. if preceeded by a ~ the users home directory will be used.
* there are no other options right now. :)

Alpha Warning
==============

This is completely in alpha stages. The data downloads but the code is complete and utter crap. You'll likely want to look at it like you look at an eclipse or your eyeballs may melt. Assuming you are crazy enough to try this, please throw bugs at me like you might a can of Redbull and I'll try my best to hammer through them. Also, patches are very welcome.


Dependencies
==============

* npm install [node3p](http://github.com/ncb000gt/node3p/)
* npm install [connect](http://github.com/senchalabs/connect/)
* npm install [spark](http://github.com/senchalabs/spark/)
* npm install [jade](http://github.com/senchalabs/spark/)
* npm install [formidable](http://github.com/senchalabs/spark/)


Disclaimer
==============

Right now there is very little error handling and upload validation. This will be coming, but I am not responsible for someone uploading files that could destroy your system. I do love patches and pull requests so if you are able to hack it in before I can, go for it!


License
===============

see license file