import { expect } from "chai";
import { add, subtract, multiply, divide } from "../src/mathUtils.js";

describe("mathUtils", () => {
  describe("add", () => {
    it("должна сложить два числа", () => {
      expect(add(2, 3)).to.equal(5);
    });
  });

  describe("subtract", () => {
    it("должна вычесть второе число из первого", () => {
      expect(subtract(5, 3)).to.equal(2);
    });
  });

  describe("multiply", () => {
    it("должна умножить два числа", () => {
      expect(multiply(4, 2)).to.equal(8);
    });
  });

  describe("divide", () => {
    it("должна делить первое число на второе", () => {
      expect(divide(10, 2)).to.equal(5);
    });

    it("должна выбрасывать ошибку при делении на 0", () => {
      expect(() => divide(5, 0)).to.throw("Cannot divide by zero");
    });
  });
});
