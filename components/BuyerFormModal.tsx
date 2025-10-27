import React, { useState, useEffect } from 'react';
import { Buyer } from '../types';
import { Icons } from '../constants';

interface BuyerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (buyer: Buyer) => void;
    buyer: Buyer | null;
}

const formInitialState: Omit<Buyer, 'id'> = {
    name: '', phone: '', email: '', interestedVehicleId: ''
};

const BuyerFormModal: React.FC<BuyerFormModalProps> = ({ isOpen, onClose, onSave, buyer }) => {
    const [formData, setFormData] = useState(formInitialState);

    useEffect(() => {
        if (buyer) {
            setFormData(buyer);
        } else {
            setFormData(formInitialState);
        }
    }, [buyer, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const buyerToSave: Buyer = buyer 
            ? { ...buyer, ...formData }
            : { 
                ...formData, 
                id: `b${Date.now()}`
            };
        onSave(buyerToSave);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-sidebar rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-5 border-b border-card-border flex justify-between items-center">
                    <h3 className="text-xl font-bold">{buyer ? 'Edit Buyer' : 'Add New Buyer'}</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white">{Icons.close}</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="text" name="interestedVehicleId" placeholder="Interested Vehicle ID (optional)" value={formData.interestedVehicleId} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white">Save Buyer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuyerFormModal;