import React, { useState, useMemo } from 'react';
import { Buyer } from '../types';
import BuyerFormModal from '../components/BuyerFormModal';

interface BuyersProps {
  buyers: Buyer[];
  onAddBuyer: (buyer: Buyer) => void;
  onUpdateBuyer: (buyer: Buyer) => void;
  onDeleteBuyer: (buyerId: string) => void;
}

const Buyers: React.FC<BuyersProps> = ({ buyers, onAddBuyer, onUpdateBuyer, onDeleteBuyer }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (buyer: Buyer) => {
        setEditingBuyer(buyer);
        setModalOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingBuyer(null);
        setModalOpen(true);
    };

    const filteredBuyers = useMemo(() => {
        return buyers.filter(buyer =>
            `${buyer.name} ${buyer.phone} ${buyer.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [buyers, searchTerm]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-text-primary">Buyers & Leads</h2>
                <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto">
                    Add New Buyer
                </button>
            </div>

            <div className="bg-card border border-card-border p-4 rounded-lg flex">
                <input
                    type="text"
                    placeholder="Search by name, phone, or email..."
                    className="flex-grow bg-background border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-card border border-card-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-primary uppercase bg-sidebar">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Contact Info</th>
                            <th scope="col" className="px-6 py-3">Interested In (Vehicle ID)</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBuyers.map(b => (
                            <tr key={b.id} className="border-b border-card-border hover:bg-gray-800">
                                <td className="px-6 py-4 font-medium text-text-primary">{b.name}</td>
                                <td className="px-6 py-4">
                                    <div>{b.phone}</div>
                                    <div className="text-xs">{b.email}</div>
                                </td>
                                <td className="px-6 py-4">{b.interestedVehicleId || 'N/A'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(b)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                        <button onClick={() => onDeleteBuyer(b.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <BuyerFormModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={editingBuyer ? onUpdateBuyer : onAddBuyer}
                buyer={editingBuyer}
            />
        </div>
    );
};

export default Buyers;