import React, { useState } from 'react';
import { User, MessageSquare, Search } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { mockUsers, mockPresence } from '../../mock/mockData';
import { PresenceStatus } from '../../types';
import { motion } from 'framer-motion';

const Team: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (selectedUser && messageContent.trim()) {
      // Ici, vous pouvez implémenter l'envoi du message
      console.log(`Message envoyé à ${selectedUser}: ${messageContent}`);
      setMessageContent('');
      setSelectedUser(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Mon équipe</h1>
        <p className="text-neutral-600">Consultez les membres de votre équipe et communiquez avec eux</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un membre de l'équipe..."
            className="pl-10 w-full py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User size={24} className="text-primary-700" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-neutral-800">{user.name}</h3>
                    <StatusBadge status={mockPresence[user.id] || PresenceStatus.OFFLINE} size="sm" />
                  </div>
                  <p className="text-sm text-neutral-600 mt-1">{user.position}</p>
                  <p className="text-sm text-neutral-500">{user.department}</p>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    leftIcon={<MessageSquare size={16} />}
                    onClick={() => setSelectedUser(user.id)}
                  >
                    Envoyer un message
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal d'envoi de message */}
      {selectedUser && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Envoyer un message à {mockUsers.find(u => u.id === selectedUser)?.name}
            </h3>
            
            <textarea
              className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-4"
              rows={4}
              placeholder="Écrivez votre message..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedUser(null);
                  setMessageContent('');
                }}
              >
                Annuler
              </Button>
              <Button
                variant="primary"
                onClick={handleSendMessage}
                disabled={!messageContent.trim()}
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;