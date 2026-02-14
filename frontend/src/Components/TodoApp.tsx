import HeaderComponent from "./Header";
import { FiPlus, FiRefreshCw } from "react-icons/fi";
import FilterBtn from "./buttons";
import TaskCard from "./taskCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux_files/store";
import { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import TasksOverview, { MobileMenu } from "./TasksOverview";
import {
  addTodo,
  fetchTodos,
  clearTodos,
  editTodo,
} from "../redux_files/todoSlice";

const TodoApp = () => {
  const { todos, loading } = useSelector((state: RootState) => state.todo);
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
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="max-w-full mb-8">
      <div className="flex-col flex gap-6">
        <div className="flex flex-col">
          <HeaderComponent />
          <div className="flex sm:flex-row sm:gap-4 flex-col items-center">
            <MobileMenu
              total={todos.length}
              pending={pendingTodos.length}
              completed={completedTodos.length}
            />
            <div className="hidden sm:block">
              <TasksOverview
                total={todos.length}
                pending={pendingTodos.length}
                completed={completedTodos.length}
              />
            </div>
            <main className="w-full md:w-150 px-2">
              {/* Input Field */}
              <div className="flex gap-4 w-full mt-5 p-5 bg-[linear-gradient(to_right,#7c40ec_0%,#a76bf7_100%)] border rounded-tl-[20px] rounded-tr-[20px] border-none">
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
                disabled={loading}
                  className="flex max-sm:text-[14px] max-sm:px-2 cursor-pointer font-medium items-center px-3 bg-white rounded-md text-blue-600"
                  onClick={handleSubmit}
                >
                  {id ? (
                    <>
                      <span className="sm:hidden">Update</span>
                      <span className="hidden sm:inline">Update Task</span>
                    </>
                  ) : (
                    <>
                      <FiPlus className="text-blue-600 font-extrabold text-xl max-sm:text-[15px] mr-1" />
                      <span className="sm:hidden">Add</span>
                      <span className="hidden sm:inline">Add Task</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-white">
                {/* Filter Section */}
                <div className="flex justify-between py-3 px-2 md:mx-2 max-sm:flex-col max-sm:items-center max-sm:gap-3 bg-[linear-gradient(120deg,#f6f7fa_0%,#e3f4fc_100%)]">
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
                    className="flex max-sm:w-10/12 max-sm:justify-center items-center gap-2 text-red-700 bg-red-50 px-5 py-2 border border-red-200 rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-red-100 hover:-translate-y-px active:scale-95"
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
                <div className="pt-8 pb-8 px-4 flex flex-col min-h-55 max-h-60 gap-3 overflow-y-scroll max-sm:items-center">
                  {filteredTodos.length === 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <FaRegCircleCheck className="text-4xl text-blue-600" />
                      </div>
                      <p className="font-bold text-gray-700">No tasks found</p>
                      <p className="mt-2 text-gray-600">
                        Add your first task to get started!
                      </p>
                    </div>
                  )}
                  {loading && (
                    <div className="flex justify-center py-6">
                      <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {filteredTodos.map((todo) => (
                    <TaskCard
                      key={todo._id}
                      id={todo._id}
                      text={todo.text}
                      completed={todo.completed}
                      setId={setId}
                      setTask={setTask}
                    />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
