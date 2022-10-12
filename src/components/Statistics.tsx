export type StatisticsType = {
  questionsCount: number;
  lastUpdated: string;
};

export default function Statistics(props: StatisticsType) {
  const { questionsCount, lastUpdated } = props;
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>Statistics</p>
      </header>
      <div className='card-content'>
        <div className='content'>Questions in DB: {String(questionsCount)}</div>
        <div className='content'>Last updated: {lastUpdated}</div>
        {/* <div className='content'>Registered users: {String(questionsCount)}</div> */}
      </div>
    </div>
  );
}
