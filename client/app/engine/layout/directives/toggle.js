(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('ctToggle', ctToggle)
        .directive('toggleable', toggleable);

    ctToggle.$inject = ['$rootScope', 'ToggleHelper'];
    toggleable.$inject = ['$rootScope', 'ToggleHelper'];

    /**
     * ctToggle
     */
    function ctToggle($rootScope, ToggleHelper) {

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var command = attrs.ctToggle || ToggleHelper.commands.alternate;
                var target = attrs.target;
                var targetClass = attrs.targetClass;
                var bubble = attrs.bubble === 'true' ||
                            attrs.bubble === '1' ||
                            attrs.bubble === 1 ||
                            attrs.bubble === '' ||
                            attrs.bubble === 'bubble';

                if ((!target) && attrs.href) {
                    target = attrs.href.slice(1);
                }

                if (!(target || targetClass)) {
                    throw '\'target\' or \'target-class\' attribute required with \'ct-toggle\'';
                }
                elem.on('click tap', function (e) {

                    var angularElem = angular.element(e.target);
                    if (!angularElem.hasClass('disabled')) {
                        if (target != null) {
                            ToggleHelper.toggle(target, command);
                        }
                        if (targetClass != null) {
                            ToggleHelper.toggleByClass(targetClass, command);
                        }
                        if (!bubble) {
                            e.preventDefault();
                            return false;
                        } else {
                            return true;
                        }
                    }

                });
                var unbindUpdateElemClasses = $rootScope.$on(ToggleHelper.events.toggleableToggled,
                    function (e, id, newState) {
                        if (id === target) {
                            ToggleHelper.updateElemClasses(elem, attrs, newState);
                        }
                    });

                if (target != null) {
                    $rootScope.$emit(ToggleHelper.events.togglerLinked, target);
                }

                scope.$on('$destroy', unbindUpdateElemClasses);
            }
        };

    }

    /**
     * toggleable
     */
    function toggleable($rootScope, ToggleHelper) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var toggleState = false;

                if (attrs['default']) {
                    switch (attrs['default']) {
                        case 'active':
                            toggleState = true;
                            break;
                        case 'inactive':
                            toggleState = false;
                    }
                    ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
                }

                var unbindToggle = $rootScope.$on(ToggleHelper.events.toggle, function (e, target, command) {
                    var oldState;
                    if (target === attrs.id) {
                        oldState = toggleState;
                        toggleState = ToggleHelper.applyCommand(command, oldState);
                        if (oldState !== toggleState) {
                            ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
                        }
                    }
                });

                var unbindToggleByClass = $rootScope.$on(ToggleHelper.events.toggleByClass,
                    function (e, targetClass, command) {
                        var oldState;
                        if (elem.hasClass(targetClass)) {
                            oldState = toggleState;
                            toggleState = ToggleHelper.applyCommand(command, oldState);
                            if (oldState !== toggleState) {
                                ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
                            }
                        }
                    });

                var unbindToggleableToggled = $rootScope.$on(ToggleHelper.events.toggleableToggled,
                    function (e, target, newState, sameGroup) {
                        if (newState && (attrs.id !== target) &&
                            (attrs.exclusionGroup === sameGroup) &&
                            (attrs.exclusionGroup != null)) {
                            toggleState = false;
                            ToggleHelper.toggleStateChanged(elem, attrs, toggleState);
                        }
                    });

                var unbindTogglerLinked = $rootScope.$on(ToggleHelper.events.togglerLinked, function (e, target) {
                    if (attrs.id === target) {
                        ToggleHelper.notifyToggleState(elem, attrs, toggleState);
                    }
                });

                scope.$on('$destroy', function () {
                    unbindToggle();
                    unbindToggleByClass();
                    unbindToggleableToggled();
                    unbindTogglerLinked();
                });
            }
        };
    }

})();