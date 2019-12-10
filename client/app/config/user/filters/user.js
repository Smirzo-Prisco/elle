(function() {

    'use strict';

    angular
        .module('app.config.user')
        .filter('userLetterFilter', function() {
            return function(list, needle) {
                var output = [];

                if(needle === 'reset') {
                    output = list;
                } else {
                    for (var i = 0; i < list.length; i++) {
                        if(list[i].lastname.charAt(0).toLowerCase() === needle.toLowerCase()) {
                            output.push(list[i]);
                        }
                    }
                }
                return output;
            }
        });
})();