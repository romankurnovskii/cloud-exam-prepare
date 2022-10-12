type Props = {
  onClick: () => void;
  isActive: boolean;
};

const NextQuestion = ({ onClick, isActive }: Props) => {
  return (
    <button
      className={`button button--primary ${isActive ? '' : 'is-hidden'}`}
      onClick={onClick}
    >
      Next
    </button>
  );
};

export default NextQuestion;
