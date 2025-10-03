import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TaskChartProps {
  tasks: Array<{
    status: 'pending' | 'in-progress' | 'completed';
  }>;
}

export const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Tasks by Status',
        data: [
          tasks.filter(t => t.status === 'pending').length,
          tasks.filter(t => t.status === 'in-progress').length,
          tasks.filter(t => t.status === 'completed').length,
        ],
        backgroundColor: ['#fff3e0', '#e3f2fd', '#e8f5e9'],
        borderColor: ['#f57c00', '#1976d2', '#2e7d32'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Task Distribution',
        color: '#2c3e50',
        font: {
          size: 16,
          weight: 'bold' as const, // Fix: specify 'bold' as a const type
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div
      style={{
        height: '300px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};
