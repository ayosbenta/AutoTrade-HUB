import React, { useState } from 'react';
import { User, UserRole } from '../types';
import UserFormModal from '../components/UserFormModal';
import { Icons } from '../constants';

interface SettingsProps {
    theme: string;
    setTheme: (theme: string) => void;
    users: User[];
    onAddUser: (user: User) => void;
    onUpdateUser: (user: User) => void;
    onDeleteUser: (userId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ theme, setTheme, users, onAddUser, onUpdateUser, onDeleteUser }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(e.target.value);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setModalOpen(true);
    };
    
    const handleAddNewUser = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const getStatusColor = (status: 'Active' | 'Inactive') => {
        return status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400';
    };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-text-primary">Settings</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* User Management */}
          <div className="bg-card border border-card-border rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">User Management</h3>
                <button onClick={handleAddNewUser} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">Add New User</button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs uppercase bg-sidebar">
                        <tr>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b border-card-border hover:bg-gray-700/50 dark:hover:bg-gray-800">
                                <td className="px-4 py-2 flex items-center gap-3">
                                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <div className="font-medium text-text-primary">{u.name}</div>
                                        <div className="text-xs">{u.email}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{u.role}</td>
                                <td className="px-4 py-2"><span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(u.status)}`}>{u.status}</span></td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditUser(u)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                        <button onClick={() => onDeleteUser(u.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
            {/* System Configuration */}
            <div className="bg-card border border-card-border rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
                <div className="space-y-2">
                    <label className="font-medium">Theme</label>
                    <fieldset className="flex gap-4">
                        <label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" id="light" name="theme" value="light" checked={theme === 'light'} onChange={handleThemeChange} className="form-radio text-primary" />
                            Light
                        </label>
                        <label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" id="dark" name="theme" value="dark" checked={theme === 'dark'} onChange={handleThemeChange} className="form-radio text-primary" />
                            Dark
                        </label>
                    </fieldset>
                </div>
            </div>
            {/* Data Management */}
            <div className="bg-card border border-card-border rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                <div className="space-y-3">
                    <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">Backup Data</button>
                    <button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Restore Data</button>
                </div>
            </div>
        </div>
      </div>
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={editingUser ? onUpdateUser : onAddUser}
        user={editingUser}
      />
    </div>
  );
};

export default Settings;