type Props = {
  onClick: () => void;
};

const LogoutButton = ({ onClick }: Props) => {
  return (
    <button className='button ' onClick={onClick}>
      Logout
    </button>
  );
};

export default LogoutButton;
