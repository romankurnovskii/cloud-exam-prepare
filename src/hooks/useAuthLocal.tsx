import axios from 'axios';
import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = async (data: any) => {
    try {
      let authresult = await axios.post('/api/auth/login', data);
      let userObj = { ...authresult.data?.foundUser };
      userObj.token = authresult.data?.encodedToken;
      setUser(userObj);
      //   toastsuccess('Login Successfull');
    } catch (err) {
      console.error(err);
      //   toasterror('Login Failed');
    }
  };

  const signUp = async (data: any) => {
    try {
      let authresult = await axios.post('/api/auth/signup', data);
      let userObj = { ...authresult.data?.createdUser };
      userObj.token = authresult.data?.encodedToken;
      setUser(userObj);
      //   toastsuccess('Sign Up Successfull');
    } catch (err) {
      console.error(err);
      //   toasterror('An Error Occuered');
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return { user, signIn, signUp, signOut };
};
