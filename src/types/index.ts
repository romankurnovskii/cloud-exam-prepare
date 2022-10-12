// -------- REQUESTS / PAYLOADS

export type AnswerPayloadRequestType = {
  question_id: string;
  answers_id: number[];
};

export type NewQuestionPayloadType = Omit<QuestionType, '_id' | 'comments'> & {
  correct_answers: number[];
  explanation: ExplanationType;
};

export type NewCommentPayloadType = {
  question_id: string;
  comment: string;
};

// ------- RESPONSE

export type ExplanationType = {
  id: number;
  description: string;
  link?: string;
};

export type AnswerType = {
  id: number;
  text: string;
};

export type QuestionType = {
  _id: string;
  answers: AnswerType[];
  comments: any[];
  correct_answers_count: number;
  question_text: string;
};

export type RandomQuestionResponseType = {
  data: QuestionType;
  questions_count: number;
  last_updated: string;
};

export type OnSendAnswerResponseType = {
  correct_answers: number[];
  is_answer_correct: boolean;
  explanation?: ExplanationType;
};
