import React, { useState, useMemo } from 'react';
import { StockTable } from './StockTable/StockTable';
import { stocks } from '../data/stocks';
import './Dashboard.css';

export const DashboardLegacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading] = useState(false);

  return (
    <div className="dashboard">
      <h1>Dashboard (Legacy)</h1>
      
      <section className="stocks-section">
        <StockTable stocks={stocks} />
      </section>
    </div>
  );
};
