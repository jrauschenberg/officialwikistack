var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models');
var Page = models.Page;
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function() {

    describe('GET /', function() {
        it('gets 200 on index', function(done) {
          agent.get('/').expect(200, done);
        });
    });

    describe('GET /add', function () {
        it('gets 200 on add', function(done) {
          agent.get('/add').expect(200, done);
        });
    });

    describe('GET /wiki/:urlTitle', function() {
        beforeEach(function(done) {
            Page.create({
            title: "Reptiles",
            content: "Reptiles are neat."
          }, done);
        });
        it('gets 404 on page that doesnt exist', function(done) {
          agent.get('/wiki/alkdjsf').expect(404, done);
        });
        it('gets 200 on page that does exist', function(done) {
            agent.get('/wiki/Reptiles').expect(200, done);
        });
    });

    describe('GET /wiki/search', function() {
        it('gets 200', function(done) {
          agent.get('/wiki/search').expect(200, done);
        });
    });

    describe('GET /wiki/:urlTitle/similar', function() {
        beforeEach(function(done) {
            Page.create({
            title: "Reptiles",
            content: "Reptiles are neat."
          }, done);
        });
        it('gets 404 for page that doesn\'t exist', function(done) {
          agent.get('/wiki/alkdjsf/similar').expect(404, done);
        });
        it('gets 200 for similar page', function(done) {
          agent.get('/wiki/Reptiles/similar').expect(200, done);
        });
    });


    describe('GET /wiki/add', function() {
        it('gets 200', function(done) {
          agent.get('/wiki/add').expect(200, done);
        });
    });


    describe('POST /wiki/add', function() {
        it('creates a page in db', function(done) {
          Page.collection.drop();
          agent.post('/wiki')
          .send({name: 'John', email: 'john@john.com', title: "title", content: "content", status: "open", tags: "John"})
          .end(function() {
            Page.find()
            .then(function(result) {
              expect(result).to.have.lengthOf(1);
              done();
            }).then(null, done);
          });
          
        });
    });

});