import React, { useRef, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, Calendar, CreditCard, FileText, Bell } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={16} className="text-primary-500" />;
      case 'leave':
        return <Calendar size={16} className="text-secondary-500" />;
      case 'advance':
        return <CreditCard size={16} className="text-warning-500" />;
      case 'document':
        return <FileText size={16} className="text-success-500" />;
      case 'news':
        return <Bell size={16} className="text-error-500" />;
      default:
        return <Bell size={16} />;
    }
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    // Redirection ou autre action ici
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-neutral-200"
    >
      <div className="p-3 border-b border-neutral-200 flex items-center justify-between">
        <h3 className="font-medium text-neutral-800">Notifications</h3>
        <button
          className="text-xs text-primary-600 hover:text-primary-800"
          onClick={markAllAsRead}
        >
          Tout marquer comme lu
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-neutral-500">
            Aucune notification
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border-b border-neutral-100 hover:bg-neutral-50 cursor-pointer ${
                !notification.read ? 'bg-primary-50' : ''
              }`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-neutral-100 mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-800">
                    {notification.title}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-2 border-t border-neutral-200 bg-neutral-50 text-center">
        <a 
          href="/notifications" 
          className="text-xs text-primary-600 hover:text-primary-800"
          onClick={() => onClose()}
        >
          Voir toutes les notifications
        </a>
      </div>
    </div>
  );
};

export default NotificationDropdown;