'Use client';

import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
}

interface UserDropdownProps {
  user: UserData;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hàm xử lý đăng xuất (sẽ gọi API tới NestJS)
  const handleLogout = () => {
    // Logic gọi API Đăng xuất
    console.log("Đăng xuất...");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Nút click để mở dropdown */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-700 transition duration-150 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-semibold">
          {user.name[0]} {/* Chữ cái đầu tên */}
        </div>
        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-xl z-50 border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          
          <div className="py-1">
            {/* Thông tin tài khoản */}
            <a 
              href="/profile" 
              className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} className="mr-3 text-blue-400" />
              Thông tin Tài khoản
            </a>
            
            {/* Nút Đăng xuất */}
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
            >
              <LogOut size={18} className="mr-3 text-red-400" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
      {/* Click ra ngoài để đóng */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  );
};

export default UserDropdown;