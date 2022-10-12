import { parseRawText } from '../util/textConverter';

type Props = {
  description: string;
  link?: string;
};
export const QuestionExplanation = (props: Props) => {
  return (
    <div className='card'>
      <header className='card-header'>
        <p className='card-header-title'>Explanation</p>
      </header>
      <div className='card-content'>
        <div className='content'>{parseRawText(props.description)}</div>
      </div>
    </div>
  );
};
