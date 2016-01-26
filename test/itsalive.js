var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

describe('Testing suite compatibilities', function() {
  it('does basic math', function() {
    expect(2+2).to.equal(4);
  });
  it('waits the right amount of time', function(done) {
    var oldDate = new Date();
    setTimeout(function(){
      var newDate = new Date();
      expect(newDate - oldDate).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });
  var tester = function(num) {return num;};
  var testerVersion = chai.spy(tester);
  [1, 2, 3, 4].forEach(testerVersion);
  it('called forEach the right number of times', function () {
    expect(testerVersion).to.have.been.called.exactly(4);
  });





});