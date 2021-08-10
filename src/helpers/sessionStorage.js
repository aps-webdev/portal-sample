export const getSessionStorage = (key) => {
  let data = sessionStorage.getItem(key);
  return data;
};

export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
};
