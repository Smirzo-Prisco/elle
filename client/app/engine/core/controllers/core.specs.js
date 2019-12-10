'use strict';

describe('CoreController', function () {

    var vm, scope;

    beforeEach(module('app'));

    //Initialize the controller and a mock scope
    beforeEach(inject(function(_$controller_, $rootScope) {
        scope = $rootScope.$new();
        vm = _$controller_('CoreController', {
            $scope: scope
        });
    }));

    it('should have tests', function () {
        expect(true).toBe(true);
    });

    it('1 + 1 should equal 2', function () {
        vm.x = 1;
        vm.y = 2;
        vm.sum();
        expect(vm.z).toBe(3);
    });

    it('z should default to zero', function () {
        expect(vm.z).toBe(0);
    });


});