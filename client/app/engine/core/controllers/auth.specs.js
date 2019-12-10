'use strict';

describe('AuthController', function () {

    var vm, scope;

    beforeEach(module('app'));

    //Initialize the controller and a mock scope
    beforeEach(inject(function(_$controller_, $rootScope) {
        scope = $rootScope.$new();
        vm = _$controller_('AuthController', {
            $scope: scope
        });
    }));

    it('should have tests', function () {
        expect(true).toBe(true);
    });




});