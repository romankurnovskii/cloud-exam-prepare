import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { useAuthContext } from '../context/AuthProvider';

function getStorageValue(key: string, defaultValue: any) {
  const saved = sessionStorage.getItem(key);
  let result = null;
  if (saved) {
    result = saved;
  }
  return result || defaultValue;
}

export const useSessionStorage = (key: string, defaultValue: any) => {

  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    sessionStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

function AuthContext(AuthContext: any) {
  throw new Error('Function not implemented.');
}
// const [user, setUser] = useSessionStorage("user", null);
