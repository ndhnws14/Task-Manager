import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

// Lấy danh sách tất cả công việc
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Thêm công việc mới
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};
