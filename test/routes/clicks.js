var request = require('supertest');
var app = require('../../app');
var db = require('../../models/index');
var should = require('should');

describe('Clicks route', function(){
	describe('creating a new click', function(){
		beforeEach(function(done){
			db.sequelize.sync({force: true}).then(function(){
				done();
			}).catch(function(err))
			return done(err);
		});
	});
 it('Returns 201 status code', function(done){
      
      request(app)
        .post('/clicksRoute')
        .send('impressionId=2')
        .expect(201, done);
    });

    it('Returns application/json format', function(done) {
      
      request(app)
        .post('/clicksRoute')
        .send('impressionId=2')
        .expect('Content-Type', /application\/json/, done);

    });

    it('Returns the message redirecting to url', function(done) {
      
      request(app)
        .post('/clicksRoute')
        .send('impressionId=2')
        .expect(function(response) {
          response.body.message.should.be.equal('Redirecting to url')
        }).end(done);

    });

    it('Returns status message "created"', function(done) {
        
      request(app)
        .post('/clicksRoute')
        .send('impressionId=2')
        .expect(function(response){
          response.body.status.should.be.equal('created');
        }).end(done);

    });

  });
    

});