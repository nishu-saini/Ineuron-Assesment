import './App.css';
import MyContext from './MyContext';
import { useState, useContext } from 'react';

// Component that uses the context
function Dashboard() {
  const { theme, toggleTheme } = useContext(MyContext);

  return (
      <div className={`dashboard ${theme}`}>
        <h1>Dashboard</h1>
        <p>Current theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
  );
};

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <MyContext.Provider value={{ theme, setTheme, toggleTheme }}>
        <Dashboard />
      </MyContext.Provider>
    </>
  );
}

export default App;
