import React from 'react';
import { Sale, Vehicle, VehicleType, Buyer } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Icons } from '../constants';

interface ReportsProps {
    sales: Sale[];
    vehicles: Vehicle[];
    buyers: Buyer[];
}

const ReportCard: React.FC<{ title: string; value: string; icon: React.ReactElement }> = ({ title, value, icon }) => (
    <div className="bg-card border border-card-border rounded-lg p-5">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary/20 text-primary mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm text-text-secondary font-medium">{title}</p>
                <p className="text-2xl font-bold text-text-primary">{value}</p>
            </div>
        </div>
    </div>
);

const Reports: React.FC<ReportsProps> = ({ sales, vehicles, buyers }) => {
    const totalRevenue = sales.reduce((acc, s) => acc + s.finalSellingPrice, 0);
    const unitsSold = sales.length;
    
    const soldVehicles = sales.map(s => vehicles.find(v => v.id === s.vehicleId)).filter(Boolean) as Vehicle[];
    const totalPurchaseCost = soldVehicles.reduce((acc, v) => acc + v.acquisitionCost, 0);
    const totalProfit = totalRevenue - totalPurchaseCost;
    
    const carSales = soldVehicles.filter(v => v.type === VehicleType.Car).length;
    const motorcycleSales = soldVehicles.filter(v => v.type === VehicleType.Motorcycle).length;
    const avgSalePrice = unitsSold > 0 ? totalRevenue / unitsSold : 0;

    const salesByTypeData = [
        { name: 'Cars', value: carSales },
        { name: 'Motorcycles', value: motorcycleSales },
    ];
    const COLORS = ['#3b82f6', '#10b981'];

    const recentTransactions = sales
        .map(sale => {
            const vehicle = vehicles.find(v => v.id === sale.vehicleId);
            const buyer = buyers.find(b => b.id === sale.buyerId);
            return {
                ...sale,
                vehicleName: vehicle ? `${vehicle.brand} ${vehicle.model}` : 'N/A',
                buyerName: buyer ? buyer.name : 'N/A',
                profit: vehicle ? sale.finalSellingPrice - vehicle.acquisitionCost : 0
            };
        })
        .sort((a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime())
        .slice(0, 10);

    const handlePrint = () => window.print();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-text-primary">Reports</h2>
        <div className="flex gap-2">
            <button onClick={handlePrint} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Print Report</button>
            <button className="bg-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Export Data</button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportCard title="Total Sales Revenue" value={`₱${totalRevenue.toLocaleString()}`} icon={Icons.sales} />
        <ReportCard title="Total Profit" value={`₱${totalProfit.toLocaleString()}`} icon={Icons.sales} />
        <ReportCard title="Units Sold" value={unitsSold.toString()} icon={Icons.inventory} />
        <ReportCard title="Average Sale Price" value={`₱${avgSalePrice.toLocaleString(undefined, {maximumFractionDigits: 0})}`} icon={Icons.sales} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-card border border-card-border rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Sales by Vehicle Type</h3>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={salesByTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {salesByTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-card-border)' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="lg:col-span-3 bg-card border border-card-border rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-text-secondary">
                    <thead className="text-xs uppercase bg-sidebar">
                        <tr>
                            <th className="px-4 py-2">Invoice #</th>
                            <th className="px-4 py-2">Vehicle</th>
                            <th className="px-4 py-2">Buyer</th>
                            <th className="px-4 py-2 text-right">Profit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentTransactions.map(t => (
                            <tr key={t.id} className="border-b border-card-border hover:bg-gray-700/50 dark:hover:bg-gray-800">
                                <td className="px-4 py-2 font-medium">{t.invoiceNumber}</td>
                                <td className="px-4 py-2">{t.vehicleName}</td>
                                <td className="px-4 py-2">{t.buyerName}</td>
                                <td className="px-4 py-2 text-right font-medium text-green-400">₱{t.profit.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;