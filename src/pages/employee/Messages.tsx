import React, { useState } from 'react';
import { Search, Send, Paperclip } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockUsers, mockMessages } from '../../mock/mockData';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentUserId = '1'; // ID de l'employé connecté

  const filteredUsers = mockUsers.filter(user =>
    user.id !== currentUserId &&
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userMessages = mockMessages.filter(message =>
    (message.senderId === currentUserId && message.receiverId === selectedUser) ||
    (message.receiverId === currentUserId && message.senderId === selectedUser)
  );

  const handleSendMessage = () => {
    if (messageContent.trim() && selectedUser) {
      // Ici, vous pouvez implémenter l'envoi du message
      console.log(`Message envoyé à ${selectedUser}: ${messageContent}`);
      setMessageContent('');
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Messages</h1>
        <p className="text-neutral-600">Communiquez avec vos collègues en temps réel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Liste des contacts */}
        <Card className="lg:col-span-1 flex flex-col h-full">
          <div className="p-4 border-b border-neutral-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un contact..."
                className="pl-10 w-full py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map((user) => (
              <motion.button
                key={user.id}
                className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors ${
                  selectedUser === user.id ? 'bg-primary-50' : ''
                }`}
                onClick={() => setSelectedUser(user.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-neutral-800">{user.name}</p>
                    <p className="text-sm text-neutral-500">{user.position}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Zone de conversation */}
        <Card className="lg:col-span-2 flex flex-col h-full">
          {selectedUser ? (
            <>
              <div className="p-4 border-b border-neutral-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-700 font-medium">
                      {mockUsers.find(u => u.id === selectedUser)?.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-neutral-800">
                      {mockUsers.find(u => u.id === selectedUser)?.name}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {mockUsers.find(u => u.id === selectedUser)?.position}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {userMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === currentUserId
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUserId
                          ? 'text-primary-100'
                          : 'text-neutral-500'
                      }`}>
                        {format(new Date(message.createdAt), 'HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-neutral-200">
                <div className="flex space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-shrink-0"
                  >
                    <Paperclip size={20} />
                  </Button>
                  <input
                    type="text"
                    placeholder="Écrivez votre message..."
                    className="flex-1 py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-shrink-0"
                    onClick={handleSendMessage}
                    disabled={!messageContent.trim()}
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-neutral-500">
                  Sélectionnez un contact pour démarrer une conversation
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Messages;