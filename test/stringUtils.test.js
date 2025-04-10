import { expect } from "chai";
import {
  capitalize,
  reverseString,
  isPalindrome,
} from "../src/stringUtils.js";

describe("stringUtils", () => {
  describe("capitalize", () => {
    it("должна делать первую букву заглавной", () => {
      expect(capitalize("hello")).to.equal("Hello");
    });

    it("должна выбрасывать ошибку, если вход не строка", () => {
      expect(() => capitalize(123)).to.throw("Input must be a string");
    });
  });

  describe("reverseString", () => {
    it("должна переворачивать строку", () => {
      expect(reverseString("abc")).to.equal("cba");
    });

    it("должна выбрасывать ошибку, если вход не строка", () => {
      expect(() => reverseString([])).to.throw("Input must be a string");
    });
  });

  describe("isPalindrome", () => {
    it("должна вернуть true для палиндрома", () => {
      expect(isPalindrome("madam")).to.be.true;
    });

    it("должна вернуть false для непалиндрома", () => {
      expect(isPalindrome("hello")).to.be.false;
    });

    it("должна выбрасывать ошибку, если вход не строка", () => {
      expect(() => isPalindrome(null)).to.throw("Input must be a string");
    });
  });
});
