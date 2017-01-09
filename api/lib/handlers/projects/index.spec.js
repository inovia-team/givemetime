'use strict';

require('should');
var async = require('async');
var request = require('supertest');
var server = require('../../../server.js');
var ApiService = require('../../ApiService.js').ApiService;

describe('Projects', function () {

    before(() =>
        ApiService('TRUNCATE give_me_time_public.project',
        [], null,
        () => {
        })
    );

    it('should get all the projects', function (done) {
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
                .post('/project')
                .send({ userId: 1, title: 'title', description: 'desc', estimate: 42 })
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function secProj (cb) {
                request(server)
                .post('/project')
                .send({ userId: 1, title: 'title2', description: 'desc2', estimate: 666 })
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function getAll (cb) {
                request(server)
                .get('/projects')
                .expect(200)
                .end(function (err, res) {
                    res.body.length.should.eql(2);
                    cb(null);
                });
            },
        ], done);
    });
});
