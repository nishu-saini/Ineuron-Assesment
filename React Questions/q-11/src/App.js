import { useReducer, useState } from 'react';
import { initialState, todoReducer } from './TodoReducer';
import './App.css'

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: todo });
    setNewTodo('');
  };

  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const deleteTodo = id => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {state.todos.map(todo => (
          <li
            key={todo.id}
          >
            <input type='checkbox' onChange={() => toggleTodo(todo.id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

