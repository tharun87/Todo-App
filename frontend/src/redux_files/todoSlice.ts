import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo{
    id: string;
    task: string;
    completed: boolean;
}

const initialState: Todo[] = JSON.parse(
    localStorage.getItem("todo") || "[]"
);

const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            state.push({
                id:Date.now().toString(),
                task: action.payload,
                completed: false,
            })
        },
        toggleTodo:(state, action) => {
            const todo = state.find((t)=>t.id === action.payload);
            if(todo) todo.completed = !todo.completed; 
        },
        removeTodo:(state, action) => {
            const todo = state.filter((t) => t.id !== action.payload);
            return todo;
        },
        editTodo:(state, action: PayloadAction<{ id: string; text: string }>)=>{
            const todo = state.find(t => t.id === action.payload.id);
            if(todo){
                todo.task = action.payload.text;
            }
        },
        clearTodos:() =>{
            localStorage.removeItem("todo");
            return [];
        }
    }
})

export const {addTodo, toggleTodo, removeTodo, editTodo, clearTodos} = todoSlice.actions;
export default todoSlice.reducer;
