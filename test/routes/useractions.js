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
				.post('/useractions')
				.send('userId=123&publisherId=456')
				.expect(function(response){
					response.body.userActionId.should.be.above(0).and.be.a.Number
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
	describe('Fetching a user action', function(done) {
		beforeEach(function(done) {
			db.sequelize.sync({force: true}).then(function() {
				db.Publisher.create({}).then(function(publisher) {
					db.User.create({publisherId: publisher.dataValues.id}).then(function(user) {
						db.ActionType.create({publisherId: publisher.dataValues.id}).then(function(actionType) {
							db.UserAction.create({actionTypeId: actionType.dataValues.id, userId: user.dataValues.id});
							done();
						});
					});
				});
			});
		});
		it('Returns status code 200 if the record was found', function(done) {
			request(app)
				.get('/useractions/1')
				.expect(200, done);
		});
		it('Returns status code 404 if the record was not found', function(done) {
			request(app)
				.get('/useractions/30')
				.expect(404, done);
		});
	});
	
	describe('Deleting a user action', function(done) {
		beforeEach(function(done) {
			db.sequelize.sync({force: true}).then(function() {
				db.Publisher.create({}).then(function(publisher) {
					db.User.create({publisherId: publisher.dataValues.id}).then(function(user) {
						db.ActionType.create({publisherId: publisher.dataValues.id}).then(function(actionType) {
							db.UserAction.create({actionTypeId: actionType.dataValues.id, userId: user.dataValues.id});
							done();
						});
					});
				});
			});
		});
		it('Returns status message "deleted" if record is found', function(done) {
			request(app)
				.delete('/useractions/1')
				.expect(function(response) {
					response.body.status.should.be.equal('deleted');
				}).end(done);
		});
		it('Returns status code 404 if the record was not found', function(done) {
			request(app)
				.delete('/useractions/30')
				.expect(404, done);
		});
	});
});