'use strict';

require('should');
var async = require('async');
var request = require('supertest');
var server = require('../../../server.js');
var DatabaseService = require('../../DatabaseService.js');
let id;

describe('Project', function () {

    before(done => {
        DatabaseService('TRUNCATE give_me_time_public.project',
        [], null,
        () => {
        }),
        DatabaseService('UPDATE give_me_time_public.person SET credit=20 WHERE id=1', // Reset the original credits
        [], null,
        () => {
        }),
        done();
    });

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
                    parseFloat(res.body.estimate).should.eql(42);
                    cb(null);
                });
            },
        ], done);
    });

    it('should not create a project if error occurs', function (done) {
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

    it('should not create a project if some arguments are missing', function (done) {
        async.waterfall([
            function firstProj (cb) {
                request(server)
                .post('/project')
                .send({ userId: 1, description: 'desc', estimate: 42 }) // No title provided
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
                    parseFloat(res.body.estimate).should.eql(42);
                    cb(null);
                });
            },
        ], done);
    });

    it('should edit a project', function (done) {
        async.waterfall([
            function getProj (cb) {
                request(server)
                .put(`/project/${id}`)
                .send({ userId: 1, title: 'title EDIT', description: 'desc', estimate: 42 })
                .expect(200)
                .end(function (err, res) {
                    res.body.title.should.eql('title EDIT');
                    parseFloat(res.body.estimate).should.eql(42);
                    cb(null);
                });
            },
        ], done);
    });

    it('should not delete a project if don\'t have the right', function (done) {
        async.waterfall([
            function delProj (cb) {
                request(server)
                .put(`/project/${id}`)
                .set({ 'authorization': 'uTest' })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
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

    it('should delete a project and give back credits', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: 3 })
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function checkUser (cb) {
                request(server)
                .post('/login')
                .send({ id: 1 })
                .expect(200)
                .end(function (err, res) {
                    res.body.credit.should.eql(20 - 3);
                    cb(null);
                });
            },
            function delProj (cb) {
                request(server)
                .delete(`/project/${id}`)
                .expect(200)
                .end(function () {
                    cb(null);
                });
            },
            function checkUserAgain (cb) {
                request(server)
                .post('/login')
                .send({ id: 1 })
                .expect(200)
                .end(function (err, res) {
                    res.body.credit.should.eql(20); // should have his credits back
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
