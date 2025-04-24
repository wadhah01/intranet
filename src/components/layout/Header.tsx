import React, { useState } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import NotificationDropdown from '../common/NotificationDropdown';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  return (
    <header className="bg-white border-b border-neutral-200 h-16 fixed top-0 right-0 left-0 z-10 px-4 lg:left-64">
      <div className="flex items-center justify-between h-full">
        <div className="lg:hidden"></div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-neutral-100 relative"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-error-500 rounded-full">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-100"
              onClick={toggleUserMenu}
            >
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User size={18} className="text-primary-700" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-neutral-700">
                {currentUser?.name}
              </span>
              <ChevronDown size={16} className="text-neutral-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-neutral-200">
                <div className="px-4 py-2 border-b border-neutral-200">
                  <p className="text-sm font-medium text-neutral-900">{currentUser?.name}</p>
                  <p className="text-xs text-neutral-500">{currentUser?.email}</p>
                </div>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Mon profil
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                >
                  Paramètres
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-neutral-100"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;