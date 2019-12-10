(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('checkPermission', checkPermission);

    checkPermission.$inject = ['$rootScope'];

    /**
     * checkPermission
     */
    function checkPermission($rootScope) {

        return {
            restrict : 'A',
            link : function(scope, elem, attr) {

                //Retrieve its current val of current feature
                var currentVal = $rootScope.$state.current.val;
                var isForm = attr.modal || false;

                if(attr.view == 'user' || attr.view === 'role' || attr.view === 'feature') {
                    //GET button of action for user/role view
                    switch(currentVal) {
                        case 100: case 200:
                            //HIDE REMOVE, PERMS, MANAGE button
                            $(elem).children('*[data-action=remove]').hide();
                            $(elem).children('*[data-action=join]').hide();
                            $(elem).children('*[data-action=perms]').hide();
                            $(elem).children('*[data-action=manage]').hide();
                            //CHANGE EDIT ICON TO SERACH ICON
                            $(elem).children('*[data-action=edit]').children('i').removeClass('fa-edit').addClass('fa-search');
                            if(isForm) {
                                //IF FORM EDITING DISABLE EDIT BUTTON AND SET DISABLE ALL INPUT FIELD
                                $(elem).children().find('input').attr('disabled', 'disabled');
                                $(elem).children().find('*[data-action=edit]').hide();
                            }
                            break;
                        default:
                            break;
                    }
                }

            }
        };

    }

})();
