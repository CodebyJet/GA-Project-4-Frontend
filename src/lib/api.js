import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allQuizes: '/api/quiz/',
  singleQuiz: (id) => `/api/quiz/${id}`,
  allMessages: '/api/mail/',
  singleMessage:(id) => `/api/mail/${id}`,
  allUsers : '/api/auth/user/',
  singleUser: (id) => `/api/auth/user/${id}`,
  allDescriptions: '/api/description/',
  singleDescription: (id)=> `api/description/${id}`,
  login: 'api/auth/login/',
  register: 'api/auth/register/',
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
