import React from 'react';
import { TaskChart } from './TaskChart';
import './Dashboard.css';

interface Task {
  id: number;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const Dashboard: React.FC = () => {
  const tasks: Task[] = [
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
    },
    {
      id: 4,
      title: 'User Testing',
      assignee: 'Sarah Wilson',
      dueDate: '2024-02-07',
      status: 'pending'
    }
  ];

  return (
    <div className="dashboard">
      <h1>Task Dashboard</h1>
      <TaskChart tasks={tasks} />
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
