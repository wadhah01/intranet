import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, FileText, MessageSquare, PieChart, Clock, CreditCard, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const employeeLinks = [
    { name: 'Tableau de bord', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Équipe', path: '/team', icon: <Users size={20} /> },
    { name: 'Demandes de congé', path: '/leave-requests', icon: <Calendar size={20} /> },
    { name: 'Demandes d\'avance', path: '/cash-advance', icon: <CreditCard size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Actualités', path: '/news', icon: <FileText size={20} /> },
  ];

  const supervisorLinks = [
    { name: 'Tableau de bord', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Mon équipe', path: '/team', icon: <Users size={20} /> },
    { name: 'Gestion des congés', path: '/manage-leave', icon: <Calendar size={20} /> },
    { name: 'Gestion des avances', path: '/manage-advance', icon: <CreditCard size={20} /> },
    { name: 'Rapports', path: '/reports', icon: <PieChart size={20} /> },
    { name: 'Présence', path: '/attendance', icon: <Clock size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
    { name: 'Documents', path: '/documents', icon: <FileText size={20} /> },
  ];

  const links = currentUser?.role === UserRole.SUPERVISOR ? supervisorLinks : employeeLinks;

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          <h1 className="text-2xl font-semibold text-primary-700">Intranet</h1>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-neutral-100" 
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-4rem)]">
          <div className="p-4">
            <nav className="space-y-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActiveLink(link.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-neutral-200">
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button for mobile */}
      <button
        className="fixed bottom-4 right-4 p-3 bg-primary-600 text-white rounded-full shadow-lg z-20 lg:hidden hover:bg-primary-700 transition-colors"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;