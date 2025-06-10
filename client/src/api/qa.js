import axios from "axios";
const RAG = process.env.REACT_APP_RAG_URL;
const API = process.env.REACT_APP_API_URL;

export const askQuestion = (question, token) => {
  const formData = new FormData();
  formData.append("question", question);
  return axios.post(`${RAG}/ask`, formData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getChatHistory = (token) =>
  axios.get(`${API}/qa/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const saveChat = (question, answer, token) =>
  axios.post(`${API}/qa/history`, { question, answer }, {
    headers: { Authorization: `Bearer ${token}` }
  });
