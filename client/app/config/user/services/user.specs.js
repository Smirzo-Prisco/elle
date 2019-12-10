'use strict';

describe('userDataService', function () {

    var userDataService;

    beforeEach(module('app'));

    beforeEach(inject(function (_userDataService_) {
        userDataService = _userDataService_;
    }));

    it('getUserList should not return an undefined value', function () {
        expect(userDataService.getUserList()).not.toBe(undefined);
    });


    it('should have tests', function () {
        expect(true).toBe(true);
    });




});
