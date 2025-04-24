import React, { useState } from 'react';
import { Calendar, PlusCircle, Clock, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { LeaveRequest, LeaveType, RequestStatus } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

// Données mockées pour les demandes de congé
const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    startDate: '2025-08-10',
    endDate: '2025-08-24',
    type: LeaveType.VACATION,
    reason: 'Vacances d\'été',
    status: RequestStatus.APPROVED,
    comments: 'Approuvé, bon congé',
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-05T14:30:00Z',
  },
  {
    id: '2',
    employeeId: '1',
    startDate: '2025-07-03',
    endDate: '2025-07-05',
    type: LeaveType.PERSONAL,
    reason: 'Événement familial',
    status: RequestStatus.PENDING,
    createdAt: '2025-06-20T09:15:00Z',
    updatedAt: '2025-06-20T09:15:00Z',
  },
  {
    id: '3',
    employeeId: '1',
    startDate: '2025-05-15',
    endDate: '2025-05-16',
    type: LeaveType.SICK,
    reason: 'Rendez-vous médical',
    status: RequestStatus.REJECTED,
    comments: 'Merci de fournir un certificat médical',
    createdAt: '2025-05-14T08:00:00Z',
    updatedAt: '2025-05-14T11:45:00Z',
  },
];

const LeaveRequests: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [leaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);

  const filteredRequests = filter === 'ALL' 
    ? leaveRequests 
    : leaveRequests.filter(request => request.status === filter);

  // Map des types de congé pour l'affichage en français
  const leaveTypeLabels: Record<LeaveType, string> = {
    [LeaveType.VACATION]: 'Congés payés',
    [LeaveType.SICK]: 'Congé maladie',
    [LeaveType.PERSONAL]: 'Congé personnel',
    [LeaveType.OTHER]: 'Autre',
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Demandes de congé</h1>
          <p className="text-neutral-600">Gérez vos demandes de congés et suivez leur statut</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            variant="primary" 
            leftIcon={<PlusCircle size={18} />}
            onClick={() => setShowForm(!showForm)}
          >
            Nouvelle demande
          </Button>
        </div>
      </div>

      {/* Formulaire de nouvelle demande */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: showForm ? 'auto' : 0, opacity: showForm ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mb-6"
      >
        {showForm && (
          <Card className="border-primary-200 bg-primary-50">
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Nouvelle demande de congé</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Date de début
                  </label>
                  <input 
                    type="date" 
                    className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Date de fin
                  </label>
                  <input 
                    type="date" 
                    className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Type de congé
                </label>
                <select 
                  className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  {Object.values(LeaveType).map(type => (
                    <option key={type} value={type}>{leaveTypeLabels[type]}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Motif
                </label>
                <textarea 
                  className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Décrivez brièvement le motif de votre demande"
                  required
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                >
                  Soumettre la demande
                </Button>
              </div>
            </form>
          </Card>
        )}
      </motion.div>

      {/* Filtres */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Button 
          variant={filter === 'ALL' ? 'primary' : 'outline'} 
          size="sm"
          leftIcon={<Filter size={16} />}
          onClick={() => setFilter('ALL')}
        >
          Tous
        </Button>
        <Button 
          variant={filter === RequestStatus.PENDING ? 'primary' : 'outline'} 
          size="sm"
          leftIcon={<Clock size={16} />}
          onClick={() => setFilter(RequestStatus.PENDING)}
        >
          En attente
        </Button>
        <Button 
          variant={filter === RequestStatus.APPROVED ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setFilter(RequestStatus.APPROVED)}
        >
          Approuvés
        </Button>
        <Button 
          variant={filter === RequestStatus.REJECTED ? 'primary' : 'outline'} 
          size="sm"
          onClick={() => setFilter(RequestStatus.REJECTED)}
        >
          Refusés
        </Button>
      </div>

      {/* Liste des demandes */}
      {filteredRequests.length === 0 ? (
        <Card>
          <div className="text-center py-6">
            <Calendar size={48} className="mx-auto text-neutral-300 mb-2" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">Aucune demande trouvée</h3>
            <p className="text-neutral-500">
              {filter === 'ALL' 
                ? "Vous n'avez pas encore fait de demande de congé" 
                : `Vous n'avez pas de demande avec le statut "${filter.toLowerCase()}"`}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <StatusBadge status={request.status} />
                      <span className="ml-3 font-medium text-neutral-800">
                        {leaveTypeLabels[request.type]}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-neutral-600 text-sm">
                      <Calendar size={16} className="mr-1" />
                      <span>
                        Du {format(new Date(request.startDate), 'dd MMMM yyyy', { locale: fr })} au {format(new Date(request.endDate), 'dd MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-neutral-600">{request.reason}</p>
                    
                    {request.comments && (
                      <div className="mt-3 p-3 bg-neutral-50 rounded-md text-sm text-neutral-700 border-l-2 border-neutral-300">
                        <p className="font-medium mb-1">Commentaire :</p>
                        <p>{request.comments}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="self-start text-right text-sm text-neutral-500">
                    <p>Créée le {format(new Date(request.createdAt), 'dd/MM/yyyy', { locale: fr })}</p>
                    {request.status !== RequestStatus.PENDING && (
                      <p>Mise à jour le {format(new Date(request.updatedAt), 'dd/MM/yyyy', { locale: fr })}</p>
                    )}
                    
                    {request.status === RequestStatus.PENDING && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2"
                      >
                        Annuler
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;