type Props = {
  onClick: () => void;
};

const LoginButton = ({ onClick }: Props) => {
  return (
    <button className='button is-primary' onClick={onClick}>
      Sign In
    </button>
  );
};

export default LoginButton;
