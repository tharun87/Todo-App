import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodosAPI,
  addTodoAPI,
  toggleTodoAPI,
  deleteTodoAPI,
  clearTodosAPI,
  editTodoAPI,
} from "../API/todoApi";

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

/* FETCH TODOS */
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetchTodosAPI();
  return response.data;
});

/* CREATE TODO */
export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (text: string) => {
    const response = await addTodoAPI(text);
    return response.data;
  },
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, text }: { id: string; text: string }) => {
    const response = await editTodoAPI(id, text);
    return response.data;
  },
);

/* TOGGLE TODO */
export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async (id: string) => {
    const response = await toggleTodoAPI(id);
    return response.data;
  },
);

/* DELETE TODO */
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await deleteTodoAPI(id);
    return id;
  },
);

/* CLEAR TODOS */

export const clearTodos = createAsyncThunk("todos/clearTodos", async () => {
  await clearTodosAPI();
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(editTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      /* ADD */
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })

      /* TOGGLE */
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id,
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      /* DELETE */
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      })

      /* CLEAR TODOS*/

      .addCase(clearTodos.fulfilled, (state) => {
        state.todos = [];
      });
  },
});

export default todoSlice.reducer;
