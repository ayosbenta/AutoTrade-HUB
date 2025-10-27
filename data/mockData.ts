
import { Vehicle, Buyer, Sale, Supplier, User, VehicleType, VehicleStatus, VehicleCondition, PaymentTerm, UserRole } from '../types';

export const vehiclesData: Vehicle[] = [
  { id: 'v1', type: VehicleType.Car, brand: 'Toyota', model: 'Fortuner', year: 2022, color: 'White', mileage: 15000, plateNumber: 'ABC-1234', engineNumber: 'ENG123', chassisNumber: 'CHS123', orcrStatus: true, fuelType: 'Diesel', acquisitionCost: 1500000, sellingPrice: 1700000, condition: VehicleCondition.Used, status: VehicleStatus.Available, dateAdded: '2023-10-01', photos: { front: 'https://picsum.photos/seed/Fortuner/300/200', side: 'https://picsum.photos/seed/Fortuner_side/300/200' } },
  { id: 'v2', type: VehicleType.Car, brand: 'Mitsubishi', model: 'Montero Sport', year: 2021, color: 'Black', mileage: 25000, plateNumber: 'DEF-5678', engineNumber: 'ENG456', chassisNumber: 'CHS456', orcrStatus: true, fuelType: 'Diesel', acquisitionCost: 1400000, sellingPrice: 1600000, condition: VehicleCondition.Used, status: VehicleStatus.Sold, dateAdded: '2023-09-15', photos: { front: 'https://picsum.photos/seed/Montero/300/200', side: 'https://picsum.photos/seed/Montero_side/300/200' } },
  { id: 'v3', type: VehicleType.Motorcycle, brand: 'Yamaha', model: 'NMAX', year: 2023, color: 'Blue', mileage: 5000, plateNumber: 'GHI-9012', engineNumber: 'ENG789', chassisNumber: 'CHS789', orcrStatus: false, fuelType: 'Gasoline', acquisitionCost: 130000, sellingPrice: 150000, condition: VehicleCondition.Used, status: VehicleStatus.Available, dateAdded: '2023-10-05', photos: { front: 'https://picsum.photos/seed/NMAX/300/200', side: 'https://picsum.photos/seed/NMAX_side/300/200' } },
  { id: 'v4', type: VehicleType.Car, brand: 'Honda', model: 'Civic RS', year: 2023, color: 'Red', mileage: 8000, plateNumber: 'JKL-3456', engineNumber: 'ENG012', chassisNumber: 'CHS012', orcrStatus: true, fuelType: 'Gasoline', acquisitionCost: 1600000, sellingPrice: 1800000, condition: VehicleCondition.Used, status: VehicleStatus.Reserved, dateAdded: '2023-10-10', photos: { front: 'https://picsum.photos/seed/Civic/300/200', side: 'https://picsum.photos/seed/Civic_side/300/200' } },
  { id: 'v5', type: VehicleType.Motorcycle, brand: 'Honda', model: 'PCX 160', year: 2022, color: 'Matte Gray', mileage: 12000, plateNumber: 'MNO-7890', engineNumber: 'ENG345', chassisNumber: 'CHS345', orcrStatus: true, fuelType: 'Gasoline', acquisitionCost: 120000, sellingPrice: 140000, condition: VehicleCondition.Used, status: VehicleStatus.Available, dateAdded: '2023-09-20', photos: { front: 'https://picsum.photos/seed/PCX/300/200', side: 'https://picsum.photos/seed/PCX_side/300/200' } }
];

export const buyersData: Buyer[] = [
  { id: 'b1', name: 'Juan Dela Cruz', phone: '09171234567', email: 'juan@email.com', interestedVehicleId: 'v4' },
  { id: 'b2', name: 'Maria Clara', phone: '09287654321', email: 'maria@email.com' },
];

export const salesData: Sale[] = [
  { id: 's1', vehicleId: 'v2', buyerId: 'b2', saleDate: '2023-10-12', invoiceNumber: 'INV-123456', finalSellingPrice: 1580000, paymentTerm: PaymentTerm.BankFinancing, salesperson: 'Admin User', commission: 15000 },
  { id: 's2', vehicleId: 'v5', buyerId: 'b1', saleDate: '2023-11-05', invoiceNumber: 'INV-123457', finalSellingPrice: 140000, paymentTerm: PaymentTerm.FullCash, salesperson: 'Jane Smith', commission: 5000 },
];

export const suppliersData: Supplier[] = [
    { id: 'sup1', name: 'Manila Auto Auction', contactPerson: 'Mr. Sy', phone: '02-8888-9999', sourceType: 'Auction'},
    { id: 'sup2', name: 'Individual Seller (Trade-in)', contactPerson: 'Pedro Penduko', phone: '0918-111-2222', sourceType: 'Trade-in'}
];

export const usersData: User[] = [
    { id: 'u1', name: 'Admin User', email: 'admin@autorev.com', role: UserRole.Admin, status: 'Active', avatar: 'https://picsum.photos/seed/user/100/100' },
    { id: 'u2', name: 'John Doe', email: 'john@autorev.com', role: UserRole.InventoryManager, status: 'Active', avatar: 'https://picsum.photos/seed/user2/100/100' },
    { id: 'u3', name: 'Jane Smith', email: 'jane@autorev.com', role: UserRole.SalesStaff, status: 'Active', avatar: 'https://picsum.photos/seed/user3/100/100' },
    { id: 'u4', name: 'Peter Jones', email: 'peter@autorev.com', role: UserRole.SalesStaff, status: 'Inactive', avatar: 'https://picsum.photos/seed/user4/100/100' },
];


// For dashboard charts
export const monthlySalesData = [
  { name: 'Jan', Cars: 4, Motorcycles: 10 },
  { name: 'Feb', Cars: 3, Motorcycles: 8 },
  { name: 'Mar', Cars: 5, Motorcycles: 12 },
  { name: 'Apr', Cars: 4, Motorcycles: 9 },
  { name: 'May', Cars: 6, Motorcycles: 15 },
  { name: 'Jun', Cars: 5, Motorcycles: 11 },
];

export const topSellingModelsData = [
  { name: 'NMAX', sales: 35 },
  { name: 'Fortuner', sales: 25 },
  { name: 'Montero', sales: 22 },
  { name: 'PCX 160', sales: 18 },
  { name: 'Civic', sales: 15 },
];