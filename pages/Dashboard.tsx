import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { vehiclesData, salesData, monthlySalesData, topSellingModelsData } from '../data/mockData';
import { VehicleType, VehicleStatus, Vehicle } from '../types';
import { Icons } from '../constants';

// Fix: Changed JSX.Element to React.ReactElement to resolve the "Cannot find namespace 'JSX'" error.
const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-card border border-card-border rounded-lg p-5 flex items-center justify-between">
        <div>
            <p className="text-sm text-text-secondary font-medium">{title}</p>
            <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const totalVehicles = vehiclesData.length;
    const availableCars = vehiclesData.filter(v => v.type === VehicleType.Car && v.status === VehicleStatus.Available).length;
    const availableMotorcycles = vehiclesData.filter(v => v.type === VehicleType.Motorcycle && v.status === VehicleStatus.Available).length;
    const soldThisMonth = salesData.filter(s => new Date(s.saleDate).getMonth() === new Date().getMonth()).length;

    const totalRevenue = salesData.reduce((acc, sale) => acc + sale.finalSellingPrice, 0);
    const totalPurchaseCost = vehiclesData.filter(v => v.status === VehicleStatus.Sold).reduce((acc, v) => acc + v.acquisitionCost, 0);
    const profit = totalRevenue - totalPurchaseCost;

    const lowInventoryVehicles = vehiclesData.filter(v => v.status === VehicleStatus.Available).slice(0, 3); // Mock logic for low inventory

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-text-primary">Dashboard</h2>
            
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Available Motorcycles" value={availableMotorcycles.toString()} icon={Icons.motorcycle} color="bg-blue-500/20 text-blue-400" />
                <DashboardCard title="Available Cars" value={availableCars.toString()} icon={Icons.car} color="bg-green-500/20 text-green-400" />
                <DashboardCard title="Units Sold This Month" value={soldThisMonth.toString()} icon={Icons.sales} color="bg-yellow-500/20 text-yellow-400" />
                {/* FIX: Added missing icon prop to fix component prop error. */}
                <DashboardCard title="Gross Revenue" value={`₱${(totalRevenue / 1000000).toFixed(2)}M`} icon={Icons.sales} color="bg-purple-500/20 text-purple-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Sales Chart */}
                <div className="lg:col-span-2 bg-card border border-card-border rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4">Monthly Sales (Cars vs Motorcycles)</h3>
                    <div style={{ width: '100%', height: 300 }}>
                         <ResponsiveContainer>
                            <LineChart data={monthlySalesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                                <Legend />
                                <Line type="monotone" dataKey="Cars" stroke="#3b82f6" strokeWidth={2} />
                                <Line type="monotone" dataKey="Motorcycles" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Selling Models */}
                <div className="bg-card border border-card-border rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4">Top Selling Models</h3>
                     <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={topSellingModelsData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" width={80} stroke="#9ca3af" tick={{ fontSize: 12 }} />
                                <Tooltip cursor={{fill: '#374151'}} contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }} />
                                <Bar dataKey="sales" fill="#3b82f6" background={{ fill: '#374151' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profit & Loss */}
               <div className="bg-card border border-card-border rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4">Profit & Loss Tracker</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Total Revenue from Sales</span>
                      <span className="font-bold text-green-400">+ ₱{totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Total Purchase Cost (Sold Units)</span>
                      <span className="font-bold text-red-400">- ₱{totalPurchaseCost.toLocaleString()}</span>
                    </div>
                    <hr className="border-card-border"/>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-text-primary font-bold">Net Profit</span>
                      <span className={`font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>₱{profit.toLocaleString()}</span>
                    </div>
                  </div>
               </div>

                {/* Low Inventory Alerts */}
                <div className="bg-card border border-card-border rounded-lg p-5">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-400">Low Inventory Alerts</h3>
                    <ul className="space-y-3">
                        {lowInventoryVehicles.map(v => (
                           <li key={v.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-700">
                             <div>
                               <p className="font-medium text-text-primary">{v.brand} {v.model}</p>
                               <p className="text-xs text-text-secondary">{v.year} - {v.color}</p>
                             </div>
                             <span className="text-sm font-semibold text-red-500">1 Unit Left</span>
                           </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
