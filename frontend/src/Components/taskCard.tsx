import { FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux_files/store";
import { removeTodo, toggleTodo } from "../redux_files/todoSlice";

export type TaskProps = {
  id: string;
  text: string;
  completed: boolean;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
  setTask: React.Dispatch<React.SetStateAction<string>>;
};

const TaskCard: React.FC<TaskProps> = ({
  text,
  completed,
  id,
  setId,
  setTask,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 bg-gray-50 text-xl">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => dispatch(toggleTodo(id))}
            className="cursor-pointer"
          >
            <div
              className={`border rounded-full size-6 transition-all duration-200 ease-in-out transform flex items-center justify-center ${
                completed
                  ? " border-green-500 border-2 scale-110"
                  : "border-gray-400 hover:scale-110"
              }`}
            >
              {completed && <FiCheck className="text-green-500 size-4" />}
            </div>
          </button>
          <p
            className={`text-[18px] ${
              completed ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {text}
          </p>
        </div>

        <div className="flex gap-8 mr-4">
          <button
            onClick={() => {
              setId(id);
              setTask(text);
            }}
            disabled={completed}
            className={`${completed ? "text-gray-500 cursor-not-allowed" : "text-blue-500 cursor-pointer"}`}
          >
            <FiEdit2 />
          </button>
          <button
            onClick={() => dispatch(removeTodo(id))}
            className="text-red-500 cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
