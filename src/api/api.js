import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'dc396fb0-66ab-4ec7-918c-0d405b64fa3d',
  },
});

export const todoListsApi = {
  getTodolists() {
    return instance.get('todo-lists');
  },
  postTodoList(payload) {
    return instance.post('todo-lists', payload);
  },
  deleteTodoList(todoListId) {
    return instance.delete(`todo-lists/${todoListId}`);
  },
  updateTodoList(todoListId, payload) {
    return instance.put(`todo-lists/${todoListId}`, payload);
  },
  getTasks(todoListId) {
    return instance.get(`todo-lists/${todoListId}/tasks`);
  },
  postTask(todoListId, payload) {
    return instance.post(`todo-lists/${todoListId}/tasks`, payload);
  },
  deleteTask(todoListId, taskId) {
    return instance.delete(`todo-lists/${todoListId}/tasks/${taskId}`);
  },
  updateTask(todoListId, taskId, payload) {
    return instance.put(`todo-lists/${todoListId}/tasks/${taskId}`, payload);
  },
};

export const authApi = {
  authMe() {
    return instance.get('/auth/me');
  },
  login(params) {
    return instance.post('/auth/login', params);
  },
  logout() {
    return instance.delete('/auth/login');
  },
};


/*
   deleteTask(todoListId: string, taskId: string) {

    updateTask(todoListId: string, taskId: string, payload: UpdateTaskModelType)

*/