import { expect } from 'chai';
import { add, subtract, multiply, divide } from '../src/mathUtils.js';

describe('mathUtils', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(2, 3)).to.equal(5);
    });
  });

  describe('subtract', () => {
    it('should subtract the second number from the first', () => {
      expect(subtract(5, 3)).to.equal(2);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(4, 2)).to.equal(8);
    });
  });

  describe('divide', () => {
    it('should divide the first number by the second', () => {
      expect(divide(10, 2)).to.equal(5);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(5, 0)).to.throw('Cannot divide by zero');
    });
  });
});
