import React, { useState, useEffect } from 'react';
import { Supplier } from '../types';
import { Icons } from '../constants';

interface SupplierFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (supplier: Supplier) => void;
    supplier: Supplier | null;
}

const formInitialState: Omit<Supplier, 'id'> = {
    name: '', contactPerson: '', phone: '', sourceType: 'Auction'
};

const SupplierFormModal: React.FC<SupplierFormModalProps> = ({ isOpen, onClose, onSave, supplier }) => {
    const [formData, setFormData] = useState(formInitialState);

    useEffect(() => {
        if (supplier) {
            setFormData(supplier);
        } else {
            setFormData(formInitialState);
        }
    }, [supplier, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const supplierToSave: Supplier = supplier 
            ? { ...supplier, ...formData }
            : { 
                ...formData, 
                id: `sup${Date.now()}`
            };
        onSave(supplierToSave);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-sidebar rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-5 border-b border-card-border flex justify-between items-center">
                    <h3 className="text-xl font-bold">{supplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white">{Icons.close}</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input type="text" name="name" placeholder="Supplier Name" value={formData.name} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="text" name="contactPerson" placeholder="Contact Person" value={formData.contactPerson} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <select name="sourceType" value={formData.sourceType} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                        <option value="Auction">Auction</option>
                        <option value="Trade-in">Trade-in</option>
                        <option value="Repossessed">Repossessed</option>
                    </select>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white">Save Supplier</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SupplierFormModal;