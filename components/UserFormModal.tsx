
import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { Icons } from '../constants';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: User) => void;
    user: User | null;
}

const formInitialState: Omit<User, 'id' | 'avatar'> = {
    name: '', email: '', role: UserRole.SalesStaff, status: 'Active'
};

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState(formInitialState);

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData(formInitialState);
        }
    }, [user, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userToSave: User = user 
            ? { ...user, ...formData }
            : { 
                ...formData, 
                id: `u${Date.now()}`,
                avatar: `https://picsum.photos/seed/user${Date.now()}/100/100`
            };
        onSave(userToSave);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-sidebar rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-5 border-b border-card-border flex justify-between items-center">
                    <h3 className="text-xl font-bold">{user ? 'Edit User' : 'Add New User'}</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white">{Icons.close}</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                        {Object.values(UserRole).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white">Save User</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserFormModal;