import { useEffect, useState } from 'react';
import { AnswerType } from '../../types';
import NextQuestion from '../Buttons/NextQuestion';

import SendAnswer from '../Buttons/SendAnswer';
import { Answer } from './Answer';

type Props = {
  answers: AnswerType[];
  isAnswered: boolean;
  correctAnswers: number[];
  correctAnswersCount: number;
  onAnswer: (answersId: number[]) => void;
  getNextQuestion: () => void;
};

export const AnswersBlock = (props: Props) => {
  const [answersId, setAnswersId] = useState(new Set<number>());
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);

  const onAnswerChoosehandler = (answerId: any) => {
    let tmpAnswersId = answersId;
    if (tmpAnswersId.has(answerId)) {
      tmpAnswersId.delete(answerId);
    } else {
      tmpAnswersId.add(answerId);
    }
    setAnswersId(tmpAnswersId);
  };

  const onAnswerSendHandler = () => {
    props.onAnswer([...answersId]);
  };

  useEffect(() => {
    if (isAnswered !== props.isAnswered) {
      setIsAnswered(props.isAnswered);
    }
  }, [props.isAnswered]);

  useEffect(() => {
    setAnswersId(new Set<number>());
  }, [props.answers]);

  useEffect(() => {
    setCorrectAnswers(props.correctAnswers);
  }, [props.correctAnswers]);

  const answersMap = props.answers.map((answer) => {
    return (
      <Answer
        key={answer.id + Math.random()}
        id={answer.id}
        text={answer.text}
        isAnswered={isAnswered}
        correctAnswers={correctAnswers}
        answeredIds={answersId}
        onClick={onAnswerChoosehandler}
      />
    );
  });

  return (
    <>
      {/* {renderedAnswers} */}
      {answersMap}
      <div className='columns'>
        <div className='column'>
          <div className='buttons'>
            <SendAnswer onClick={onAnswerSendHandler} />
            <NextQuestion
              onClick={props.getNextQuestion}
              isActive={isAnswered}
            />
          </div>
        </div>
        <div className='column'>
          Correct answers: {props.correctAnswersCount}
        </div>
      </div>
    </>
  );
};
