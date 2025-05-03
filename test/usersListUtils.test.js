import { expect } from 'chai';
import {
  filterUsersByAge,
  sortUsersByName,
  findUserById,
  isEmailTaken,
} from '../src/usersListUtils.js';

describe('usersListUtils', () => {
  const mockUsers = [
    { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
    { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
    { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
  ];

  describe('filterUsersByAge', () => {
    it('should return users within the specified age range', () => {
      const result = filterUsersByAge(mockUsers, 26, 36);
      expect(result).to.deep.equal([mockUsers[1], mockUsers[2]]);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => filterUsersByAge({}, 20, 30)).to.throw('Users must be an array');
    });
  });

  describe('sortUsersByName', () => {
    it('should sort users alphabetically by name', () => {
      const result = sortUsersByName(mockUsers);
      expect(result.map(u => u.name)).to.eql(['Alice', 'Bob', 'Charlie']);
    });

    it('should throw an error if input is not an array', () => {
      expect(() => sortUsersByName('not array')).to.throw('Users must be an array');
    });
  });

  describe('findUserById', () => {
    it('should find a user by id', () => {
      const result = findUserById(mockUsers, 2);
      expect(result).to.deep.equal(mockUsers[1]);
    });

    it('should return null if user is not found', () => {
      const result = findUserById(mockUsers, 100);
      expect(result).to.be.null;
    });

    it('should throw an error if input is not an array', () => {
      expect(() => findUserById(null, 2)).to.throw('Users must be an array');
    });
  });

  describe('isEmailTaken', () => {
    it('should return true if the email already exists', () => {
      expect(isEmailTaken(mockUsers, 'bob@example.com')).to.be.true;
    });

    it('should return false if the email is not found', () => {
      expect(isEmailTaken(mockUsers, 'notfound@example.com')).to.be.false;
    });

    it('should throw an error if input is not an array', () => {
      expect(() => isEmailTaken(123, 'bob@example.com')).to.throw('Users must be an array');
    });
  });
});
