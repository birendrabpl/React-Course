import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLegacy } from './components/DashboardLegacy';
import { StockAnalysisPage } from './components/StockAnalysis/StockAnalysisPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/legacy" replace />} />
        <Route path="/legacy" element={<DashboardLegacy />} />
        <Route path="/analysis" element={<StockAnalysisPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;