import React from 'react';
import PropTypes from 'prop-types';

export const TaskCard = ({ task }) => {
  const getStatusIcon = (status) => {
    return status === 'in-progress' ? '🔄' : status === 'completed' ? '✅' : '⏳';
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <div className="task-info">
        <p>👤 {task.assignee}</p>
        <p>📅 Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}</p>
        <span className={`status ${task.status}`}>
          {getStatusIcon(task.status)} {task.status}
        </span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['in-progress', 'pending', 'completed']).isRequired
  }).isRequired
};
