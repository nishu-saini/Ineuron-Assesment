import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email: email,
        password: password
      });
      const { token } = response.data;
      setToken(token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Account creation failed', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    setTasks([]);
    setEmail('');
    setPassword('');
  };

  const handleFetchTasks = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = response.data;
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleCreateTask = async (title) => {
    try {
      await axios.post(
        'https://reqres.in/api/tasks',
        {
          title: title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1>Create an Account</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Create Account & Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleFetchTasks}>Fetch Tasks</button>
      <div>
        <h2>Create Task</h2>
        <input type="text" id="taskTitle" />
        <button
          onClick={() => {
            const title = document.getElementById('taskTitle').value;
            handleCreateTask(title);
          }}
        >
          Add Task
        </button>
      </div>
      <div>
        <h2>My Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
