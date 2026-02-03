'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getTasks } from '@/lib/api';
import { Task } from '@/lib/types';
import Navbar from '@/components/Navbar';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    const fetchTasks = async () => {
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error: any) {
            toast.error(error.response?.data?.detail || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">My Tasks</h1>
                    <p className="text-gray-600">
                        {user.role === 'admin'
                            ? 'Admin view - You can see all tasks and delete any task'
                            : 'Manage and organize your personal tasks'}
                    </p>
                </div>

                <TaskForm onTaskCreated={fetchTasks} />

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <TaskList tasks={tasks} onTasksChange={fetchTasks} />
                )}
            </div>
        </div>
    );
}
