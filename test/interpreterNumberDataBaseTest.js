var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
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

        it('add(one, one, two) should be true', function () {
            assert(interpreter.checkQuery('add(one, one, two)'));
        });

        it('add(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, one)') === false);
        });
        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('subtract(one, one, two) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, two)')=== false);
        });

        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)') === true);
        });

        // TODO: Add more tests

    });


});
