'use strict';

describe('LangController', function () {

    var vm, scope;

    beforeEach(module('app'));

    //Initialize the controller and a mock scope
    beforeEach(inject(function(_$controller_, $rootScope) {
        scope = $rootScope.$new();
        vm = _$controller_('LangController', {
            $scope: scope
        });
    }));

    it('should be tests', function () {
        expect(true).toBe(true);
    });




});