import React from "react";

export type Counts = {
  total: number;
  pending: number;
  completed: number;
};

const TasksOverview: React.FC<Counts> = ({ total, pending, completed }) => {
  const stats = [
    {
      label: "Total",
      value: total,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      label: "Pending",
      value: pending,
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    {
      label: "Completed",
      value: completed,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center bg-white px-3 py-2 rounded-[10px]"
        >
          <div
            className={`size-14 flex items-center justify-center rounded-full ${stat.bg}`}
          >
            <span className={`text-2xl font-bold ${stat.text}`}>
              {stat.value}
            </span>
          </div>
          <span className="mt-1 text-sm font-medium text-gray-500">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TasksOverview;
