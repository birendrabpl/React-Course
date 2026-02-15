import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLegacy } from './components/DashboardLegacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/legacy" element={<DashboardLegacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;