'use client';

import { Task, TaskStatus, TaskPriority, TaskUpdateRequest } from '@/lib/types';
import { useState } from 'react';
import { updateTask, deleteTask } from '@/lib/api';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

interface TaskListProps {
    tasks: Task[];
    onTasksChange: () => void;
}

export default function TaskList({ tasks, onTasksChange }: TaskListProps) {
    const { user } = useAuth();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editData, setEditData] = useState<TaskUpdateRequest>({});

    const handleEdit = (task: Task) => {
        setEditingId(task.id);
        setEditData({
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
        });
    };

    const handleSave = async (id: number) => {
        try {
            await updateTask(id, editData);
            toast.success('Task updated successfully');
            setEditingId(null);
            onTasksChange();
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Failed to update task');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await deleteTask(id);
            toast.success('Task deleted successfully');
            onTasksChange();
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Failed to delete task');
        }
    };

    const getStatusColor = (status: TaskStatus) => {
        switch (status) {
            case TaskStatus.PENDING:
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case TaskStatus.IN_PROGRESS:
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case TaskStatus.COMPLETED:
                return 'bg-green-100 text-green-800 border-green-300';
        }
    };

    const getPriorityColor = (priority: TaskPriority) => {
        switch (priority) {
            case TaskPriority.LOW:
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case TaskPriority.MEDIUM:
                return 'bg-orange-100 text-orange-800 border-orange-300';
            case TaskPriority.HIGH:
                return 'bg-red-100 text-red-800 border-red-300';
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
                >
                    {editingId === task.id ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editData.title}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <textarea
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                            />
                            <div className="flex gap-4">
                                <select
                                    value={editData.status}
                                    onChange={(e) => setEditData({ ...editData, status: e.target.value as TaskStatus })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TaskStatus.PENDING}>Pending</option>
                                    <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                                    <option value={TaskStatus.COMPLETED}>Completed</option>
                                </select>
                                <select
                                    value={editData.priority}
                                    onChange={(e) => setEditData({ ...editData, priority: e.target.value as TaskPriority })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TaskPriority.LOW}>Low</option>
                                    <option value={TaskPriority.MEDIUM}>Medium</option>
                                    <option value={TaskPriority.HIGH}>High</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSave(task.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
                                <div className="flex gap-2">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
                                        {task.status.replace('_', ' ').toUpperCase()}
                                    </span>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                                        {task.priority.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            {task.description && (
                                <p className="text-gray-600 mb-4">{task.description}</p>
                            )}
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(task)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    {user?.role === 'admin' && (
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
