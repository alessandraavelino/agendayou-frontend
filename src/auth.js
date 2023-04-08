let isAuthenticated = false;

export const setAuth = (value) => {
  isAuthenticated = value;
};

export const checkAuth = () => {
  const token = localStorage.getItem("key");
  if (token) {
    return true;
  } else {
    return false;
  }
};

console.log(checkAuth());
