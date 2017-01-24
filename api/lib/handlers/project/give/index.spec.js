'use strict';

require('should');
var async = require('async');
var request = require('supertest');
var server = require('../../../../server.js');
var DatabaseService = require('../../../DatabaseService.js');
var postgresArray = require('postgres-array');
let id;

describe('Give time', function () {

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

    it('should give time to a project', function (done) {
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
                    cb(null);
                });
            },
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: 3 })
                .expect(200)
                .end(function (err, res) {
                    var asso = postgresArray.parse(res.body.associate_users).map(user => {
                        const tmpUser = eval(user.replace(/\(/g, '[').replace(/\)/g, ']'));
                        return tmpUser;
                    });
                    parseFloat(res.body.acquired).should.eql(3);
                    asso[0][0].should.eql(1); // check the first user ID
                    asso[0][1].should.eql(3);
                    // The first (only) user should have given 3 credits
                    // It's already checked below but we need to make sure it's on the project associative array
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
        ], done);
    });

    it('should not give time to a project if amount is invalid', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: -3 })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not give time to a project if the giver doesn\'t exist', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: 3 })
                .set({ 'authorization': 'uTest' })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not give time to a project that doesn\'t exist', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post('/project/give/666')
                .send({ amount: 3 })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not give more time than a project needs', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: 66666 })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });

    it('should not give time if the user doesnt\'t have enough credits', function (done) {
        async.waterfall([
            function giveTime (cb) {
                request(server)
                .post(`/project/give/${id}`)
                .send({ amount: 21 })
                .expect(200)
                .end(function (err, res) {
                    res.body.should.have.property('error');
                    cb(null);
                });
            },
        ], done);
    });
});
