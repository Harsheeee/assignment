'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold">
                        TaskFlow
                    </Link>

                    {user && (
                        <div className="flex items-center gap-6">
                            <div className="text-sm">
                                <span className="opacity-90">Welcome,</span>{' '}
                                <span className="font-semibold">{user.username}</span>
                                {user.role === 'admin' && (
                                    <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs rounded-full font-semibold">
                                        ADMIN
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
