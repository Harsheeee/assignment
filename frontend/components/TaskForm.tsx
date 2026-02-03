'use client';

import { useState } from 'react';
import { createTask } from '@/lib/api';
import { TaskStatus, TaskPriority } from '@/lib/types';
import toast from 'react-hot-toast';

interface TaskFormProps {
    onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.PENDING);
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createTask({ title, description, status, priority });
            toast.success('Task created successfully');
            setTitle('');
            setDescription('');
            setStatus(TaskStatus.PENDING);
            setPriority(TaskPriority.MEDIUM);
            setIsOpen(false);
            onTaskCreated();
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Failed to create task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mb-6">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    + Create New Task
                </button>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Create New Task</h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter task title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                                placeholder="Enter task description"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TaskStatus.PENDING}>Pending</option>
                                    <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                                    <option value={TaskStatus.COMPLETED}>Completed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>
                                <select
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value={TaskPriority.LOW}>Low</option>
                                    <option value={TaskPriority.MEDIUM}>Medium</option>
                                    <option value={TaskPriority.HIGH}>High</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating...' : 'Create Task'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
