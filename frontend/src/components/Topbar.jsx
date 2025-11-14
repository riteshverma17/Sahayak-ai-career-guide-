import React from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function Topbar(){
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    // Notify app to refresh auth state
    try { window.dispatchEvent(new Event('tokenUpdated')); } catch (e) {}
    navigate('/');
  };

  return (
    <header className="w-full bg-white border-b p-3 md:p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg text-blue-600 font-semibold md:hidden">Sahayak</h2>
        <div className="relative">
          <input placeholder="Search courses, colleges, careers..." className="pl-3 pr-10 py-2 w-64 md:w-96 rounded-md border focus:ring-1 focus:ring-indigo-500" />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2">
            🔎
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button title="Notifications" className="p-2 rounded-md hover:bg-gray-100">
          <HiOutlineBell size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
            {userInitials}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">{userName}</div>
            <div className="text-xs text-gray-500">Student</div>
          </div>
          <button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
