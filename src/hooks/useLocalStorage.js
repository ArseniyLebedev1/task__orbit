import { useEffect, useState } from 'react';

const readValue = (key, initialValue) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    return initialValue;
  }
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() =>
    readValue(key, initialValue)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      return;
    }
  }, [key, storedValue]);

  const setValue = (value) => {
    setStoredValue((prevValue) =>
      typeof value === 'function' ? value(prevValue) : value
    );
  };

  return [storedValue, setValue];
};
