import React, { useState, useEffect } from 'react';
import { Vehicle, VehicleType, VehicleStatus, VehicleCondition } from '../types';
import { Icons } from '../constants';

interface VehicleFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (vehicle: Vehicle) => void;
    vehicle: Vehicle | null;
}

const formInitialState: Omit<Vehicle, 'id' | 'photos' | 'dateAdded'> = {
    type: VehicleType.Car, brand: '', model: '', plateNumber: '', orcrStatus: false, engineNumber: '',
    chassisNumber: '', year: new Date().getFullYear(), color: '', mileage: 0, fuelType: 'Gasoline',
    acquisitionCost: 0, sellingPrice: 0, condition: VehicleCondition.Used, status: VehicleStatus.Available,
};

const VehicleFormModal: React.FC<VehicleFormModalProps> = ({ isOpen, onClose, onSave, vehicle }) => {
    const [formData, setFormData] = useState(formInitialState);

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);
        } else {
            setFormData(formInitialState);
        }
    }, [vehicle, isOpen]);

    // Fix: Add type guard to check if the target is an HTMLInputElement before accessing 'checked'.
    // The 'checked' property does not exist on HTMLSelectElement, which was causing a type error.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
            setFormData(prev => ({ ...prev, [name]: e.target.checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // FIX: Correctly merge the existing vehicle data with form data on update to ensure all required properties are present.
        const vehicleToSave: Vehicle = vehicle 
            ? { ...vehicle, ...formData }
            : { 
                ...formData, 
                id: `v${Date.now()}`, 
                photos: { front: `https://picsum.photos/seed/${formData.model.replace(/\s/g, '')}/300/200`, side: `https://picsum.photos/seed/${formData.model.replace(/\s/g, '')}_side/300/200` },
                dateAdded: new Date().toISOString()
            };
        onSave(vehicleToSave);
        onClose();
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
            <div className="bg-sidebar rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-sidebar p-5 border-b border-card-border flex justify-between items-center">
                    <h3 className="text-xl font-bold">{vehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h3>
                    <button onClick={onClose} className="text-text-secondary hover:text-white">{Icons.close}</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Column 1 */}
                        <div className="space-y-4">
                            <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                                {Object.values(VehicleType).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <input type="text" name="brand" placeholder="Brand (e.g., Toyota)" value={formData.brand} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                            <input type="text" name="model" placeholder="Model (e.g., Fortuner)" value={formData.model} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" required/>
                             <input type="number" name="year" placeholder="Year Model" value={formData.year} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                             <input type="text" name="color" placeholder="Color" value={formData.color} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                             <input type="number" name="mileage" placeholder="Mileage (km)" value={formData.mileage || ''} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                             <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                                <option value="Gasoline">Gasoline</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                             </select>
                             <div className="flex items-center gap-2">
                                <input type="checkbox" name="orcrStatus" id="orcrStatus" checked={formData.orcrStatus} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"/>
                                <label htmlFor="orcrStatus" className="text-sm">OR/CR Available</label>
                             </div>
                        </div>
                        {/* Column 2 */}
                         <div className="space-y-4">
                            <input type="text" name="plateNumber" placeholder="Plate Number" value={formData.plateNumber} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                            <input type="text" name="engineNumber" placeholder="Engine Number" value={formData.engineNumber} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                            <input type="text" name="chassisNumber" placeholder="Chassis Number" value={formData.chassisNumber} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                            <input type="number" name="acquisitionCost" placeholder="Acquisition Cost" value={formData.acquisitionCost || ''} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                            <input type="number" name="sellingPrice" placeholder="Selling Price" value={formData.sellingPrice || ''} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded" />
                            <select name="condition" value={formData.condition} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                                {Object.values(VehicleCondition).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 bg-background border border-card-border rounded">
                                {Object.values(VehicleStatus).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                             <div className="p-4 bg-background rounded-lg text-center">
                                <p className="text-text-secondary text-sm">Potential Profit</p>
                                <p className="text-2xl font-bold text-green-400">₱{(formData.sellingPrice - formData.acquisitionCost).toLocaleString()}</p>
                            </div>
                         </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700 text-white">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-lg bg-primary hover:bg-blue-600 text-white">Save Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehicleFormModal;