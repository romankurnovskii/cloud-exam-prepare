import { useState, useEffect } from 'react';

function getStorageValue(key: string, defaultValue: any) {
  const saved = localStorage.getItem(key);
  let result = null;
  // if (saved) {
  //   result = JSON.parse(saved);
  // }

  if (saved) {
    result = saved;
  }
  return result || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

// const [user, setUser] = useLocalStorage("user", null);
