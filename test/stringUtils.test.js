import { expect } from "chai";
import {
  capitalize,
  reverseString,
  isPalindrome,
} from "../src/stringUtils.js";

describe("stringUtils", () => {
  describe("capitalize", () => {
    it("should capitalize the first letter", () => {
      expect(capitalize("hello")).to.equal("Hello");
    });

    it("should throw an error if the input is not a string", () => {
      expect(() => capitalize(123)).to.throw("Input must be a string");
    });
  });

  describe("reverseString", () => {
    it("should reverse the string", () => {
      expect(reverseString("abc")).to.equal("cba");
    });

    it("should throw an error if the input is not a string", () => {
      expect(() => reverseString([])).to.throw("Input must be a string");
    });
  });

  describe("isPalindrome", () => {
    it("should return true for a palindrome", () => {
      expect(isPalindrome("madam")).to.be.true;
    });

    it("should return false for a non-palindrome", () => {
      expect(isPalindrome("hello")).to.be.false;
    });

    it("should throw an error if the input is not a string", () => {
      expect(() => isPalindrome(null)).to.throw("Input must be a string");
    });
  });
});
