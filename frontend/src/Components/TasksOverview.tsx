import React, { useState } from "react";
import { MdMenu } from "react-icons/md";

export type Counts = {
  total: number;
  pending: number;
  completed: number;
};

export const MobileMenu: React.FC<Counts> = ({total, pending, completed}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="sm:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col justify-center items-center mt-3"
        aria-label="Toggle menu"
      >
        <div className="flex items-center justify-center gap-3"><MdMenu className="text-2xl text-amber-500"/><span className="text-orange-500">Tasks Overview</span></div>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="mt-3 bg-white shadow-md rounded-lg p-4">
          {/* Put your mobile content here */}
          <TasksOverview total={total} pending={pending} completed={completed}/>
        </div>
      )}
    </div>
  );
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
    <div className="flex flex-row sm:flex-col gap-3 max-sm:mt-0 mt-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center bg-white px-3 max-sm:py-1 border border-amber-300 py-3 rounded-[10px]"
        >
          <div
            className={`size-12 max-sm:size-10 max-sm:py-3 flex items-center justify-center rounded-full ${stat.bg}`}
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
