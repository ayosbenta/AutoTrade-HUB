
import React from 'react';
import { NAV_ITEMS, Page, Icons } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isSidebarOpen, setSidebarOpen }) => {
  const handleNavClick = (page: Page) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
        setSidebarOpen(false);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)}></div>
      <aside className={`absolute md:relative flex flex-col bg-sidebar text-text-primary w-64 space-y-2 py-4 px-2 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex items-center justify-between px-4 h-16 border-b border-card-border">
          <h1 className="text-2xl font-bold text-white">AutoRev OS</h1>
           <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 rounded-md hover:bg-gray-700">
            {Icons.close}
          </button>
        </div>
        <nav className="flex-1 px-2 pt-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activePage === item.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
