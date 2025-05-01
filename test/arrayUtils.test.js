import { expect } from "chai";
import { findMax, findMin, removeDuplicates } from "../src/arrayUtils.js";

describe("arrayUtils", () => {
  describe("findMax", () => {
    it("should return the maximum number in the array", () => {
      expect(findMax([1, 5, 10, 2])).to.equal(10);
    });

    it("should throw an error if input is not an array", () => {
      expect(() => findMax("string")).to.throw("Input must be an array");
    });
  });

  describe("findMin", () => {
    it("should return the minimum number in the array", () => {
      expect(findMin([1, 5, -3, 2])).to.equal(-3);
    });

    it("should throw an error if input is not an array", () => {
      expect(() => findMin(123)).to.throw("Input must be an array");
    });
  });

  describe("removeDuplicates", () => {
    it("should remove duplicate values from the array", () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).to.eql([1, 2, 3]);
    });

    it("should throw an error if input is not an array", () => {
      expect(() => removeDuplicates({})).to.throw("Input must be an array");
    });
  });
});
