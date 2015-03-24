var request = require('supertest');
var app 	= require('../../app');
var db 		= require('../../models/index');
var should  = require('should');

describe('ActionTypes Route', function() {

	describe('Creating new action type', function(){
		
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
				.post('/actiontypes')
				.send('action_name=LIKE&action_weight=5&publisherId=123')
				.expect(201, done);
		});

		it('Returns application/json format', function(done) {
			request(app)
				.post('/actiontypes')
				.send('action_name=LIKE&action_weight=5&publisherId=123')
				.expect('Content-Type', /application\/json/, done);
		});

		it('Returns the id of the created action type', function(done) {
			request(app)
				.post('actiontypes')
				.send('action_name=LIKE&action_weight=5&publisherId=123')
				.expect(function(response){
					response.body.publisherId.should.be.above(0).and.be.a.Number
				}).end(done);
		});

		it('Returns status message "created"', function(done) {
			request(app)
				.post('/actiontypes')
				.send('action_name=LIKE&action_weight=5&publisherId=123')
				.expect(function(response){
					response.body.status.should.be.equal('created');
				}).end(done);
		});
	});
});