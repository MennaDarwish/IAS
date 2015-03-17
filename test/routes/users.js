var request = require('supertest');
var app     = require('../../app');
var db      = require('../../models/index');
var should  = require('should');

describe('Users Route', function() {
  describe('Creating new users', function() {

   beforeEach(function(done) {
    //Destroy database before running each test.
     
     db.sequelize.sync({force: true}).then(function() {
      // Create publisher record which will be used in creating users. 
      db.Publisher.create({}).then(function() {
        done();
       });
     })

   })

   var userData = {
      name: 'FooUser',
      email: 'user@example.com',
      birthdate: '1/1/1990',
      gender: 'male',
      publisherId: 1
    }

    it('Returns 201 status code', function(done){
      
      request(app)
        .post('/users')
        .send(userData)
        .expect(201, done);
    });

    it('Returns application/json format', function(done) {
      
      request(app)
        .post('/users')
        .send(userData)
        .expect('Content-Type', /application\/json/, done);

    });

    it('Returns the id of the newly created user', function(done) {
      
      request(app)
        .post('/users')
        .send(userData)
        .expect(function(response) {
          response.body.userId.should.be.above(0).and.be.a.Number
        }).end(done);

    });

    it('Returns status message "created"', function(done) {
        
      request(app)
        .post('/users')
        .send(userData)
        .expect(function(response){
          response.body.status.should.be.equal('created');
        }).end(done);

    });

  });

  describe('Fetching a user', function(done) {
    beforeEach(function(done) {
      // Sync database and create a user record
      
     db.sequelize.sync({force: true}).then(function() {
      // Create publisher record which will be used in creating users. 
      db.Publisher.create({}).then(function() {
        db.User.create({name:'FetcherTester',publisherId:1});
        done();
      });

     });

    });

    it('Returns status code 200 if the record was found', function(done){
     
      request(app)
        .get('/users/1')
        .expect(200, done);


    });

    it('Returns status code 404 if the record was not found', function(done){
     
      request(app)
        .get('/users/100')
        .expect(404, done);

    });

    it('Returns application/json format', function(done){
      
      request(app)
        .get('/users/1')
        .expect('Content-Type', /application\/json/, done);
    
    });

    it('Returns the user record if found', function(done){
    
      request(app)
        .get('/users/1')
        .expect(/FetcherTester/, done) // The name of the created user in beforeEach hook.
    
    });
  
  });

});
