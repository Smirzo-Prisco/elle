var Menu = require('mongoose').model('Menu');
var common = {};

require('./../../common.module/controllers/common.js')(common);

// GET list Menu
exports.read = function(req, res) {
    Menu.find({})
        .select()
        .sort({ order : 'desc'})
        .populate([{path: 'item', select: 'name i18n sref rbac'}])
        .exec(function(err, menus) {
            if (err) {
                return res.status(500).json({'message': err.message});
            } else {
                //Calculate the permission for the menu functions
                var menuWithPermissions = getMaxPerms(req.user, menus, false);
                // Build the tree from the array
                var tree = common.buidTreeFromArray(menuWithPermissions);
                return res.status(200).json({ 'menus': tree});
            }
        });
};

var Mongoose = require('mongoose');
var User = Mongoose.model('User');

function getMaxPerms(whoAmI, ghostObjects, withValueZero) {
    var _userData = getUserData(whoAmI); //User Info (_id and array[roles])
    var personalData = {
        objectResponse: {},
        dataResponse: []
    };

    //2. Let's cycle ghostObjects in input (MAIN CYCLE)
    ghostObjects.forEach( function(object, index) {
        //3. Once founded the ghost document let's analyze his rbac with whoAmI
        var maxRbac = checkUserRbac(_userData, object, withValueZero);
        /////
        // sends objects with perms-value = 0
        if(withValueZero){
            personalData.objectResponse = object.toObject();
            delete personalData.objectResponse.item.rbac;
            personalData.objectResponse.value = maxRbac.value;
            personalData.objectResponse.owner = maxRbac.owner;
            personalData.dataResponse.push(personalData.objectResponse);
        }
        // Don't send objects with perms-value = 0
        else if (maxRbac.value > 0) {
            personalData.objectResponse = object.toObject();
            delete personalData.objectResponse.rbac;
            personalData.objectResponse.value = maxRbac.value;
            personalData.objectResponse.owner = maxRbac.owner;
            personalData.dataResponse.push(personalData.objectResponse);
        }
    });
    return personalData.dataResponse;
};

// Getting userData
function getUserData (whoAmI) {
    var userData = {
        'userId' : whoAmI._id,
        'userRoles' : whoAmI.roles
    };
    return userData;
}

// Check rbac.users
function checkUserRbac(userData, element, withValueZero) {
    // seleziono l'elemento esatto
    // a seconda che derivi da un albero o no
    var ghostObject = element;

    if(withValueZero){
        ghostObject = element.item;
    }

    var ghostRbacUsers = ghostObject.rbac.users;
    var userId = userData.userId;
    var userRbacResponse = {};

    userRbacResponse.value = 0;
    userRbacResponse.owner = false;

    for (var x = 0; x < ghostRbacUsers.length; x++) {
        if (userId == ghostRbacUsers[x]._actor.toString()) {
            userRbacResponse.value = ghostRbacUsers[x].value;
            userRbacResponse.owner = ghostRbacUsers[x].owner;
            break;
        }
    }
    return userRbacResponse;
}