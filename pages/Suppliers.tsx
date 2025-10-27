import React, { useState, useMemo } from 'react';
import { Supplier } from '../types';
import SupplierFormModal from '../components/SupplierFormModal';

interface SuppliersProps {
  suppliers: Supplier[];
  onAddSupplier: (supplier: Supplier) => void;
  onUpdateSupplier: (supplier: Supplier) => void;
  onDeleteSupplier: (supplierId: string) => void;
}

const Suppliers: React.FC<SuppliersProps> = ({ suppliers, onAddSupplier, onUpdateSupplier, onDeleteSupplier }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (supplier: Supplier) => {
        setEditingSupplier(supplier);
        setModalOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingSupplier(null);
        setModalOpen(true);
    };

    const filteredSuppliers = useMemo(() => {
        return suppliers.filter(supplier =>
            `${supplier.name} ${supplier.contactPerson} ${supplier.phone}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [suppliers, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-text-primary">Suppliers & Acquisition</h2>
                <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto">
                    Add New Supplier
                </button>
            </div>

            <div className="bg-card border border-card-border p-4 rounded-lg flex">
                <input
                    type="text"
                    placeholder="Search by name, contact..."
                    className="flex-grow bg-background border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-card border border-card-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-primary uppercase bg-sidebar">
                        <tr>
                            <th scope="col" className="px-6 py-3">Supplier Name</th>
                            <th scope="col" className="px-6 py-3">Contact Person</th>
                            <th scope="col" className="px-6 py-3">Source Type</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map(s => (
                            <tr key={s.id} className="border-b border-card-border hover:bg-gray-800">
                                <td className="px-6 py-4 font-medium text-text-primary">{s.name}</td>
                                <td className="px-6 py-4">
                                    <div>{s.contactPerson}</div>
                                    <div className="text-xs">{s.phone}</div>
                                </td>
                                <td className="px-6 py-4">{s.sourceType}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(s)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                        <button onClick={() => onDeleteSupplier(s.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <SupplierFormModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={editingSupplier ? onUpdateSupplier : onAddSupplier}
                supplier={editingSupplier}
            />
        </div>
    );
};

export default Suppliers;