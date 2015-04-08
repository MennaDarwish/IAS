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
				.send('actionName=LIKE&actionWeight=5&publisherId=123')
				.expect(201, done);
		});

		it('Returns application/json format', function(done) {
			request(app)
				.post('/actiontypes')
				.send('actionName=LIKE&actionWeight=5&publisherId=123')
				.expect('Content-Type', /application\/json/, done);
		});

		it('Returns the id of the created action type', function(done) {
			request(app)
				.post('/actiontypes')
				.send('actionName=LIKE&actionWeight=5&publisherId=123')
				.expect(function(response){
					response.body.actionTypeId.should.be.above(0).and.be.a.Number
				}).end(done);
		});

		it('Returns status message "created"', function(done) {
			request(app)
				.post('/actiontypes')
				.send('actionName=LIKE&actionWeight=5&publisherId=123')
				.expect(function(response){
					response.body.status.should.be.equal('created');
				}).end(done);
		});
	});
	
	describe('Fetching an action type', function() {
		beforeEach(function(done) {
			db.sequelize.sync({force: true}).then(function() {
				db.Publisher.create({}).then(function() {
					db.ActionType.create({actionName: 'FetcherTester', publisherId:1});
					done();
				});
			});
		});
		it('Returns status code 200 if the record was found', function(done) {
			request(app)
				.get('/actiontypes/1')
				.expect(200, done);
		});
		it('Returns status code 404 if the record was not found', function(done) {
			request(app)
				.get('/actiontypes/30')
				.expect(404, done);
		});
	});
	describe('Updating an action type', function(){
		beforeEach(function(done) {
			db.sequelize.sync({force: true}).then(function() {
				db.Publisher.create({}).then(function() {
					db.ActionType.create({actionName: 'UpdatingTester', publisherId:1});
					done();
				});
			});
		});
		it('Returns status message "updated" if record is found', function(done) {
			request(app)
				.put('/actiontypes/1')
				.send('actionName=SHARE&actionWeight=4')
				.expect(function(response) {
					response.body.status.should.be.equal('updated');
				}).end(done);
		});
		it('Returns status code 404 if the record was not found', function(done) {
			request(app)
				.put('/actiontypes/30')
				.expect(404, done);
		});
	});
	describe('Deleting an action type', function() {
		beforeEach(function(done) {
			db.sequelize.sync({force: true}).then(function() {
				db.Publisher.create({}).then(function() {
					db.ActionType.create({actionName: 'UpdatingTester', publisherId:1});
					done();
				});
			});
		});
		it('Returns status message "deleted" if record is found', function(done) {
			request(app)
				.delete('/actiontypes/1')
				.expect(function(response) {
					response.body.status.should.be.equal('deleted');
				}).end(done);
		});
		it('Returns status code 404 if the record was not found', function(done) {
			request(app)
				.delete('/actiontypes/30')
				.expect(404, done);
		});
	});
});