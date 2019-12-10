'use strict';

describe('AuthService Service', function () {

    var AuthService, httpBackend;


    beforeEach(module('app'));

    beforeEach(inject(function (_AuthService_, $httpBackend) {
        AuthService = _AuthService_;
        httpBackend = $httpBackend;
    }));


    it('should Request Method defined', function () {
        expect(AuthService.login).toBeDefined();
    });

    it('should not have a user logged upon starting up', function() {
        expect(AuthService.isLoggedIn()).toBe(false);
    });

    it('should not have a user details upon starting up', function() {
        expect(AuthService.getUserDetails()).toBe(false);
    });

    it('should Request Method defined', function () {
        var credentials = { username: 'luciani', password: 'alessandro'};
        expect(new AuthService.login(credentials)).toBeDefined();
    });


});
