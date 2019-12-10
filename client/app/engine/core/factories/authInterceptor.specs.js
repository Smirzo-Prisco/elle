'use strict';

describe('AuthService Factory', function () {

    var authInterceptor;
    var rejection = { status: 401};

    beforeEach(module('app'));

    beforeEach(inject(function (_authInterceptor_) {
        authInterceptor = _authInterceptor_;
    }));


    it('Should Request Method defined', function () {
        expect(new authInterceptor.request).toBeDefined();
    });

    it('Should requestError Method defined', function () {
        expect(new authInterceptor.requestError).toBeDefined();
    });

    it('Should response Method defined', function () {
        expect(new authInterceptor.response).toBeDefined();
    });

    it('Should responseError Method defined', function () {
        expect(new authInterceptor.responseError(rejection)).toBeDefined();
    });


});