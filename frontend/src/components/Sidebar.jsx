import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineSparkles, HiOutlineUser } from 'react-icons/hi';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', icon: HiOutlineHome, path: '/dashboard' },
    { label: 'Colleges', icon: HiOutlineBookOpen, path: '/colleges' },
    { label: 'Careers', icon: HiOutlineSparkles, path: '/careers' },
    { label: 'Profile', icon: HiOutlineUser, path: '/profile' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Sahayak</h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive(item.path)
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">© 2025 Sahayak</p>
      </div>
    </aside>
  );
}
