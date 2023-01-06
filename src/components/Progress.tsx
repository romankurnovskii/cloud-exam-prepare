export type ProgressDataType = {
  questionsAnswered: number;
  questionsCorrect: number;
  questionsWrong: number;
  score: number;
  exams?: {
    [key: string]: {
      questions_correct: number;
      questions_wrong: number;
    };
  };
};

export default function Progress(props: ProgressDataType) {
  const examCode = props.exams ? Object.keys(props.exams)[0] : '';
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>Progress</p>
      </header>
      <div className='card-content'>
        <div className='content'>
          {props.exams && (
            <>
              Exam: {examCode}
              <p>
                <strong>Correct:</strong>{' '}
                {props.exams[examCode]['questions_correct']} /{' '}
                <strong>Wrong:</strong>{' '}
                {props.exams[examCode]['questions_wrong']}
              </p>
              <p>
                <strong>Score:</strong> {props.score}% / <strong>Goal:</strong>{' '}
                75%
                <progress
                  className='progress is-success'
                  value={props.score}
                  max='100'
                >
                  {props.score}
                </progress>
              </p>
            </>
          )}

          All exams statistics:
          <p>
            <strong>Answered:</strong> {props.questionsAnswered} /{' '}
            <strong>Goal:</strong> 150
          </p>
          <p>
            <strong>Correct:</strong> {props.questionsCorrect} /{' '}
            <strong>Wrong:</strong> {props.questionsWrong}
          </p>
        </div>
      </div>
    </div>
  );
}
