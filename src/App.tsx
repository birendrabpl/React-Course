import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Dashboard />
      </div>
    </BrowserRouter>
  );
};

export default App;