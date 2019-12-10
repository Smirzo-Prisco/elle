###Seed - AngularJs, NodeJs, Express, MongoDB and PostgrSQL

#### Quick Install

- Install Node (>=6.1.0) ->(used 6.9.1)
	- on OSX install [home brew](http://brew.sh/) and type `brew install node`
	- on Windows install [chocolatey](https://chocolatey.org/) and type `choco install nodejs`
- On OSX you can alleviate the need to run as sudo by [following these instructions](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md). I highly recommend this step on OSX
- Open terminal
- Type `npm install -g bower gulp karma-cli grunt-cli nodemon jshint`
    - Use `sudo` prefix for admin permission
    
- MongoDB
    - Install mongo via Home Brew via Mac. Or install on Windows using from MongoDB web site instructions.
    - brew update (used 1.1.2 on MAC)
    - brew install or update mongodb
        - otherwise brew upgrade mongodb 
    - StartUp the service `IMPORTANT`
        - For Example: mongod --dbpath data/db/
    - Actual MongoDB version used 3.2.11
    
- Postgres
    - Install PostgreSql - [pgSql website](https://www.postgresql.org/download/)
        - Set user login:postgres and psw:sqltestNC10!
        - Be sure to create mxADV db via superDump
        - Be sure to create mxHIST db via superDump
        - Be sure to grant postgres user over those DBs.
        
- Routes
    - For MongoDb -> /api/
    - For PostgreSql -> /api/pg/
        
#### Quick App Install

- npm install
    - bower install (auto run after npm install)
        - gulp [default] (auto run after bower install)

#### Gulp Tasks

- `gulp [default]` -> Nodemon Server over port 8000
    -  node ./src/server/server[.js] [enviroment]
        - [enviroment] -> ['development', 'build', 'production']
    - npm start [enviroment] [port]
        - [enviroment] -> ['development', 'build', 'production']
- `gulp help` -> Listing Gulp Task and SubTask
- `gulp analyze` -> Lint the code, create coverage report, and a visualizer PLATO
- `gulp templatecache` -> Creating an AngularJS $templateCache for the build version
- `gulp js` -> Bundling, minifying, and copying the app\'s JavaScript
- `gulp vendorjs` -> Bundling, minifying, and copying the Vendor JavaScript
- `gulp css` -> Bundling, minifying, and copying the app\'s CSS
- `gulp vendorcss` -> Compressing, bundling, copying vendor CSS
- `gulp fonts` -> Copying fonts
- `gulp images` -> Compressing, caching, and copying images
- `gulp test` -> Run specs once and exit
- `gulp autotest` -> Run specs and wait
- `gulp rev-inj` -> Revisioning and Injecting into Html during the building
- `gulp build` -> Use this to build your app
- `gulp clean` -> Cleaning build directory
- `gulp serve-development` -> Serve the dev environment
- `gulp serve-production` -> Serve the prod environment
- PLEASE DO NOT USE OTHER TASKS