import { expect } from "chai";
import { checkStudentKnowledge } from "../src/studentKnowledgeCheckerUtil.js";

describe("checkStudentKnowledge", () => {
  it("should return true if all answers match", () => {
    const studentAnswers = {
      q1: "A",
      q2: "B",
      q3: "C",
    };

    const correctAnswers = {
      q1: "A",
      q2: "B",
      q3: "C",
    };

    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.true;
  });

  it("should return false if at least one answer is incorrect", () => {
    const studentAnswers = {
      q1: "A",
      q2: "X",
      q3: "C",
    };

    const correctAnswers = {
      q1: "A",
      q2: "B",
      q3: "C",
    };

    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
  });

  it("should return false if keys do not match", () => {
    const studentAnswers = {
      q1: "A",
      q2: "B",
    };

    const correctAnswers = {
      q1: "A",
      q2: "B",
      q3: "C",
    };

    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
  });

  it("should return false if keys are in different order", () => {
    const studentAnswers = {
      q3: "C",
      q2: "B",
      q1: "A",
    };

    const correctAnswers = {
      q1: "A",
      q2: "B",
      q3: "C",
    };

    expect(checkStudentKnowledge(studentAnswers, correctAnswers)).to.be.false;
  });
});
