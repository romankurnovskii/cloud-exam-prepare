import { useEffect, useState } from 'react';
import { parseRawText } from '../../util/textConverter';

export type Props = {
  id: number;
  text: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  correctAnswers: number[];
  answeredIds: Set<number>;
  onClick: (answerId: number) => void;
};

export const Answer = (props: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [border, setBorder] = useState('none');

  const textContent = parseRawText(props.text);

  const onClickHandler = () => {
    setIsClicked(!isClicked);
    props.onClick(props.id);
  };

  useEffect(() => {
    if (isClicked) {
      setBorder('3px solid green');
    } else {
      setBorder('none');
    }
  }, [isClicked]);

  let color = '';
  // if (props.isAnswered) {
  //   if (props.isCorrect) {
  //     color = 'is-primary';
  //   } else if (props.isCorrect === false) {
  //     color = 'is-danger';
  //   }
  // }

  if (props.isAnswered) {
    let wasCorrect = props.correctAnswers.includes(props.id);
    if (props.answeredIds.has(props.id)) {
      if (wasCorrect) {
        console.log(true);
        color = 'is-primary';
      } else {
        console.log(false);
        color = 'is-danger';
      }
    } else {
      if (wasCorrect) {
        console.log(true);
        color = 'is-primary';
      }
    }
  }

  return (
    <div
      key={props.id}
      className={`notification ${color} border-2`}
      style={{
        border,
      }}
      onClick={onClickHandler}
    >
      {textContent}
    </div>
  );
};
