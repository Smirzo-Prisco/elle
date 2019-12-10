# Change Log
All notable changes to this project will be documented in this file.
- From 0.0.1 to 0.0.100 -> Seed development
#### [0.0.20] - (2016-11-16 - 2016-10-01)
##### Added and Fix
- Deleted rbac.roles.owner from features model
- Deleted rbac.roles.owner from features mock-dev and mock-prod
- Evo TODO.md
- Enforced control over Rbac FEND user,role and feature
- DELETE DB for a new re-populate !!!
- GetMaxPermissions Functions
- RbacWriters API Functions
- FEND always better about Rbac
- DELETE DB for a new re-populate !!!
- Api UserVsObject thanks to Lulù for explanations
- Api RoleVsObject thanks to Lulù for explanations
- Api ObjectVsUser/Role thanks to Lulù for explanations
- MockData for Production version
- Gulp Revamped thanks to Marcus for his eagle eye :)
- Function for getMaxPerms (First Steps)
- DELETE DB for a new re-populate !!!
- Enforced Mongoose Promise NodeJs no more Deprecated
- Better user mockData
- Better feature mockData
- Created a rbacCommons functions
- Completed getPermissions UserVsObject
- Started getPermissions RoleVsObject
- Revamp Feature Mock Data
- Created Menu Model, Controller, Routes and socket
- Created Menu Mock
- Api GET Menu
- FEND Evo Rendering for Users, Roles and Features
- Added _id for currentUser after first login
- Reinforced getSingleUser & updateUser 
- Mock revamp MockLoader
- Reinforced activeUser
- Reinforced deleting on Admin role with special:true
- Reinforced deleting on User when the user is yourself
- Reinforced deactivating on User when the user is yourself
- Revamp Hashing password system via Crypto
- User POST -> ok
- User PUT -> ok
- User DELETE -> ok
- User delete with logical effect (deleted: true)
- Filtered GET users with deleted: false
- Created PATCHing on 'active' property -> {"active": "true/false"}
- Revamped passport Strategies for user 'active' control on login
- Evo mocking First Steps
- Revamp err callback from user
- Revamp err callback from role
- Revamp err callback from feature
- Revamp err callback from passport
- PUT on Features
- PUT on Roles
- PUT on Users
- DELETE Verb for Feature
- Revamp CHANGELOG
- DELETE Verb for Role
- Revamped User Model and User API for POST verb
- Revamped Role Model and Role API for POST verb
- Revamped Feature Model and Feature API for POST verb
- Revamped Fend User
- Revamped Fend Role
- Revamped Fend Feature
- Purged TODO Module via Bend
- Added user insert operation on fend (via ajax request)
- Socket emit newUser action with toaster info
- Fix on IE issue for caching GET ajax request
- Added Bend API join User/Role
- Added Fend join User/Role function
- Revamp GET Verb for users, roles and feature
- Revamp GET Single Verb for users, roles and feature
- Fend Fixed joinUserRole view for dualBind
- User POST revamped
- Changed to code 400 for bad request
- Edited User Schema via Mongoose
- Evo mockData for Users
- Edited Role Schema via Mongoose
- Evo mockData for Roles
- Revamped User View
- Revamped Role View
- Created in-TOTO user-role reference
- Created in-TOTO userForm for an intense CRUD
- Created in-TOTO roleForm for an intense CRUD
#### [Unreleased]
##### Added
- Just thinking about a legendary app!

[Unreleased]: http://www.easyweb.it
[0.0.20]: https://bitbucket.org/easywebsrl/centralapp/src/7f08dc36c6bc96dfe8d891c976185297db818e5b/README.md?at=master&fileviewer=file-view-default