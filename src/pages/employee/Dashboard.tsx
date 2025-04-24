import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, CreditCard, Users, FileText, Bell } from 'lucide-react';
import Card from '../../components/common/Card';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const cards = [
    {
      title: 'Équipe',
      icon: <Users size={20} />,
      color: 'bg-primary-500',
      description: 'Consultez les membres de votre équipe et communiquez en temps réel',
      link: '/team',
      linkText: 'Voir l\'équipe'
    },
    {
      title: 'Messages',
      icon: <MessageSquare size={20} />,
      color: 'bg-secondary-500',
      description: 'Consultez et envoyez des messages à vos collègues',
      link: '/messages',
      linkText: 'Voir les messages',
      badge: 3
    },
    {
      title: 'Demandes de congé',
      icon: <Calendar size={20} />,
      color: 'bg-success-500',
      description: 'Soumettez et suivez vos demandes de congé',
      link: '/leave-requests',
      linkText: 'Gérer mes congés'
    },
    {
      title: 'Demandes d\'avance',
      icon: <CreditCard size={20} />,
      color: 'bg-warning-500',
      description: 'Demandez une avance sur salaire et suivez les demandes',
      link: '/cash-advance',
      linkText: 'Demander une avance'
    },
    {
      title: 'Actualités',
      icon: <Bell size={20} />,
      color: 'bg-error-500',
      description: 'Consultez les dernières actualités de l\'entreprise',
      link: '/news',
      linkText: 'Voir les actualités',
      badge: 2
    },
    {
      title: 'Documents',
      icon: <FileText size={20} />,
      color: 'bg-neutral-500',
      description: 'Accédez aux documents importants de l\'entreprise',
      link: '/documents',
      linkText: 'Voir les documents'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">
          Bienvenue, {currentUser?.name}
        </h1>
        <p className="text-neutral-600">
          Consultez vos informations et gérez vos demandes depuis votre tableau de bord
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${card.color} text-white mr-3`}>
                    {card.icon}
                  </div>
                  <h3 className="font-medium text-lg text-neutral-800">
                    {card.title}
                    {card.badge && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary-600 rounded-full">
                        {card.badge}
                      </span>
                    )}
                  </h3>
                </div>
                <p className="text-neutral-600 mb-4 flex-grow">
                  {card.description}
                </p>
                <Link to={card.link}>
                  <Button variant="outline" fullWidth>
                    {card.linkText}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card
            title="Actualités récentes"
            titleIcon={<Bell size={18} className="text-primary-600" />}
          >
            <div className="space-y-4">
              <div className="border-b border-neutral-100 pb-4">
                <h4 className="font-medium text-neutral-800 mb-1">Maintenance du système informatique</h4>
                <p className="text-sm text-neutral-600 mb-2">
                  Une maintenance est prévue ce weekend. Les systèmes seront inaccessibles de 23h à 2h du matin.
                </p>
                <p className="text-xs text-neutral-500">Il y a 2 jours</p>
              </div>
              <div className="border-b border-neutral-100 pb-4">
                <h4 className="font-medium text-neutral-800 mb-1">Mise à jour de la politique de télétravail</h4>
                <p className="text-sm text-neutral-600 mb-2">
                  Suite à la réunion du comité, de nouvelles modalités de télétravail sont mises en place.
                </p>
                <p className="text-xs text-neutral-500">Il y a 5 jours</p>
              </div>
              <div>
                <h4 className="font-medium text-neutral-800 mb-1">Nouvel outil de gestion de projet</h4>
                <p className="text-sm text-neutral-600 mb-2">
                  Formation obligatoire pour tous les employés le 15 du mois prochain.
                </p>
                <p className="text-xs text-neutral-500">Il y a 1 semaine</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card
            title="Mes demandes récentes"
            titleIcon={<Calendar size={18} className="text-primary-600" />}
          >
            <div className="space-y-4">
              <div className="border-b border-neutral-100 pb-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-neutral-800">Congés annuels</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
                    Approuvé
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-1">
                  10/08/2025 - 24/08/2025
                </p>
                <p className="text-xs text-neutral-500">Approuvé le 05/06/2025</p>
              </div>
              <div className="border-b border-neutral-100 pb-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-neutral-800">Avance sur salaire</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-700">
                    En attente
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-1">
                  500€ - Dépenses imprévues
                </p>
                <p className="text-xs text-neutral-500">Demandé le 01/06/2025</p>
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium text-neutral-800">Congé maladie</h4>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-error-50 text-error-700">
                    Refusé
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-1">
                  15/05/2025 - 16/05/2025
                </p>
                <p className="text-xs text-neutral-500">Refusé le 14/05/2025</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;