import {helloWorld, add, fetchRandomJoke, fetch5RandomJokes} from '../js/main.js';
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from 'sinon';

QUnit.module('main.js tests', function() {

    QUnit.test('helloWorld should print Hello World to the console', function(assert) {
        //Arrange
        const consoleSpy = sinon.spy(console, 'log');
        //Act
        helloWorld();
        //Assert
        assert.ok(consoleSpy.calledWith('Hello World'), 'console.log should be called with Hello World');
        consoleSpy.restore();
    });

    QUnit.test('add should return the sum of two numbers', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = 3;
        const expected = 5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, 3) should return 5');
    });

    QUnit.test('add should return the sum of negative numbers', function(assert) {
        //Arrange
        const num1 = -2;
        const num2 = -3;
        const expected = -5;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(-2, -3) should return -5');
    });

    QUnit.test('add should return the sum of a positive and a negative number', function(assert) {
        //Arrange
        const num1 = 2;
        const num2 = -3;
        const expected = -1;
        //Act
        const result = add(num1, num2);
        //Assert
        assert.equal(result, expected, 'add(2, -3) should return -1');
    });

    QUnit.test('fetchRandomJoke returns a single joke (string)', async function(assert) {
        //Arrange
        const originalFetch = globalThis.fetch;
        globalThis.fetch = () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ setup: 'Why?', punchline: 'Because.' })
        });
        //Act
        const result = await fetchRandomJoke();
        //Assert
        assert.strictEqual(typeof result, 'string', 'returns a string');
        globalThis.fetch = originalFetch;
      });
    
    QUnit.test('fetch5RandomJokes should return 5 jokes', async function(assert) {
        //Arrange
        const mockJokes = Array.from({ length: 10 }, (_, i) => ({
            setup: `Setup ${i + 1}`,
            punchline: `Punchline ${i + 1}`
        }));
        const originalFetch = globalThis.fetch;
        globalThis.fetch = () => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockJokes)
        });
        //Act
        const result = await fetch5RandomJokes();
        //Assert
        assert.equal(result.length, 5, 'should return 5 jokes');
    
        globalThis.fetch = originalFetch;
    });    

});
