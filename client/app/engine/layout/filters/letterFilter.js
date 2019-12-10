(function() {

    'use strict';

    angular
        .module('app.engine.layout')
        .filter('letterFilter', function() {
            return function(type, list, needle) {
                var output = [];

                if(needle === 'reset') {
                    output = list;
                } else {
                    for (var i = 0; i < list.length; i++) {

                        switch(type) {
                            case 'users':
                                //user has lastname field to filter model
                                if(list[i].lastname.charAt(0).toLowerCase() === needle.toLowerCase()) {
                                    output.push(list[i]);
                                }
                                break;
                            case 'roles': case 'features': case 'servers': case 'nodes':
                                //all has name field to filter model
                                if(list[i].name.charAt(0).toLowerCase() === needle.toLowerCase()) {
                                    output.push(list[i]);
                                }
                                break;
                        }


                    }
                }

                return output;
            }
        });

})();

