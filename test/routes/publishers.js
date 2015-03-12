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

    it('Returns 201 status code', function(done){
      
      request(app)
        .post('/publishers')
        .send('name=FooPublisher&email=publisher@example.com&domain=http://www.publisher.com&channel=Sports')
        .expect(201, done);
    });

    it('Returns application/json format', function(done) {
      
      request(app)
        .post('/publishers')
        .send('name=FooPublisher&email=publisher@example.com&domain=http://www.publisher.com&channel=Sports')
        .expect('Content-Type', /application\/json/, done);

    });

    it('Returns the id of the newly created publisher', function(done) {
      
      request(app)
        .post('/publishers')
        .send('name=FooPublisher&email=publisher@example.com&domain=http://www.publisher.com&channel=Sports')
        .expect(function(response) {
          response.body.publisherId.should.be.above(0).and.be.a.Number
        }).end(done);

    });

    it('Returns status message "created"', function(done) {
        
      request(app)
        .post('/users')
        .send('name=FooPublisher&email=publisher@example.com&domain=http://www.publisher.com&channel=Sports')
        .expect(function(response){
          response.body.status.should.be.equal('created');
        }).end(done);

    });

  });
    

});
