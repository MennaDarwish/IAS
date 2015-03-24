var request = require('supertest');
var app 	= require('../../app');
var db 		= require('../../models/index');
var should  = require('should');

describe('UserActions Route', function() {

	describe('Logging Actions to Users', function(){
		
		beforeEach(function(done){
			//Destroy the database before running each test.
			db.sequelize.sync({force: true}).then(function() {
				done();
			}).catch(function(err) {
				return done(err);
			});
		});

		it('Returns 201 status code', function(done) {
			request(app)
				.post('/useractions')
				.send('userId=123&publisherId=456')
				.expect(201, done);
		});

		it('Returns application/json format', function(done) {
			request(app)
				.post('/useractions')
				.send('userId=123&publisherId=456')
				.expect('Content-Type', /application\/json/, done);
		});

		it('Returns the id of the UserAction', function(done) {
			// Id that will be returned is the ID of the UserAction pair!
			request(app)
				.post('useractions')
				.send('userId=123&publisherId=456')
				.expect(function(response){
					response.body.publisherId.should.be.above(0).and.be.a.Number
				}).end(done);
		});

		it('Returns status message "created"', function(done) {
			request(app)
				.post('/useractions')
				.send('userId=123&publisherId=456')
				.expect(function(response){
					response.body.status.should.be.equal('created');
				}).end(done);
		});
	});
});