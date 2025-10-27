import React, { useState, useMemo } from 'react';
import { Sale, Vehicle, Buyer } from '../types';
import SaleFormModal from '../components/SaleFormModal';

interface SalesProps {
  sales: Sale[];
  vehicles: Vehicle[];
  buyers: Buyer[];
  onAddSale: (sale: Sale) => void;
  onUpdateSale: (sale: Sale) => void;
  onDeleteSale: (saleId: string) => void;
}

const Sales: React.FC<SalesProps> = ({ sales, vehicles, buyers, onAddSale, onUpdateSale, onDeleteSale }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingSale, setEditingSale] = useState<Sale | null>(null);

    const handleEdit = (sale: Sale) => {
        setEditingSale(sale);
        setModalOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingSale(null);
        setModalOpen(true);
    };

    const displaySales = useMemo(() => {
        return sales.map(sale => {
            const vehicle = vehicles.find(v => v.id === sale.vehicleId);
            const buyer = buyers.find(b => b.id === sale.buyerId);
            return {
                ...sale,
                vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Unknown Vehicle',
                buyerName: buyer ? buyer.name : 'Unknown Buyer',
                profit: vehicle ? sale.finalSellingPrice - vehicle.acquisitionCost : 0,
            };
        });
    }, [sales, vehicles, buyers]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-text-primary">Sales Records</h2>
                <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto">
                    Record New Sale
                </button>
            </div>

            <div className="bg-card border border-card-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-primary uppercase bg-sidebar">
                        <tr>
                            <th scope="col" className="px-6 py-3">Invoice #</th>
                            <th scope="col" className="px-6 py-3">Vehicle</th>
                            <th scope="col" className="px-6 py-3">Buyer</th>
                            <th scope="col" className="px-6 py-3">Details</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displaySales.map(s => (
                            <tr key={s.id} className="border-b border-card-border hover:bg-gray-800">
                                <td className="px-6 py-4 font-medium text-text-primary">{s.invoiceNumber}</td>
                                <td className="px-6 py-4">
                                  <div className="font-medium text-text-primary">{s.vehicleName}</div>
                                  <div className="text-xs">{new Date(s.saleDate).toLocaleDateString()}</div>
                                </td>
                                <td className="px-6 py-4">{s.buyerName}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-primary">₱{s.finalSellingPrice.toLocaleString()}</div>
                                    <div className="text-xs text-green-400">Profit: ₱{s.profit.toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(s)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                        <button onClick={() => onDeleteSale(s.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <SaleFormModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={editingSale ? onUpdateSale : onAddSale}
                sale={editingSale}
                vehicles={vehicles}
                buyers={buyers}
            />
        </div>
    );
};

export default Sales;