import { expect } from "chai";
import {
  filterUsersByAge,
  sortUsersByName,
  findUserById,
  isEmailTaken
} from "../src/usersListUtils.js";

describe("usersListUtils", () => {
  const mockUsers = [
    { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
    { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
    { id: 3, name: "Charlie", age: 35, email: "charlie@example.com" },
  ];

  describe("filterUsersByAge", () => {
    it("должна вернуть пользователей в указанном возрастном диапазоне", () => {
      const result = filterUsersByAge(mockUsers, 26, 36);
      expect(result).to.deep.equal([mockUsers[1], mockUsers[2]]);
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => filterUsersByAge({}, 20, 30)).to.throw("Users must be an array");
    });
  });

  describe("sortUsersByName", () => {
    it("должна сортировать пользователей по имени в алфавитном порядке", () => {
      const result = sortUsersByName(mockUsers);
      expect(result.map(u => u.name)).to.eql(["Alice", "Bob", "Charlie"]);
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => sortUsersByName("not array")).to.throw("Users must be an array");
    });
  });

  describe("findUserById", () => {
    it("должна находить пользователя по id", () => {
      const result = findUserById(mockUsers, 2);
      expect(result).to.deep.equal(mockUsers[1]);
    });

    it("должна вернуть null, если пользователь не найден", () => {
      const result = findUserById(mockUsers, 100);
      expect(result).to.be.null;
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => findUserById(null, 2)).to.throw("Users must be an array");
    });
  });

  describe("isEmailTaken", () => {
    it("должна возвращать true, если email уже существует", () => {
      expect(isEmailTaken(mockUsers, "bob@example.com")).to.be.true;
    });

    it("должна возвращать false, если email не найден", () => {
      expect(isEmailTaken(mockUsers, "notfound@example.com")).to.be.false;
    });

    it("должна выбрасывать ошибку, если вход не массив", () => {
      expect(() => isEmailTaken(123, "bob@example.com")).to.throw("Users must be an array");
    });
  });
});
