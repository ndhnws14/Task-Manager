import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách công việc:', err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.discription} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
