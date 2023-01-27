import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allQuizes: `${REACT_APP_BASE_URL}/api/quiz/`,
  singleQuiz: (id) => `${REACT_APP_BASE_URL}/api/quiz/${id}`,
  allMessages: `${REACT_APP_BASE_URL}/api/mail/`,
  singleMessage: (id) => `${REACT_APP_BASE_URL}/api/mail/${id}`,
  allUsers: `${REACT_APP_BASE_URL}/api/auth/user/`,
  singleUser: (id) => `${REACT_APP_BASE_URL}/api/auth/user/${id}`,
  allDescriptions: `${REACT_APP_BASE_URL}/api/description/`,
  singleDescription: (id) => `${REACT_APP_BASE_URL}/api/description/${id}`,
  login: `${REACT_APP_BASE_URL}/api/auth/login/`,
  register: `${REACT_APP_BASE_URL}/api/auth/register/`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${AUTH.getToken()}`
  }
});

const GET = (endpoint, headers) =>
  headers ? axios.get(endpoint, headers) : axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
