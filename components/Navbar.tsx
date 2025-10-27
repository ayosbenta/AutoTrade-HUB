
import React from 'react';
import { Icons } from '../constants';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-sidebar shadow-md z-10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-card-border">
        <button onClick={toggleSidebar} className="md:hidden text-text-secondary hover:text-white">
          {Icons.menu}
        </button>
        <div className="flex-1 md:flex-none">
          <div className="relative text-gray-400 focus-within:text-gray-600 hidden md:block">
            {/* Search bar can be added here */}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-text-secondary rounded-full hover:bg-gray-700 hover:text-white focus:outline-none focus:ring">
            <span className="relative">
              {Icons.bell}
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </span>
          </button>
          <div className="flex items-center space-x-2">
            <img className="h-9 w-9 rounded-full object-cover" src="https://picsum.photos/seed/user/100/100" alt="User" />
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-text-secondary">Administrator</div>
            </div>
             <button className="text-text-secondary hover:text-white">
              {Icons.chevronDown}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
