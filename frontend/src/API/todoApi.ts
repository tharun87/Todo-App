import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:8080/api/todos"
})

export const fetchTodosAPI = () => API.get("/");
export const addTodoAPI = (text:string)=>API.post("/",{text})
export const editTodoAPI = (id:string, text:string)=>API.put(`/edit/${id}`,{text})
export const deleteTodoAPI = (id:string) => API.delete(`/${id}`);
export const clearTodosAPI = () => API.delete(`/`);
export const toggleTodoAPI = (id:string) => API.put(`/${id}`);