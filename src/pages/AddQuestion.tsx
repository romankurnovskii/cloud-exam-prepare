import { useState } from 'react';

import { AnswerType, NewQuestionPayloadType } from '../types';
import GoToRootButton from '../components/Buttons/GotoRoot';
import { addNewQuestion } from '../util/axios';
import { Box, Dropdown } from 'react-bulma-components';
import { EXAM_CODES } from '../config';
import { getLocalExamCode } from '../util/helpers';

function AddQuestion() {
  const [exam, setExam] = useState<String>('Choose exam');
  const [text, setText] = useState('');
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [a4, setA4] = useState('');
  const [explanation, setExplanation] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState(new Set<number>([]));

  const clearForm = () => {
    setText('');
    setA1('');
    setA2('');
    setA3('');
    setA4('');
    setExplanation('');
    setCorrectAnswers(new Set([]));
  };

  const onCreateHandler = () => {
    const _answers = [a1, a2, a3, a4];
    const answers = [];

    for (let i = 0; i < _answers.length; i++) {
      const answer: AnswerType = {
        id: i + 1,
        text: _answers[i],
      };
      answers.push(answer);
    }

    const questionData: NewQuestionPayloadType = {
      exam_code: getLocalExamCode(),
      question_text: text,
      answers,
      correct_answers_count: correctAnswers.size,
      correct_answers: [...correctAnswers],
      explanation: {
        id: 1,
        description: explanation,
      },
    };

    clearForm();
    addNewQuestion(questionData).then((res) => {
      clearForm();
      alert('Created');
      console.log(res);
    });
  };

  const onCheckCorrectAnswer = (answerId: number) => {
    let tmpCorrectAnswers = new Set(correctAnswers);
    if (tmpCorrectAnswers.has(answerId)) {
      tmpCorrectAnswers.delete(answerId);
    } else {
      tmpCorrectAnswers.add(answerId);
    }
    setCorrectAnswers(tmpCorrectAnswers);
  };

  // const examCodesMap = Object.entries(EXAM_CODES).map((e) => {
  //   return (
  //     <Dropdown.Item renderAs='a' value={e[0]}>
  //       {e[1]}
  //     </Dropdown.Item>
  //   );
  // });

  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>
          <textarea
            className='textarea'
            placeholder='Question'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </p>
      </header>
      <div className='card-content'>
        <div className='content'>
          <div className='panel-block'>
            <textarea
              className='textarea'
              value={a1}
              placeholder='Answer 1'
              onChange={(e) => setA1(e.target.value)}
            ></textarea>
          </div>
          <div className='panel-block'>
            <textarea
              className='textarea'
              value={a2}
              placeholder='Answer 2'
              onChange={(e) => setA2(e.target.value)}
            ></textarea>
          </div>
          <div className='panel-block'>
            <textarea
              className='textarea'
              value={a3}
              placeholder='Answer 3'
              onChange={(e) => setA3(e.target.value)}
            ></textarea>
          </div>
          <div className='panel-block'>
            <textarea
              className='textarea'
              value={a4}
              placeholder='Answer 4'
              onChange={(e) => setA4(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Correct answers</p>
        </header>
        <div className='card-content'>
          <div className='content'>
            <div className='panel-block'>
              <div className='card-footer-item'>
                <div className='control'>
                  <label className='radio'>
                    <input
                      type='checkbox'
                      name='rsvp'
                      checked={correctAnswers.has(1)}
                      onChange={() => onCheckCorrectAnswer(1)}
                    />
                    1
                  </label>
                  <label className='radio'>
                    <input
                      type='checkbox'
                      name='rsvp'
                      checked={correctAnswers.has(2)}
                      onChange={() => onCheckCorrectAnswer(2)}
                    />
                    2
                  </label>
                  <label className='radio'>
                    <input
                      type='checkbox'
                      name='rsvp'
                      checked={correctAnswers.has(3)}
                      onChange={() => onCheckCorrectAnswer(3)}
                    />
                    3
                  </label>
                  <label className='radio'>
                    <input
                      type='checkbox'
                      name='rsvp'
                      checked={correctAnswers.has(4)}
                      onChange={(e) => onCheckCorrectAnswer(4)}
                    />
                    4
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>Explanation</p>
          </header>
          <div className='card-content'>
            <div className='content'>
              <textarea
                className='textarea'
                value={explanation}
                placeholder='Explanation'
                onChange={(e) => setExplanation(e.target.value)}
              ></textarea>
            </div>
          </div>

          <footer className='card-footer'>
            <div className='card-footer-item'>
              <button className='button is-primary' onClick={onCreateHandler}>
                Create
              </button>
            </div>

            <div className='card-footer-item'>
              <GoToRootButton />
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
