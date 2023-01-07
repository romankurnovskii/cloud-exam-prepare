import { LocalProgressData } from '../App';
import { EXAM_CODES } from '../config';

export const getLocalExamCode = (): string => {
  let examCode = localStorage.getItem('examCode');
  if (!examCode) {
    examCode = Object.keys(EXAM_CODES)[0];
    setLocalExamCode(examCode);
  }
  return examCode;
};

export const setLocalExamCode = (examCode: string): void => {
  localStorage.setItem('examCode', examCode);
};

export const calculateExamScore = (progressDta: any) => {
  let score = 0;
  let correct = 0;
  let wrong = 0;

  if (progressDta.exams) {
    const examData = progressDta.exams[getLocalExamCode()];
    if (examData) {
      const { questions_correct, questions_wrong } = examData;
      correct = questions_correct;
      wrong = questions_wrong;
    }
  } else {
    correct = progressDta['questions_correct'];
    wrong = progressDta['questions_wrong'];
  }
  const count = correct + wrong;
  try {
    score = Math.round((correct / count) * 100) || 0;
  } catch {
    score = 0;
  }
  return score;
};

export const calculateLocalDBExamScore = (
  progressData: LocalProgressData
): [correct: number, wrong: number, score: number] => {
  let correctAnswers = 0;

  const answers = progressData.questions;
  Object.keys(answers).forEach((qId) => {
    if (answers[qId] === true) {
      correctAnswers++;
    }
  });

  const answersCount = Object.keys(answers).length;
  const wrong = answersCount - correctAnswers;
  return [
    correctAnswers,
    wrong,
    Math.round((correctAnswers / answersCount) * 100),
  ];
};
