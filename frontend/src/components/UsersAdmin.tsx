import React, { useState, useEffect } from 'react';
import { UserData } from '../utils/types';
import { AllUsers } from '../services/AdminServices';

const UsersTable = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(false);
  const [loggedInFilter, setLoggedInFilter] = useState(false);
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

  const filteredUsers = users.filter((user) => {
    if (activeFilter && user.is_active) return false;
    if (loggedInFilter && user.logged_in) return false;
    return true;
  });

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 w-full h-full lg:overflow-hidden overflow-x-auto text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
      <div className="flex justify-start mb-4">
        <button
          className={`px-4 py-2 ${activeFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white hover:scale-105' : 'bg-gray-200 dark:bg-gray-800 hover:scale-105'} mr-2 rounded-md`}
          onClick={() => setActiveFilter(!activeFilter)}
        >
          {activeFilter ? 'Show active' : 'Hide active'}
        </button>
        <button
          className={`px-4 py-2 ${loggedInFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white hover:scale-105' : 'bg-gray-200 dark:bg-gray-800 hover:scale-105'} mr-2 rounded-md`}
          onClick={() => setLoggedInFilter(!loggedInFilter)}
        >
          {loggedInFilter ? 'Show logged in' : 'Hide logged in'}
        </button>
      </div>
      <table className="w-full text-center table-auto min-w-max pl-7 ml-3">
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
        {filteredUsers.map((user) => (
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