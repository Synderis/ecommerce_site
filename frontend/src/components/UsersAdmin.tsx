import React, { useState, useEffect } from 'react';
import { UserData } from '../utils/types';
import { AllUsers } from '../services/AdminServices';

const UsersTable = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AllUsers();
        const data = await response;
        console.log(data);
        setUsers(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 lg:dark:bg-gradient-to-b lg:dark:from-orange-300/30 lg:dark:to-blue-gray-900 w-full h-full overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max pl-7 ml-3">
      <thead>
        <tr>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">ID</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Username</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Email</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Full Name</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Active</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Created At</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Role</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Logged In</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.username}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.email}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.full_name}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.is_active ? 'Yes' : 'No'}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{new Date(user.created_at).toLocaleString()}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.role}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{user.logged_in ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default UsersTable;