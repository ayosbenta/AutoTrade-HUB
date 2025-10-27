
import React, { useState, useMemo } from 'react';
import { Vehicle, VehicleStatus, VehicleType } from '../types';
import VehicleFormModal from '../components/VehicleFormModal';

interface InventoryProps {
  vehicles: Vehicle[];
  onAddVehicle: (vehicle: Vehicle) => void;
  onUpdateVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (vehicleId: string) => void;
}

const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
        case VehicleStatus.Available: return 'bg-green-500/20 text-green-400';
        case VehicleStatus.Sold: return 'bg-red-500/20 text-red-400';
        case VehicleStatus.Reserved: return 'bg-yellow-500/20 text-yellow-400';
    }
};

const Inventory: React.FC<InventoryProps> = ({ vehicles, onAddVehicle, onUpdateVehicle, onDeleteVehicle }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ type: string; status: string }>({ type: 'all', status: 'all' });

    const handleEdit = (vehicle: Vehicle) => {
        setEditingVehicle(vehicle);
        setModalOpen(true);
    };
    
    const handleAddNew = () => {
        setEditingVehicle(null);
        setModalOpen(true);
    };

    const filteredVehicles = useMemo(() => {
        return vehicles.filter(vehicle => {
            const matchesSearch = `${vehicle.brand} ${vehicle.model} ${vehicle.plateNumber} ${vehicle.year}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesType = filters.type === 'all' || vehicle.type === filters.type;
            const matchesStatus = filters.status === 'all' || vehicle.status === filters.status;
            return matchesSearch && matchesType && matchesStatus;
        });
    }, [vehicles, searchTerm, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'search') {
            setSearchTerm(value);
        } else {
            setFilters(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold text-text-primary">Inventory Management</h2>
                <button onClick={handleAddNew} className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full md:w-auto">
                    Add New Vehicle
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-card-border p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    name="search"
                    placeholder="Search by brand, model, plate..."
                    className="flex-grow bg-background border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    onChange={handleFilterChange}
                />
                <div className="flex gap-4 w-full md:w-auto">
                   <select name="type" onChange={handleFilterChange} className="bg-background border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary w-full">
                        <option value="all">All Types</option>
                        <option value={VehicleType.Car}>Cars</option>
                        <option value={VehicleType.Motorcycle}>Motorcycles</option>
                    </select>
                    <select name="status" onChange={handleFilterChange} className="bg-background border border-card-border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary w-full">
                        <option value="all">All Statuses</option>
                        <option value={VehicleStatus.Available}>Available</option>
                        <option value={VehicleStatus.Sold}>Sold</option>
                        <option value={VehicleStatus.Reserved}>Reserved</option>
                    </select>
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-card border border-card-border rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs text-text-primary uppercase bg-sidebar">
                        <tr>
                            <th scope="col" className="px-6 py-3">Vehicle</th>
                            <th scope="col" className="px-6 py-3">Details</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map(v => (
                            <tr key={v.id} className="border-b border-card-border hover:bg-gray-800">
                                <td className="px-6 py-4 flex items-center gap-4">
                                    <img src={v.photos.front} alt={`${v.brand} ${v.model}`} className="w-20 h-14 object-cover rounded-md"/>
                                    <div>
                                        <div className="font-medium text-text-primary">{v.brand} {v.model}</div>
                                        <div className="text-xs">{v.year} - {v.color}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">Plate: {v.plateNumber}</div>
                                    <div className="text-xs">Mileage: {v.mileage.toLocaleString()} km</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-text-primary">₱{v.sellingPrice.toLocaleString()}</div>
                                    <div className="text-xs text-green-400">Profit: ₱{(v.sellingPrice - v.acquisitionCost).toLocaleString()}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(v.status)}`}>
                                        {v.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(v)} className="text-blue-400 hover:text-blue-300">Edit</button>
                                        <button onClick={() => onDeleteVehicle(v.id)} className="text-red-400 hover:text-red-300">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <VehicleFormModal 
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={editingVehicle ? onUpdateVehicle : onAddVehicle}
                vehicle={editingVehicle}
            />
        </div>
    );
};

export default Inventory;
