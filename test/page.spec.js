var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models');
var Page = models.Page;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('Page model', function() {

    describe('Validations', function() {
        var page;
        beforeEach(function() {
          page = new Page();
        });
        it('errors without title', function() {
          return expect(page.save()).to.eventually.have.property(err.errors);
        });
        it('errors without content', function(done) {
          page.save(function(err) {
            expect(err.errors).to.have.property('content');
            done();
          });
        });
    });

    describe('Statics', function() {
        describe('findByTag', function() {
            var page;
            beforeEach(function(done) {
              Page.create({
                  title: "Turtles",
                  content: "Turtles are smart.",
                  status: "open",
                  tags: ["turtles", "smart", "amphibians"]
                }, done);
            });
            it('gets pages with the search tag', function() {
              return expect(Page.findByTag('turtles')).to.eventually.have.length;
              // Page.findByTag("turtles").then(function(result) {
              //   expect(result).to.have.length; 
              //   done();
              // }).then(null, done);
            });
            it('does not get pages without the search tag', function(done) {
                Page.findByTag("geese").then(function(result) {
                expect(result).to.have.lengthOf(0);
              }).then(done, done);             
            });
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            beforeEach(function(done) {
              Page.collection.drop();
              Page.create({
                  title: "Reptiles",
                  content: "Reptiles are smart.",
                  status: "open",
                  tags: ["reptiles", "smart", "amphibians"]
                });
              Page.create({
                  title: "Ducks",
                  content: "ducks are smart.",
                  status: "open",
                  tags: ["ducks"]
                });
              Page.create({
                  title: "Geckos",
                  content: "geckos are smart.",
                  status: "open",
                  tags: ["reptiles"]
                }, done);
            });
            it('never gets itself', function(done) {
              Page.findOne({ title: 'Ducks'})
              .then(function(page) {
                return page.findSimilar()
                .then(function(result) {
                    expect(result).to.have.lengthOf(0);
                    done();
                }).then(null, done);
              });
            });
            it('gets other pages with any common tags', function(done) {
              Page.findOne({ title: 'Reptiles'})
              .then(function(page) {
                return page.findSimilar()
                .then(function(result) {
                    expect(result).to.have.lengthOf(1);
                    done();
                }).then(null, done);
              });

            });
            it('does not get other pages without any common tags', function(done) {
              Page.findOne({ title: 'Geckos'})
              .then(function(page) {
                return page.findSimilar()
                .then(function(result) {
                    expect(result).to.have.lengthOf(1);
                    done();
                }).then(null, done);
              });
            });
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            var page;
            beforeEach(function(done) {
              Page.collection.drop();
                  page = new Page({
                  title: "Reptiles",
                  content: "Reptiles are smart.",
                  status: "open",
                  tags: ["reptiles", "smart", "amphibians"],
                  urlTitle: "reptiles"
                });
              done();
            });
            it('returns the url_name prepended by "/wiki/"', function(done) {
              expect(page.route).to.equal("/wiki/reptiles");
              done();
            });
        });
    });

    describe('Hooks', function() {
        var page;
        beforeEach(function(done) {
          Page.collection.drop();
              page = new Page({
              title: "Reptiles 2",
              content: "Reptiles are smart.",
              status: "open",
              tags: ["reptiles", "smart", "amphibians"]
            });
          done();
        });
        it('it sets urlTitle based on title before validating', function(done) {
          page.validate();
          expect(page.urlTitle).to.equal("Reptiles_2");
          done();
        });
    });

});

