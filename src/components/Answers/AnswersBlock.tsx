import { useEffect, useState } from 'react';

import { AnswerType } from '../../types';
import { Answer } from './Answer';
import SendAnswer from '../Buttons/SendAnswer';
import NextQuestion from '../Buttons/NextQuestion';

type Props = {
  answers: AnswerType[];
  isAnswered: boolean;
  correctAnswers: number[];
  correctAnswersCount: number;
  onAnswer: (answersId: number[]) => void;
  getNextQuestion: () => void;
};

const divStyle = {
  display: 'flex',
  // alignItems: 'left',
  // justifyContent: 'left',
  height: 30,
  gap: '21px',
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
  }, [props.isAnswered, isAnswered]);

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
      {answersMap}

      <div className='is-flex-direction-row' style={divStyle}>
        <div className='tags are-medium'>
          <span className='tag is-warning'>
            Correct answers: <strong>{props.correctAnswersCount}</strong>
          </span>
        </div>

        <div className='buttons'>
          <SendAnswer onClick={onAnswerSendHandler} />
          <NextQuestion onClick={props.getNextQuestion} isActive={isAnswered} />
        </div>
      </div>

      {/* <div className='columns is-1' style={divStyle}>
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
      </div> */}
    </>
  );
};
