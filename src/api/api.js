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
        return instance.post(`todo-lists//${todoListId}/tasks`, payload);
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


/*export const todoListsApi = {
    getTodolists() {
        return instance.get<TodoListType[]>('todo-lists');
    },
    postTodoList(payload: { title: string }) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListType }>>>
        ('todo-lists', payload);
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
    },
    updateTodoList(todoListId: string, payload: { title: string }) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}`, payload);
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`);
    },
    postTask(todoListId: string, payload: { title: string }) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskTypeAPI }>>>
        (`todo-lists//${todoListId}/tasks`, payload);
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
    },
    updateTask(todoListId: string, taskId: string, payload: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskTypeAPI }>>>(
            `todo-lists/${todoListId}/tasks/${taskId}`, payload);
    },
};*/