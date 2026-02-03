import axios from 'axios';
import {
    User,
    Task,
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    TaskCreateRequest,
    TaskUpdateRequest
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth APIs
export const registerUser = async (data: RegisterRequest): Promise<User> => {
    const response = await api.post('/api/v1/auth/register', data);
    return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<TokenResponse> => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    const response = await api.post('/api/v1/auth/login', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get('/api/v1/auth/me');
    return response.data;
};

// Task APIs
export const getTasks = async (): Promise<Task[]> => {
    const response = await api.get('/api/v1/tasks/');
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await api.get(`/api/v1/tasks/${id}`);
    return response.data;
};

export const createTask = async (data: TaskCreateRequest): Promise<Task> => {
    const response = await api.post('/api/v1/tasks/', data);
    return response.data;
};

export const updateTask = async (id: number, data: TaskUpdateRequest): Promise<Task> => {
    const response = await api.put(`/api/v1/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/api/v1/tasks/${id}`);
};

export default api;
