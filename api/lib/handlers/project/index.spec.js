'use strict';

require('should');
var async = require('async');
var request = require('supertest');
var server = require('../../../server.js');
var ApiService = require('../../ApiService.js').ApiService;
let id;

describe('Project', function () {

    before(() =>
        ApiService('TRUNCATE give_me_time_public.project',
        [], null,
        () => {
        })
    );

    it('should create a project', function (done) {
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
                .send({ userId: 1, title: 'title test', description: 'desc', estimate: 42 })
                .expect(200)
                .end(function (err, res) {
                    id = res.body.id;
                    res.body.title.should.eql('title test');
                    res.body.estimate.should.eql(42);
                    cb(null);
                });
            },
        ], done);
    });

    it('should not create a projectif error occurs', function (done) {
        async.waterfall([
            function firstProj (cb) {
                request(server)
                .post('/project')
                .send({ userId: 1, title: 'title test', description: 'desc', estimate: -42 })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should get a project', function (done) {
        async.waterfall([
            function getProj (cb) {
                request(server)
                .get(`/project/${id}`)
                .expect(200)
                .end(function (err, res) {
                    res.body.title.should.eql('title test');
                    res.body.estimate.should.eql(42);
                    cb(null);
                });
            },
        ], done);
    });

    it('should not get a project if bad ID', function (done) {
        async.waterfall([
            function getProj (cb) {
                request(server)
                .get('/project/6666')
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not delete a project that doesn\'t exist', function (done) {
        async.waterfall([
            function delProj (cb) {
                request(server)
                .delete('/project/666')
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not delete a project if don\'t have the right', function (done) {
        async.waterfall([
            function delProj (cb) {
                request(server)
                .delete(`/project/${id}`)
                .set({ 'authorization': 'uTest' })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should delete a project', function (done) {
        async.waterfall([
            function delProj (cb) {
                request(server)
                .delete(`/project/${id}`)
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function getProj (cb) {
                request(server)
                .get(`/project/${id}`)
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });
});
