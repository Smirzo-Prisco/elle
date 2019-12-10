# Change Log
All notable changes to this project will be documented in this file.
- From 0.0.1 to 0.0.100 -> Seed development
#### [0.0.30] - (2017-01-04)
##### Fixed - Added
- FEND: resolved 401 error code on starting application
- FEND: resolved 404 error for avatar image on logout
- FEND: Added some comments in various point of sources
#### [0.0.29] - (2016-12-14)
##### Added
- BEND: Evolved pg.common for supporting pg-promise requests
- BEND: Extended routing for getting dataConnectionDb via mongoose
- BEND: Completed example for getting data via pg-promise
#### [0.0.28] - (2016-12-13)
##### Added
- BEND: A better modeling for Server Schema
- BEND: A better mockData for Server Collection
- BEND: A GET route for example
- BEND: A base scaffolding for exampleModule
- Added marcoAvatar loss :D
- Added app_data in gitIgnore
- Starting Scaffolding for configFolder PG
- Created a standAlone routerLoader only for PostgreSql
- Created a standAlone socketLoaderLoader only for PostgreSql
- Installer pg-promise lib via npm 
#### [0.0.27] - (2016-12-12)
##### Added
- BEND: Evo for uploadAvatar via Multer Lib (1°Step)
- FEND: Evo for uploadAvatar via ngCrop (1°Step)
- FEND: View, Controller for uploadAvatar
#### [0.0.26] - (2016-12-06)
##### Added
- BEND: new module appData to provide application data info to client
- FEND: getting application data from the new API /api/appdata
- FEND: moved inside CoreService all function regarding getting saving and deleting application infos / user data and feature allowed
#### [0.0.25] - (2016-12-02)
##### Added
- FEND Base scaffold for
    - Server
    - Monitoring
    - AssetNode
    - AssetBuilder
- Server Function first Steps (GET VERB :))
#### [0.0.24] - (2016-11-29)
##### Added
- Tested over NodeJs 6.9.x
- Revamped libs version on package.json for 6 months gap
- Changed favicon served from Server
- Fixed Karma config file
#### [0.0.23] - (2016-11-23)
##### Added
- Val on each feature
- Check val on state
- New directive to check permission
- User/role/feature needs val 300 to perform any operation on the view (with val 100/200 only read)
- Mock Data
    - New Feature for networking and asset
    - New Menu
#### [0.0.22] - (2016-11-22)
##### Added
- Better code serverSide via Gulp Analyze
- BEND Server Function (I°Step)
    - Revamp the model
    - Revamp Mock Data
    - Created API POST verb
    - Created API PUT verb
    - Created API DELETE verb
    - Created API PATCH verb
- RBAC Main Function (I°Step)
    - API Get collectionAvailable
    - Ready for FEND section
- Role function enforced 'DELETE' Verb
    - Delete not possible with special: true
- JoinUserRole better code for external function calling
- BEND assetNodes - skeletonBase, model, ctrl, route
#### [0.0.21] - (2016-11-17)
##### Added
- Revamped MD Files
- Created a buildTree Function
- Created a getMaxPermission Function
#### [Unreleased]
##### Added
- Just thinking about a legendary app!

[Unreleased]: http://www.easyweb.it
[0.0.29]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.28]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.27]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.26]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.25]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.24]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.23]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.22]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default
[0.0.21]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default