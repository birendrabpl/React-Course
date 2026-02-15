import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardTyped } from './components/DashboardTyped';
import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <DashboardTyped />
      </div>
    </BrowserRouter>
  );
};

export default App;