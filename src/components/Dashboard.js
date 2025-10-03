import React from 'react';
import './Dashboard.css';

export const Dashboard = () => {
  const tasks = [
    {
      id: 1,
      title: 'Complete Project Setup',
      assignee: 'John Doe',
      dueDate: '2024-02-01',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Design Review Meeting',
      assignee: 'Jane Smith',
      dueDate: '2024-02-03',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Backend Integration',
      assignee: 'Mike Johnson',
      dueDate: '2024-02-05',
      status: 'completed'
    }
  ];

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>
      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <div className="task-info">
              <p>👤 {task.assignee}</p>
              <p>📅 Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</p>
              <span className={`status ${task.status}`}>
                {task.status === 'in-progress' ? '🔄' : task.status === 'completed' ? '✅' : '⏳'} {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
