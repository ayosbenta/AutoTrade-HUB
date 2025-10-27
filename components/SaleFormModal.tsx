import React, { useState, useEffect } from 'react';
import { Sale, Vehicle, Buyer, PaymentTerm, VehicleStatus } from '../types';
import { Icons } from '../constants';

interface SaleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (sale: Sale) => void;
    sale: Sale | null;
    vehicles: Vehicle[];
    buyers: Buyer[];
}

const formInitialState: Omit<Sale, 'id' | 'saleDate' | 'invoiceNumber'> = {
    vehicleId: '', buyerId: '', finalSellingPrice: 0, paymentTerm: PaymentTerm.FullCash, salesperson: '', commission: 0,
};

const SaleFormModal: React.FC<SaleFormModalProps> = ({ isOpen, onClose, onSave, sale, vehicles, buyers }) => {
    const [formData, setFormData] = useState(formInitialState);
    
    const availableVehicles = vehicles.filter(v => v.status === VehicleStatus.Available || (sale && v.id === sale.vehicleId));

    useEffect(() => {
        if (sale) {
            setFormData(sale);
        } else {
            setFormData(formInitialState);
        }
    }, [sale, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const saleToSave: Sale = sale 
            ? { ...sale, ...formData }
            : { 
                ...formData, 
                id: `s${Date.now()}`,
                invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
                saleDate: new Date().toISOString()
            };
        onSave(saleToSave);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-sidebar rounded-lg shadow-xl w-full max-w-lg">
                <div className="p-5 border-b border-card-border flex justify-between items-center">
                    <h3 className="text-xl font-bold">{sale ? 'Edit Sale Record' : 'Record New Sale'}</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white">{Icons.close}</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <select name="vehicleId" value={formData.vehicleId} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required>
                        <option value="">Select Vehicle</option>
                        {availableVehicles.map(v => <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.plateNumber})</option>)}
                    </select>
                     <select name="buyerId" value={formData.buyerId} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required>
                        <option value="">Select Buyer</option>
                        {buyers.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                    <input type="number" name="finalSellingPrice" placeholder="Final Selling Price" value={formData.finalSellingPrice} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <select name="paymentTerm" value={formData.paymentTerm} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                        {Object.values(PaymentTerm).map(pt => <option key={pt} value={pt}>{pt}</option>)}
                    </select>
                    <input type="text" name="salesperson" placeholder="Salesperson" value={formData.salesperson} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                    <input type="number" name="commission" placeholder="Commission" value={formData.commission} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white">Save Sale</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SaleFormModal;