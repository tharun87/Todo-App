import HeaderComponent from "./HeaderComponent";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import FilterBtn from "./buttons";
import TaskCard from "./taskCard";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearTodos, editTodo } from "../redux_files/todoSlice";
import type { RootState, AppDispatch } from "../redux_files/store";
import { useEffect, useState } from "react";

const TodoApp = () => {
  const todos = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  const [task, setTask] = useState<string>("");
  const [id, setId] = useState<string | null>(null);
  const [filterText, setFilterText] = useState<string>("All");
  const [spinning, setSpinning] = useState(false);

  const pendingTodos = todos.filter((item) => item.completed === false);
  const completedTodos = todos.filter((item) => item.completed === true);

  const filteredTodos =
    filterText === "Pending"
      ? pendingTodos
      : filterText === "Completed"
        ? completedTodos
        : todos;

  const handleSubmit = () => {
    if (!task.trim()) {
      return;
    }
    if (id) {
      dispatch(editTodo({ id, text: task }));
      setId(null);
    } else {
      dispatch(addTodo(task));
    }
    setTask("");
  };
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w-150">
      <HeaderComponent />
      <main className="min-w-150">
        {/* Input Field */}
        <div className="flex gap-4 w-full mt-6 p-5 bg-[linear-gradient(to_right,#7c40ec_0%,#a76bf7_100%)] border rounded-tl-[20px] rounded-tr-[20px] border-none">
          <input
            value={task}
            onChange={(e) => {
              const value = e.target.value;
              setTask(value);
              if (id && !value.trim()) {
                setId(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
              if (e.key === "Escape") {
                setTask("");
                setId(null);
              }
            }}
            type="text"
            className="border text-white focus:outline-gray-400 border-gray-300 min-w-9/12 p-2 rounded-md placeholder-gray-200"
            placeholder="What needs to be done?"
          />
          <button
            className="flex cursor-pointer gap-2 font-medium items-center px-3 bg-white rounded-md text-blue-600"
            onClick={handleSubmit}
          >
            {id ? (
              "Update Task"
            ) : (
              <>
                <FiPlus className="text-blue-600 font-extrabold text-xl" />
                Add Task
              </>
            )}
          </button>
        </div>
        {/* Filter Section */}
        <div className="flex justify-between py-3 px-4">
          <div className="flex gap-4">
            <FilterBtn
              setFilter={setFilterText}
              activeFilter={filterText}
              text="All"
            />
            <FilterBtn
              setFilter={setFilterText}
              activeFilter={filterText}
              text="Pending"
            />
            <FilterBtn
              setFilter={setFilterText}
              activeFilter={filterText}
              text="Completed"
            />
          </div>
          <button
            onClick={() => {
              setSpinning(true);
              dispatch(clearTodos());
              setTimeout(() => setSpinning(false), 500);
            }}
            className="flex items-center gap-2 text-red-700 bg-red-50 px-5 py-2 border border-red-200 rounded-md cursor-pointer
  transition-all duration-200 ease-in-out
  hover:bg-red-100 hover:-translate-y-px
  active:scale-95"
          >
            <FiRefreshCw
              className={`transition-transform duration-500 ease-in-out ${
                spinning ? "rotate-180" : ""
              }`}
            />
            Clear All
          </button>
        </div>
        {/* Todo List */}
        <div className="bg-white pt-8 pb-8 px-4 flex flex-col max-h-60 gap-3 overflow-y-scroll">
          {filteredTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              id={todo.id}
              text={todo.task}
              completed={todo.completed}
              setId={setId}
              setTask={setTask}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TodoApp;
