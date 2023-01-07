import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Progress, { ProgressDataType } from './components/Progress';
import Profile from './components/Profile';
import Question from './components/Question';
import Statistics, { StatisticsType } from './components/Statistics';
import { useAuthContext } from './context/AuthProvider';
import AddQuestion from './pages/AddQuestion';
import questionsJson from './questions.json';
import {
  getProgressData,
  getQuestion,
  getRandomQuestion,
  sendAnswerResult,
  sendComment,
} from './util/axios';
import Comments from './components/Comments/CommentsBlock';
import { QuestionExplanation } from './components/QuestionExplanation';
import {
  QuestionType,
  ExplanationType,
  AnswerPayloadRequestType,
  OnSendAnswerResponseType,
} from './types';
import HeaderCurrentExam from './components/HeaderCurrentExam';
import {
  calculateExamScore,
  calculateLocalDBExamScore,
  getLocalExamCode,
} from './util/helpers';
import { getUserInfo } from './util/axios';

export type LocalProgressData = ProgressDataType & {
  questions: { [key: string]: boolean };
};

const initProgressData = {
  questionsAnswered: 0,
  questionsCorrect: 0,
  questionsWrong: 0,
  score: 0,
};

export const App = () => {
  const { isAuthenticated, login, updateUserData } = useAuthContext();

  const [progress, setProgress] = useState<ProgressDataType>(initProgressData);
  const [localDbProgress, setLocalDbProgress] = useState<LocalProgressData>({
    ...initProgressData,
    questions: {},
  });
  const [question, setQuestion] = useState<QuestionType>(
    questionsJson['data'][0]
  );
  const [explanation, setExplanation] = useState<ExplanationType>();
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const [statistics, setStatistics] = useState<StatisticsType>({
    questionsCount: 0,
    lastUpdated: '2022',
  });
  const [correctAnswers, setCorrectAnswers] = useState<number[]>();

  useEffect(() => {
    getNextQuestion();
    if (isAuthenticated) {
      getProgressDataHandler();
    } else {
      const localScore = Number(localStorage.getItem('score')) || 0;
      setProgress((prev) => {
        return {
          ...prev,
          score: localScore,
        };
      });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getProgressDataHandler();
    }
  }, [isAuthenticated]);

  const onLoginHandler = async () => {
    login();
  };

  const onAnswerHandler = (answersId: number[]) => {
    const payload: AnswerPayloadRequestType = {
      question_id: question._id,
      answers_id: answersId,
    };
    sendAnswerResult(payload).then((response: OnSendAnswerResponseType) => {
      setCorrectAnswers(response.correct_answers);
      if (isAuthenticated) {
        getProgressDataHandler();
        if (response.explanation) {
          setExplanation(response.explanation);
          setShowExplanation(true);
        }
      } else {
        const tmpProgress = {
          ...localDbProgress,
          questions: {
            ...localDbProgress.questions,
            [payload['question_id']]: response['is_answer_correct'],
          },
        };
        const [correct, wrong, score] = calculateLocalDBExamScore(tmpProgress);

        setLocalDbProgress(tmpProgress);

        setProgress((prev) => {
          return {
            ...prev,
            questionsAnswered: correct + wrong,
            questionsCorrect: correct,
            questionsWrong: wrong,
            score: score,
          };
        });

        localStorage.setItem('progressData', JSON.stringify(tmpProgress));
      }
    });
  };

  const getProgressDataHandler = () => {
    getProgressData().then((res) => {
      setProgress((prev) => {
        return {
          ...prev,
          questionsAnswered: res.data['questions_answered'],
          questionsCorrect: res.data['questions_correct'],
          questionsWrong: res.data['questions_wrong'],
          score: calculateExamScore(res.data),
          exams: res.data?.exams,
        };
      });
    });
  };

  const getNextQuestion = async () => {
    setShowExplanation(false);
    setExplanation({ id: 0, description: '' });
    const randomQuestion = await getRandomQuestion(getLocalExamCode());
    const {
      data,
      questions_count: questionsCount,
      last_updated: lastUpdated,
    } = randomQuestion;
    setQuestion(data);
    setStatistics({ questionsCount, lastUpdated });
  };

  const sendCommentHandler = (comment: string) => {
    sendComment({
      question_id: question._id,
      comment,
    })
      .then((res) => getQuestion(question._id))
      .then((q) => {
        setQuestion(q.data);
      });
  };

  const onExamChangeHandler = () => {
    getUserInfo().then((res) => {
      const userData = res.data;
      if (userData) {
        updateUserData(userData);
      }
    });
    getNextQuestion();
  };

  return (
    <div>
      <div className='columns'>
        <div className='column is-three-quarters'>
          <HeaderCurrentExam onExamChange={onExamChangeHandler} />
          <div className='block'>
            <Routes>
              <Route
                path='/'
                element={
                  <Question
                    question={question.question_text}
                    correctAnswers={correctAnswers}
                    correctAnswersCount={question.correct_answers_count}
                    answers={question.answers}
                    onAnswer={onAnswerHandler}
                    getNextQuestion={getNextQuestion}
                  />
                }
              />
              <Route path='addQuestion' element={<AddQuestion />} />
            </Routes>
          </div>

          {isAuthenticated && showExplanation && explanation?.description && (
            <div className='block'>
              <QuestionExplanation
                description={explanation.description}
                link={explanation.link}
              />
            </div>
          )}

          <div className='block'>
            <Comments
              comments={question.comments}
              onCommentSend={sendCommentHandler}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>

        <div className='column'>
          <div className='block'>
            <Profile onLogin={onLoginHandler} />
          </div>

          <div className='block'>
            <Progress
              questionsAnswered={progress.questionsAnswered}
              questionsCorrect={progress.questionsCorrect}
              questionsWrong={progress.questionsWrong}
              score={progress.score}
              exams={progress.exams}
            />
          </div>
          <div className='block'>
            <Statistics
              questionsCount={statistics.questionsCount}
              lastUpdated={statistics.lastUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
