import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLegacy } from './components/DashboardLegacy';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/dashboardOld" element={<DashboardLegacy />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;