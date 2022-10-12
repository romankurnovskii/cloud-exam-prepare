import { useNavigate } from 'react-router-dom';

const AddQuestionButton = () => {
  let navigate = useNavigate();

  return (
    <button className='button ' onClick={() => navigate('/addQuestion')}>
      Add question
    </button>
  );
};

export default AddQuestionButton;
