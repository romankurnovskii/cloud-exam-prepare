import { useNavigate } from 'react-router-dom';

const GoToRootButton = () => {
  let navigate = useNavigate();

  return (
    <button className='button ' onClick={() => navigate('/')}>
      Home
    </button>
  );
};

export default GoToRootButton;
