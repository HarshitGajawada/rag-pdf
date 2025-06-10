import axios from "axios";
const RAG = process.env.REACT_APP_RAG_URL;

export const uploadPDF = (file, token) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${RAG}/upload_pdf`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
