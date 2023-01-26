const setToken = (token) => {
  localStorage.setItem('token', token);
};

const getToken = () => {
  return localStorage.getItem('token');
};

const setUser = (user)=> {
  localStorage.setItem('user', user)
}

const getUser = () => {
  return localStorage.getItem('user')
}


const getPayload = () => {
  const token = getToken();
  if (!token) {
    return false;
  }
  const parts = token.split('.');
  if (parts.length < 3) {
    return false;
  }
  return JSON.parse(Buffer.from(parts[1], 'base64'));
};

const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const isOwner = (objectId) => objectId === getPayload().userId;

export const AUTH = { setToken, getToken, getPayload, logOut, isOwner, setUser, getUser };
