import { AnswersBlock } from './Answers/AnswersBlock';
import { useEffect, useState } from 'react';
import { parseRawText } from '../util/textConverter';
import { AnswerType } from '../types';

type Props = {
  question: string;
  answers: AnswerType[];
  onAnswer: (answersId: number[]) => void;
  correctAnswers?: number[]; // TODO refactor, internal property
  correctAnswersCount: number;
  getNextQuestion: () => void;
};

export default function Question(props: Props) {
  const [isAnswered, setIsAnswered] = useState(false);
  const { question, answers, onAnswer } = props;
  const content = parseRawText(question);

  const onAnswerHandler = (answersId: number[]) => {
    if (isAnswered) {
      return;
    }
    onAnswer(answersId);
    setIsAnswered(true);
  };

  useEffect(() => {
    setIsAnswered(false);
  }, [question]);

  const getNextQuestionHandler = () => {
    if (isAnswered) {
      props.getNextQuestion();
    } else {
      alert("Don't skip. Need to answer on the current question first");
    }
  };

  return (
    <div className='card'>
      <header className='card-content'>{content}</header>
      <div className='card-content'>
        <div className='content'>
          <AnswersBlock
            answers={answers}
            isAnswered={isAnswered}
            correctAnswers={props.correctAnswers || []}
            correctAnswersCount={props.correctAnswersCount}
            onAnswer={onAnswerHandler}
            getNextQuestion={getNextQuestionHandler}
          />
        </div>
      </div>
    </div>
  );
}
