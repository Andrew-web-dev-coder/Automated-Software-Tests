import { expect } from "chai";
import { checkStudentKnowledge } from "../src/studentKnowledgeCheckerUtil.js";

describe("checkStudentKnowledge", () => {
  it("должна вернуть true, если все ответы совпадают", () => {
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

  it("должна вернуть false, если хотя бы один ответ неверный", () => {
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

  it("должна вернуть false, если ключи не совпадают", () => {
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

  it("должна вернуть false, если порядок ключей разный", () => {
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
