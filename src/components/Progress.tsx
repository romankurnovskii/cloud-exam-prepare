export type ProgressDataType = {
  questionsAnswered: number;
  questionsCorrect: number;
  questionsWrong: number;
  score: number;
};

export default function Progress(props: ProgressDataType) {
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>Progress</p>
      </header>
      <div className='card-content'>
        <div className='content'>
          <p>
            <strong>Answered:</strong> {props.questionsAnswered} /{' '}
            <strong>Goal:</strong> 150
          </p>
          <p>
            <strong>Correct:</strong> {props.questionsCorrect}
          </p>
          <p>
            <strong>Wrong:</strong> {props.questionsWrong}
          </p>
          <p>
            <strong>Score:</strong> {props.score}% / <strong>Goal:</strong> 75%
            <progress
              className='progress is-success'
              value={props.score}
              max='100'
            >
              {props.score}
            </progress>
          </p>
        </div>
      </div>
    </div>
  );
}
