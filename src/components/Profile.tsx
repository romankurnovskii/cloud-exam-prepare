import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuthContext } from '../context/AuthProvider';
import { getUserInfo } from '../util/axios';
import AddQuestionButton from './Buttons/AddQuestion';
import LoginButton from './Buttons/Login';
import LogoutButton from './Buttons/Logout';

export type ProfileProps = {
  onLogin: () => void;
};

const Profile = ({ onLogin }: ProfileProps) => {
  const { userData, isAuthenticated, updateUserData, saveAuthData, logout } =
    useAuthContext();
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      saveAuthData(location.hash).then((e) => {
        getUserInfo().then((res) => {
          const userData = res.data;
          if (userData.name) {
            setUsername(userData.username);
          }
          if (userData) {
            updateUserData(userData);
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    setShowProfile(isAuthenticated);
  }, [userData]);

  useEffect(() => {
    setShowProfile(isAuthenticated);
    const name = userData?.name;
    if (name) {
      setUsername(name);
    } else {
      setUsername(userData?.email);
    }
  }, [isAuthenticated]);

  if (showProfile) {
    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>{username}</p>
        </header>

        <footer className='card-footer'>
          <div className='card-footer-item'>
            <LogoutButton onClick={logout} />
          </div>

          {userData['canAddQuestions'] && (
            <div className='card-footer-item'>
              {/* <Link to='addQuestion'>Add question</Link> */}
              <AddQuestionButton />
            </div>
          )}
        </footer>
      </div>
    );
  }
  // eslint-disable-next-line react/jsx-no-undef
  return <LoginButton onClick={onLogin} />;
};

export default Profile;
