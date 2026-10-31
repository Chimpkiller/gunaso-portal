import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const baseUrl: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface UserProfileData {
    id: string;
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
}

export function UserProfile() {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserDetail() {
            const token = localStorage.getItem('accessToken');

            try {
                const response = await fetch(`${baseUrl}/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Failed to fetch user details.');
                }

                setUser(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUserDetail();
    }, [id]);

    return (
        <div className="max-w-2xl mx-auto p-6 font-sans">
            <div className="mb-6">
                <Link to="/users" className="text-blue-600 hover:underline text-sm font-medium">
                    &larr; Back to Users List
                </Link>
            </div>

            <h1 className="text-2xl font-bold mb-6">User Profile</h1>

            {/* Error Banner */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="text-center py-8 text-gray-500">Loading profile...</div>
            ) : !user ? (
                <div className="text-center py-8 bg-gray-50 rounded border text-gray-500">User not found.</div>
            ) : (
                /* Profile Card */
                <div className="bg-white border rounded shadow p-6 space-y-4">
                    <div className="border-b pb-4">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Full Name</span>
                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                    </div>

                    <div className="border-b pb-4">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Address</span>
                        <p className="text-md text-gray-700">{user.email}</p>
                    </div>

                    <div className="border-b pb-4">
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Role</span>
                        <p className="text-md text-gray-700 capitalize">{user.role || 'User'}</p>
                    </div>

                    <div>
                        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">User ID</span>
                        <p className="text-sm font-mono text-gray-500">{user.id}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
