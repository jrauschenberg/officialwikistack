var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models');
var Page = models.Page;

describe('Page model', function() {

    describe('Validations', function() {
        var page;
        beforeEach(function() {
          page = new Page();
        });
        it('errors without title', function(done) {
          page.save(function(err) {
            expect(err.errors).to.have.property('title');
            done();
          });
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
            xit('gets pages with the search tag', function() {});
            xit('does not get pages without the search tag', function() {});
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            xit('never gets itself', function() {});
            xit('gets other pages with any common tags', function() {});
            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});