export type StatisticsType = {
  questionsCount: number;
  lastUpdated: string;
};

export default function Statistics(props: StatisticsType) {
  const { questionsCount, lastUpdated } = props;
  const lastUpdatedDate = new Date(lastUpdated).toLocaleDateString(); // DD-MM-YYYY

  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>Statistics</p>
      </header>
      <div className='card-content'>
        <div className='content'>Questions in DB: {String(questionsCount)}</div>
        <div className='content'>Last updated: {lastUpdatedDate}</div>
        {/* <div className='content'>Registered users: {String(questionsCount)}</div> */}
        <div className='content'>
          <a href='https://forms.gle/hm8TUuyHYk4TAbqK8' target='_blank'>
            Subscribe
          </a>
          for new questions
        </div>
      </div>
    </div>
  );
}
