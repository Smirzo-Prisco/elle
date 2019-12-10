(function() {

    'use strict';

    angular
        .module('app.engine.core')
        .controller('LangController', LangController);

    LangController.$inject = ['$translate'];

    function LangController($translate) {
        var vm = this;

        // angular translate
        // ----------------------
        vm.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'it_IT': 'Italiano',
                'de_DE': 'Deutsch'
            },
            // display always the current ui language
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                // we know we have set a preferred one in app.config
                vm.language.selected = vm.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId, ev) {
                $translate.use(localeId);
                vm.language.selected = vm.language.available[localeId];
                vm.language.listIsOpen = !vm.language.listIsOpen;
            }
        };
        vm.language.init();
    }
})();