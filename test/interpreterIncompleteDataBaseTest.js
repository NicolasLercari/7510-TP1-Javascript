var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
            "varon"
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });

    describe('Interpreter Facts', function () {

        it('varon(juan) should be null', function () {
            assert(interpreter.checkQuery('varon(juan)') === null);
        });

        it('varon(maria) should be null', function () {
            assert(interpreter.checkQuery('varon(maria)') === null);
        });

        it('mujer(cecilia) should be null', function () {
            assert(interpreter.checkQuery('mujer(cecilia)') === null);
        });
        
        it('padre(juan, pepe) should be nil', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === null);
        });

        it('padre(mario, pepe) should be nil', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === null);
        });
    
        it('padre(juan, pepe) should be nil', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === null);
        });
        
        it('padre(juan, pepe) should be nil', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === null);
        });

        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be nil', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)')=== null);
        });

        it('hija(maria, roberto) should be nil', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === null);
        });

        // TODO: Add more tests

        // TODO: Add more tests

    });

});
