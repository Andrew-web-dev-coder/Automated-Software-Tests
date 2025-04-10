import { expect } from "chai";
import { findMax, findMin, removeDuplicates } from "../src/arrayUtils.js";

describe("arrayUtils", () => {
  describe("findMax", () => {
    it("должна вернуть максимальное число в массиве", () => {
      expect(findMax([1, 5, 10, 2])).to.equal(10);
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => findMax("строка")).to.throw("Input must be an array");
    });
  });

  describe("findMin", () => {
    it("должна вернуть минимальное число в массиве", () => {
      expect(findMin([1, 5, -3, 2])).to.equal(-3);
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => findMin(123)).to.throw("Input must be an array");
    });
  });

  describe("removeDuplicates", () => {
    it("должна убрать дубликаты из массива", () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3])).to.eql([1, 2, 3]);
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => removeDuplicates({})).to.throw("Input must be an array");
    });
  });
});
