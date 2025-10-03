import React from 'react';
import './Dashboard.css';

interface Task {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const Dashboard: React.FC = () => {
  // This would typically come from your state management or API
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Project Setup',
      assignee: 'John Doe',
      dueDate: '2024-02-01',
      status: 'in-progress'
    },
    // Add more sample tasks as needed
  ];

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>
      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <div className="task-info">
              <p>Assigned to: {task.assignee}</p>
              <p>Due: {task.dueDate}</p>
              <span className={`status ${task.status}`}>
                {task.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
