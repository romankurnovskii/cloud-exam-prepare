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
