import React, { useState, useMemo } from 'react';
import { TaskCard } from './TaskCard/TaskCard';
import { StockTable } from './StockTable/StockTable';
import { tasks } from '../data/tasks';
import { stocks } from '../data/stocks';
import './Dashboard.css';

export const DashboardLegacy = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(task => 
        statusFilter === 'all' ? true : task.status === statusFilter
      );
  }, [searchQuery, statusFilter]);

  return (
    <div className="dashboard">
      <h1>Dashboard (Legacy)</h1>
      
      <section className="tasks-section">
        <h2>Task Management</h2>
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {isLoading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <div className="task-grid">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p className="no-results">No tasks found</p>
            )}
          </div>
        )}
      </section>

      <section className="stocks-section">
        <StockTable stocks={stocks} />
      </section>
    </div>
  );
};
