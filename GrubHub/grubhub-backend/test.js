var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
chai.use(chaiHttp);
var assert = require('assert');
var expect = chai.expect;
var testInput_name = "Mocha";
var testInput_email = "mocha.testemail@gmail.com";
var testInput_password = "test";


   // Buyer sign In
    it("Test Case 2 - Details of an existing profile Get", (done) => {
        chai.request('http://localhost:3001')
        .post(`/buyerSignIn`)
        .send({emailId: "admin",password : "admin"})
        .end((err, res) => {
            expect(err).to.be.null;
            res.body.should.be.a('object');
            res.status.should.be.equal(200);
            expect(res.body.validUser).to.equal(true);
        done();
        });
    })
