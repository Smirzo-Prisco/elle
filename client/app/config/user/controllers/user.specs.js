'use strict';

describe('UserController', function () {

    var vm, scope;

    beforeEach(module('app'));

    //Initialize the controller and a mock scope
    beforeEach(inject(function(_$controller_, $rootScope) {
        scope = $rootScope.$new();
        vm = _$controller_('UserController', {
            $scope: scope
        });
    }));


    it('editId should be -1', function () {
        vm.pid = 10;
        vm.editId = 10;
        vm.setEditId(vm.pid);
        expect(vm.editId).toBe(-1);
    });

    it('editId should be == pid', function () {
        vm.pid = 10;
        vm.editId = -1;
        vm.setEditId(vm.pid);
        expect(vm.editId).toBe(vm.pid);
    });
});