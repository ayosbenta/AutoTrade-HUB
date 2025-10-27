import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Buyers from './pages/Buyers';
import Sales from './pages/Sales';
import Suppliers from './pages/Suppliers';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { Page } from './constants';
import { vehiclesData as initialVehicles, buyersData as initialBuyers, salesData as initialSales, suppliersData as initialSuppliers, usersData as initialUsers } from './data/mockData';
import { Vehicle, Buyer, Sale, Supplier, User, VehicleStatus } from './types';

function App() {
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  // State management for data
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [buyers, setBuyers] = useState<Buyer[]>(initialBuyers);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Vehicle CRUD
  const handleAddVehicle = (vehicle: Vehicle) => setVehicles(prev => [vehicle, ...prev]);
  const handleUpdateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles(prev => prev.map(v => v.id === updatedVehicle.id ? updatedVehicle : v));
  };
  const handleDeleteVehicle = (vehicleId: string) => setVehicles(prev => prev.filter(v => v.id !== vehicleId));

  // Buyer CRUD
  const handleAddBuyer = (buyer: Buyer) => setBuyers(prev => [buyer, ...prev]);
  const handleUpdateBuyer = (updatedBuyer: Buyer) => {
    setBuyers(prev => prev.map(b => b.id === updatedBuyer.id ? updatedBuyer : b));
  };
  const handleDeleteBuyer = (buyerId: string) => setBuyers(prev => prev.filter(b => b.id !== buyerId));

  // Sale CRUD
  const handleAddSale = (sale: Sale) => {
    setSales(prev => [sale, ...prev]);
    // Also update vehicle status to Sold
    setVehicles(prev => prev.map(v => v.id === sale.vehicleId ? { ...v, status: VehicleStatus.Sold } : v));
  };
  const handleUpdateSale = (updatedSale: Sale) => {
    setSales(prev => prev.map(s => s.id === updatedSale.id ? updatedSale : s));
  };
  const handleDeleteSale = (saleId: string) => {
    const saleToDelete = sales.find(s => s.id === saleId);
    setSales(prev => prev.filter(s => s.id !== saleId));
    // Optionally revert vehicle status to Available
    if (saleToDelete) {
      setVehicles(prev => prev.map(v => v.id === saleToDelete.vehicleId ? { ...v, status: VehicleStatus.Available } : v));
    }
  };
  
  // Supplier CRUD
  const handleAddSupplier = (supplier: Supplier) => setSuppliers(prev => [supplier, ...prev]);
  const handleUpdateSupplier = (updatedSupplier: Supplier) => {
    setSuppliers(prev => prev.map(s => s.id === updatedSupplier.id ? updatedSupplier : s));
  };
  const handleDeleteSupplier = (supplierId: string) => setSuppliers(prev => prev.filter(s => s.id !== supplierId));

  // User CRUD
  const handleAddUser = (user: User) => setUsers(prev => [user, ...prev]);
  const handleUpdateUser = (updatedUser: User) => {
      setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };
  const handleDeleteUser = (userId: string) => setUsers(prev => prev.filter(u => u.id !== userId));


  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Inventory':
        return <Inventory vehicles={vehicles} onAddVehicle={handleAddVehicle} onUpdateVehicle={handleUpdateVehicle} onDeleteVehicle={handleDeleteVehicle} />;
      case 'Buyers':
        return <Buyers buyers={buyers} onAddBuyer={handleAddBuyer} onUpdateBuyer={handleUpdateBuyer} onDeleteBuyer={handleDeleteBuyer} />;
      case 'Sales':
        return <Sales sales={sales} vehicles={vehicles} buyers={buyers} onAddSale={handleAddSale} onUpdateSale={handleUpdateSale} onDeleteSale={handleDeleteSale} />;
      case 'Suppliers':
        return <Suppliers suppliers={suppliers} onAddSupplier={handleAddSupplier} onUpdateSupplier={handleUpdateSupplier} onDeleteSupplier={handleDeleteSupplier} />;
      case 'Reports':
        return <Reports sales={sales} vehicles={vehicles} buyers={buyers} />;
      case 'Settings':
        return <Settings theme={theme} setTheme={setTheme} users={users} onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;