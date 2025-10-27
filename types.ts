
export enum VehicleType {
    Car = 'Car',
    Motorcycle = 'Motorcycle',
}

export enum VehicleStatus {
    Available = 'Available',
    Sold = 'Sold',
    Reserved = 'Reserved',
}

export enum VehicleCondition {
    BrandNew = 'Brand New',
    Used = 'Used',
}

export interface Vehicle {
    id: string;
    type: VehicleType;
    brand: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    plateNumber: string;
    engineNumber: string;
    chassisNumber: string;
    orcrStatus: boolean;
    fuelType: 'Gasoline' | 'Diesel' | 'Electric';
    acquisitionCost: number;
    sellingPrice: number;
    condition: VehicleCondition;
    status: VehicleStatus;
    dateAdded: string;
    photos: {
        front: string;
        side: string;
    };
}

export interface Buyer {
    id: string;
    name: string;
    phone: string;
    email: string;
    interestedVehicleId?: string;
}

export enum PaymentTerm {
    FullCash = 'Full Cash',
    Installment = 'Installment',
    BankFinancing = 'Bank Financing',
}

export interface Sale {
    id: string;
    vehicleId: string;
    buyerId: string;
    saleDate: string;
    invoiceNumber: string;
    finalSellingPrice: number;
    paymentTerm: PaymentTerm;
    salesperson: string;
    commission: number;
}

export interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    sourceType: 'Auction' | 'Trade-in' | 'Repossessed';
}

export enum UserRole {
    Admin = 'Administrator',
    InventoryManager = 'Inventory Manager',
    SalesStaff = 'Sales Staff',
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'Active' | 'Inactive';
    avatar: string;
}