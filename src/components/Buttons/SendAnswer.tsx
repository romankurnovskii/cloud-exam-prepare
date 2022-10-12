type Props = {
  onClick: () => void;
};

const SendAnswer = ({ onClick }: Props) => {
  return (
    <button className='button is-info' onClick={onClick}>
      Submit
    </button>
  );
};

export default SendAnswer;
