(function() {
    'use strict';

    var layout = angular.module('app.engine.layout', [
        'ngAnimate',
        'ngTouch',
        'ui.bootstrap',
        'swipe',
        'ngBootstrap',
        'truncate',
        'uiSwitch',
        'toaster',
        'ngAside',
        'vAccordion',
        'vButton',
        'oitozero.ngSweetAlert',
        'angular-notification-icons',
        'angular-ladda',
        'angularAwesomeSlider',
        'slickCarousel',
        'angular-loading-bar',
        'ncy-angular-breadcrumb',
        'duScroll',
        'pascalprecht.translate',
        'FBAngular',
        'ngNotify',
        'ui.knob',
        'xeditable',
        'wt.responsive'
    ]);

    layout.constant('APP_MEDIAQUERY', {
        'desktopXL': 1200,
        'desktop': 992,
        'tablet': 768,
        'mobile': 480
    });

    layout.run(['$rootScope', '$state', '$stateParams', 'CoreService',
        function ($rootScope, $state, $stateParams, CoreService) {

            // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event
            // on mobile browsers
            FastClick.attach(document.body);

            // GLOBAL APP SCOPE LAYOUT
            // set below basic information
            $rootScope.app = {
                name: '', // name of your project
                author: '', // author's name or company name
                description: '', // brief description
                version: '', // current version
                year: '', // application year
                isMobile: (function () {// true if the browser is a mobile device
                    var check = false;
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        check = true;
                    }
                    return check;
                })(),
                defaultLayout: {
                    isNavbarFixed: true, //true if you want to initialize the template with fixed header
                    isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                    isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                    isFooterFixed: false, // true if you want to initialize the template with fixed footer
                    isBoxedPage: false, // true if you want to initialize the template with boxed layout
                    theme: 'lyt5-theme-1', // indicate the theme chosen for your project
                    logo: 'assets/images/maximus_logo.png', // relative path of the project logo
                    logoCollapsed: 'assets/images/logo_maximus_collapsed.png' // relative path of the collapsed logo
                },
                layout: '',
                avatarPath: 'app_data/avatar/',
                currentUser: CoreService.getUserData(),
                features: []
            };
            CoreService.getApplicationData().then(function(response) {
                var appData = response.data.appdata;
                $rootScope.app.name = appData.name; // name of your project
                $rootScope.app.author = appData.author; // author of your project
                $rootScope.app.description = appData.description; // description of your project
                $rootScope.app.version = appData.version; // version of your project
                $rootScope.app.year = appData.year; // year of your project
            });
            $rootScope.app.layout = angular.copy($rootScope.app.defaultLayout);

        }]);

    // translate config
    layout.config(['$translateProvider',
        function ($translateProvider) {

            // prefix and suffix information  is required to specify a pattern
            // You can simply use the static-files loader with this pattern:
            $translateProvider.useStaticFilesLoader({
                prefix: 'assets/i18n/',
                suffix: '.json'
            });

            // Since you've now registered more then one translation table, angular-translate has to know which one
            // to use. This is where preferredLanguage(langKey) comes in.
            $translateProvider.preferredLanguage('en');

            // Store the language in the local storage
            $translateProvider.useLocalStorage();

            // Enable sanitize
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }
    ]);

    // Angular-Loading-Bar
    // configuration
    layout.config(['cfpLoadingBarProvider',
        function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeBar = true;
            cfpLoadingBarProvider.includeSpinner = false;

        }
    ]);
    // Angular-breadcrumb
    // configuration
    layout.config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            template: '<ul class="breadcrumb"><li><a ui-sref="app.dashboard">' +
            '<i class="fa fa-home margin-right-5 text-large text-dark"></i>Home</a></li>' +
            '<li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
        });
    });

    //Custom UI Bootstrap Calendar Popup Template
    /*layout.run(['$templateCache', function ($templateCache) {
        $templateCache.put('uib/template/datepickerPopup/popup.html',
            '<div>\n' +
            '  <ul class=\"uib-datepicker-popup clip-datepicker dropdown-menu\" dropdown-nested ng-if=\"isOpen\" ' +
            'ng-style=\"{top: position.top+\'px\', left: position.left+\'px\'}\" ng-keydown=\"keydown($event)\" ' +
            'ng-click=\"$event.stopPropagation()\">\n' +
            '    <li ng-transclude></li>\n' +
            '    <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n' +
            '    <span class=\"btn-group pull-left\">\n' +
            '      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-datepicker-current\" ' +
            'ng-click=\"select(\'today\', $event)\" ng-disabled=\"isDisabled(\'today\')\">{{ getText(\'current\') }}' +
            '</button>\n' +
            '      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-clear\" ' +
            'ng-click=\"select(null, $event)\">{{ getText(\'clear\') }}</button>\n' +
            '    </span>\n' +
            '      <button type=\"button\" class=\"btn btn-sm btn-primary pull-right uib-close\" ' +
            'ng-click=\"close($event)\">{{ getText(\'close\') }}</button>\n' +
            '    </li>\n' +
            '  </ul>\n' +
            '</div>\n' +
            '');
        $templateCache.put('uib/template/datepicker/year.html',
            '<table class=\"uib-yearpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" ' +
            'aria-activedescendant=\"{{activeDateId}}\">\n' +
            '  <thead>\n' +
            '    <tr>\n' +
            '      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ' +
            'ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n' +
            '      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" ' +
            'aria-live=\"assertive\" ' +
            'aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ' +
            'ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\">' +
            '<strong>{{title}}</strong></button></th>\n' +
            '      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ' +
            'ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n' +
            '    </tr>\n' +
            '  </thead>\n' +
            '  <tbody>\n' +
            '    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\">\n' +
            '      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n' +
            '        id=\"{{::dt.uid}}\"\n' +
            '        ng-class=\"::dt.customClass\">\n' +
            '        <button type=\"button\" class=\"btn btn-default\"\n' +
            '          uib-is-class=\"\n' +
            '            \'btn-current\' for selectedDt,\n' +
            '            \'active\' for activeDt\n' +
            '            on dt\"\n' +
            '          ng-click=\"select(dt.date)\"\n' +
            '          ng-disabled=\"::dt.disabled\"\n' +
            '          tabindex=\"-1\"><span ng-class=\"::{\'text-info\': dt.current}\">{{::dt.label}}' +
            '</span></button>\n' +
            '      </td>\n' +
            '    </tr>\n' +
            '  </tbody>\n' +
            '</table>\n' +
            '');
        $templateCache.put('uib/template/datepicker/month.html',
            '<table class=\"uib-monthpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" ' +
            'aria-activedescendant=\"{{activeDateId}}\">\n' +
            '  <thead>\n' +
            '    <tr>\n' +
            '      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ' +
            'ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n' +
            '      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" ' +
            'aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ' +
            'ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\">' +
            '<strong>{{title}}</strong></button></th>\n' +
            '      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ' +
            'ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n' +
            '    </tr>\n' +
            '  </thead>\n' +
            '  <tbody>\n' +
            '    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\">\n' +
            '      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n' +
            '        id=\"{{::dt.uid}}\"\n' +
            '        ng-class=\"::dt.customClass\">\n' +
            '        <button type=\"button\" class=\"btn btn-default\"\n' +
            '          uib-is-class=\"\n' +
            '            \'btn-current\' for selectedDt,\n' +
            '            \'active\' for activeDt\n' +
            '            on dt\"\n' +
            '          ng-click=\"select(dt.date)\"\n' +
            '          ng-disabled=\"::dt.disabled\"\n' +
            '          tabindex=\"-1\"><span ng-class=\"::{\'text-info\': dt.current}\">{{::dt.label}}' +
            '</span></button>\n' +
            '      </td>\n' +
            '    </tr>\n' +
            '  </tbody>\n' +
            '</table>\n' +
            '');
    }]);*/
})();