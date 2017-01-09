'use strict';

require('should');
var async = require('async');
var request = require('supertest');
var server = require('../../../server.js');
var ApiService = require('../../ApiService.js').ApiService;

describe('Login', function () {

    before(() =>
        ApiService('UPDATE give_me_time_public.person SET credit=20 WHERE id=1', // Reset the original credits
        [], null,
        () => {
        })
    );

    it('should get a user', function (done) {
        async.waterfall([
            function login (cb) {
                request(server)
                .post('/jwt_auth')
                .send({ access_token: 'mockToken' })
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function firstProj (cb) {
                request(server)
                .post('/login')
                .send({ id: 1 })
                .expect(200)
                .end(function (err, res) {
                    res.body.id.should.equal(1);
                    res.body.credit.should.equal(20);
                    cb(null);
                });
            },
        ], done);
    });
});
