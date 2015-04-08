var request = require('supertest');
var app     = require('../../app');
var db      = require('../../models/index');
var should  = require('should');

describe('Publishers Route', function() {
  
  describe('Creating new publishers', function(){
    beforeEach(function(done) {
      //Destroy database before running each test
      
      db.sequelize.sync({force: true}).then(function() {
        done();
      }).catch(function(err) {
        return done(err);
      });
    });
    
    it('Returns status message "created"', function(done) {
      request(app)
        .post('/adRequest')
        .send('userId=1&publisherId=1&height=30&width=40')
        .expect(function(response){
          response.body.status.should.be.equal('created');
        }).end(done);

    });
    
    });
