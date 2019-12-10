(function() {

    'use strict';

    angular.module('app.engine.layout')
        .factory('ToggleHelper', ToggleHelper)
        .run(['$rootScope', 'ToggleHelper',
            function ($rootScope, ToggleHelper) {

                $rootScope.toggle = function (target, command) {
                    if (command == null) {
                        command = 'toggle';
                    }
                    ToggleHelper.toggle(target, command);
                };

                $rootScope.toggleByClass = function (targetClass, command) {
                    if (command == null) {
                        command = 'toggle';
                    }
                    ToggleHelper.toggleByClass(targetClass, command);
                };
            }]);

    ToggleHelper.$inject = ['$rootScope'];

    function ToggleHelper($rootScope) {
        return {

            events: {
                toggle: 'clip-two.toggle',
                toggleByClass: 'clip-two.toggleByClass',
                togglerLinked: 'clip-two.linked',
                toggleableToggled: 'clip-two.toggled'
            },

            commands: {
                alternate: 'toggle',
                activate: 'on',
                deactivate: 'off'
            },

            toggle: function (target, command) {
                if (command == null) {
                    command = 'toggle';
                }
                $rootScope.$emit(this.events.toggle, target, command);
            },

            toggleByClass: function (targetClass, command) {
                if (command == null) {
                    command = 'toggle';
                }
                $rootScope.$emit(this.events.toggleByClass, targetClass, command);
            },

            notifyToggleState: function (elem, attrs, toggleState) {
                $rootScope.$emit(this.events.toggleableToggled, attrs.id, toggleState, attrs.exclusionGroup);
            },

            toggleStateChanged: function (elem, attrs, toggleState) {
                this.updateElemClasses(elem, attrs, toggleState);
                this.notifyToggleState(elem, attrs, toggleState);
            },

            applyCommand: function (command, oldState) {
                switch (command) {
                    case this.commands.activate:
                        return true;
                    case this.commands.deactivate:
                        return false;
                    case this.commands.alternate:
                        return !oldState;
                }
            },

            updateElemClasses: function (elem, attrs, active) {
                var parent;
                if (active) {
                    if (attrs.activeClass) {
                        elem.addClass(attrs.activeClass);
                    }
                    if (attrs.inactiveClass) {
                        elem.removeClass(attrs.inactiveClass);
                    }
                    parent = elem.parent();
                    if (attrs.parentActiveClass) {
                        parent.addClass(attrs.parentActiveClass);
                    }
                    if (attrs.parentInactiveClass) {
                        parent.removeClass(attrs.parentInactiveClass);
                    }
                } else {
                    if (attrs.inactiveClass) {
                        elem.addClass(attrs.inactiveClass);
                    }
                    if (attrs.activeClass) {
                        elem.removeClass(attrs.activeClass);
                    }
                    parent = elem.parent();
                    if (attrs.parentInactiveClass) {
                        parent.addClass(attrs.parentInactiveClass);
                    }
                    if (attrs.parentActiveClass) {
                        parent.removeClass(attrs.parentActiveClass);
                    }
                }
            }
        };
    }

})();
