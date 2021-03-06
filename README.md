Node3p-web
===============

Node3p is a tool for downloading files from AmazonMP3. Because you don't always download you files from home, it's nice to be able to save your music to your main music computer. This allows you to upload an AMZ file. The tool will then parse that file and proceed to download the files you've specified. While there are other ways to do this, the web interface is purely a convenience tool.

Enjoy.


How to Use It
===============

* Install NodeJS
* Install the required libs
** From source, just clone this project
*** Update the submodules
**** From the CLI, `git submodule update --init --recursive`
*** Type `npm install` from the cloned directory 
** From npm, type `npm install node3p`
* Get and install couchapp (python OMGWTF?!?)
** Jump into the couchapp directory and push the designs into your couchdb (wherever that may be).
* Run `node3p-web` from the CLI
* Buy some tunes
* Open the web interface
* Upload
* Profit


Configuration
==============

The server works with a configuration file that is to be located at `/usr/local/etc/node3p-web/config.js`. The config file uses the regular exports syntax. The options are as follows:

* downloadLocation: the path to download your files to. if preceeded by a ~ the users home directory will be used.
* logPath: Path for the apache style logs to be written. all else is stdout for now...tho this will change at some point.
* couchConfig: Json object representing couchdb configurations.
** host: CouchDB hostname
** port: CouchDB port
* there are no other options right now. :)


Alpha Warning
==============

This is completely in alpha stages. The data downloads but the code is complete and utter crap. You'll likely want to look at it like you look at an eclipse or your eyeballs may melt. Assuming you are crazy enough to try this, please throw bugs at me like you might a can of Redbull and I'll try my best to hammer through them. Also, patches are very welcome.


Browser Support
==============

Browsers that run Canvas (for the MooFlow).

I run Linux. I don't test everything. But, if you'd like something to be working I will take pull requests, patches or bugs. Feel free to submit them.


Dependencies
==============

* npm install [node3p](http://github.com/ncb000gt/node3p/)
* npm install [connect](http://github.com/senchalabs/connect/)
* npm install [spark](http://github.com/senchalabs/spark/)
* npm install [jade](http://github.com/senchalabs/spark/)
* npm install [formidable](http://github.com/senchalabs/spark/)
* CouchDB
** I wanted to be able to store the data on what was being downloaded. SO, I looked to CouchDB to provide the storage. Good speed, easy-ish setup (specially with couchone) and provides the required functionality.
* npm install [couchdb](http://github.com/felixge/node-couchdb/)


Special Thanks
==============

To Amazon. The service is fantastic.

In the 0.2.0 version, I made use of [MooFlow](http://www.outcut.de/MooFlow/) which is a JS/Canvas based coverflow library. It works beautifully and I didn't write it so I want to give credit where it's due. Be sure to take a look at it. With this, we can show a coverflow of the latest downloads and the images. Yay eyecandy! ;D


Disclaimer
==============

Right now there is very little error handling and upload validation. This will be coming, but I am not responsible for someone uploading files that could destroy your system. I do love patches and pull requests so if you are able to hack it in before I can, go for it!


License and Attribution
===============

Cover images are provided by [Amazon](http://www.amazon.com/)
MooFlow is from [Outcut](http://www.outcut.de/)
ReMooz is from [Digitarald](http://digitarald.de/projects/)

MIT unless otherwise stated (see LICENSE file for more)


Trademarks?
============

Node.js™ is an official trademark of Joyent. This module is not formally related to or endorsed by the official Joyent Node.js open source or commercial project