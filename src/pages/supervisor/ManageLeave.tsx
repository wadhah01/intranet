import React, { useState } from 'react';
import { Check, X, Calendar, Search, Filter, User } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import ConfirmDialog from '../../components/common/ConfirmDialog';
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
    status: RequestStatus.PENDING,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
  },
  {
    id: '2',
    employeeId: '2',
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
    employeeId: '3',
    startDate: '2025-09-15',
    endDate: '2025-09-16',
    type: LeaveType.SICK,
    reason: 'Rendez-vous médical',
    status: RequestStatus.APPROVED,
    comments: 'Approuvé. Bon rétablissement.',
    createdAt: '2025-05-14T08:00:00Z',
    updatedAt: '2025-05-14T11:45:00Z',
  },
];

// Données mockées pour les employés
const mockEmployees = [
  { id: '1', name: 'Jean Dupont' },
  { id: '2', name: 'Marie Martin' },
  { id: '3', name: 'Pierre Durand' },
];

const ManageLeave: React.FC = () => {
  const [filter, setFilter] = useState<RequestStatus | 'ALL'>('PENDING');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    id: string;
    action: 'approve' | 'reject';
    comments: string;
  }>({
    isOpen: false,
    id: '',
    action: 'approve',
    comments: '',
  });

  // Map des types de congé pour l'affichage en français
  const leaveTypeLabels: Record<LeaveType, string> = {
    [LeaveType.VACATION]: 'Congés payés',
    [LeaveType.SICK]: 'Congé maladie',
    [LeaveType.PERSONAL]: 'Congé personnel',
    [LeaveType.OTHER]: 'Autre',
  };

  // Filtrer les demandes par statut et terme de recherche
  const filteredRequests = leaveRequests
    .filter(request => filter === 'ALL' || request.status === filter)
    .filter(request => {
      const employee = mockEmployees.find(e => e.id === request.employeeId);
      return !searchTerm || 
        (employee && employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        leaveTypeLabels[request.type].toLowerCase().includes(searchTerm.toLowerCase());
    });

  // Ouvrir la boîte de dialogue de confirmation
  const openConfirmDialog = (id: string, action: 'approve' | 'reject') => {
    setConfirmDialog({
      isOpen: true,
      id,
      action,
      comments: '',
    });
  };

  // Fermer la boîte de dialogue
  const closeConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
  };

  // Mettre à jour les commentaires
  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfirmDialog({
      ...confirmDialog,
      comments: e.target.value,
    });
  };

  // Traiter la demande (approuver ou rejeter)
  const handleConfirm = () => {
    const { id, action, comments } = confirmDialog;
    
    setLeaveRequests(prev =>
      prev.map(request =>
        request.id === id
          ? {
              ...request,
              status: action === 'approve' ? RequestStatus.APPROVED : RequestStatus.REJECTED,
              comments,
              updatedAt: new Date().toISOString(),
            }
          : request
      )
    );
    
    closeConfirmDialog();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Gestion des congés</h1>
        <p className="text-neutral-600">Gérez les demandes de congé de votre équipe</p>
      </div>

      {/* Filtres et recherche */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'PENDING' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter(RequestStatus.PENDING)}
          >
            En attente
          </Button>
          <Button 
            variant={filter === 'APPROVED' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter(RequestStatus.APPROVED)}
          >
            Approuvés
          </Button>
          <Button 
            variant={filter === 'REJECTED' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter(RequestStatus.REJECTED)}
          >
            Refusés
          </Button>
          <Button 
            variant={filter === 'ALL' ? 'primary' : 'outline'} 
            size="sm"
            leftIcon={<Filter size={16} />}
            onClick={() => setFilter('ALL')}
          >
            Tous
          </Button>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-neutral-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher par employé ou type de congé..."
            className="pl-10 w-full py-2 px-4 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des demandes */}
      {filteredRequests.length === 0 ? (
        <Card>
          <div className="text-center py-6">
            <Calendar size={48} className="mx-auto text-neutral-300 mb-2" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">Aucune demande trouvée</h3>
            <p className="text-neutral-500">
              {filter === 'ALL' 
                ? "Il n'y a actuellement aucune demande de congé" 
                : `Il n'y a pas de demandes avec le statut "${filter.toLowerCase()}"`}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => {
            const employee = mockEmployees.find(e => e.id === request.employeeId);
            
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mb-4 md:mb-0 md:mr-4">
                      <div className="flex items-center mb-1">
                        <StatusBadge status={request.status} />
                        <span className="ml-3 font-medium text-neutral-800">
                          {leaveTypeLabels[request.type]}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <div className="flex items-center text-neutral-600 text-sm">
                          <User size={16} className="mr-1" />
                          <span className="font-medium">
                            {employee?.name || 'Employé inconnu'}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-neutral-600 text-sm">
                          <Calendar size={16} className="mr-1" />
                          <span>
                            Du {format(new Date(request.startDate), 'dd/MM/yyyy', { locale: fr })} au {format(new Date(request.endDate), 'dd/MM/yyyy', { locale: fr })}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-neutral-600">{request.reason}</p>
                      
                      {request.comments && (
                        <div className="mt-3 p-3 bg-neutral-50 rounded-md text-sm text-neutral-700 border-l-2 border-neutral-300">
                          <p className="font-medium mb-1">Commentaire :</p>
                          <p>{request.comments}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="self-start flex flex-col items-end">
                      <p className="text-sm text-neutral-500 mb-2">
                        Demande du {format(new Date(request.createdAt), 'dd/MM/yyyy', { locale: fr })}
                      </p>
                      
                      {request.status === RequestStatus.PENDING && (
                        <div className="flex space-x-2 mt-2">
                          <Button 
                            variant="success" 
                            size="sm"
                            leftIcon={<Check size={16} />}
                            onClick={() => openConfirmDialog(request.id, 'approve')}
                          >
                            Approuver
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm"
                            leftIcon={<X size={16} />}
                            onClick={() => openConfirmDialog(request.id, 'reject')}
                          >
                            Refuser
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Boîte de dialogue de confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={
          confirmDialog.action === 'approve'
            ? 'Approuver la demande de congé'
            : 'Refuser la demande de congé'
        }
        message={
          confirmDialog.action === 'approve'
            ? 'Êtes-vous sûr de vouloir approuver cette demande de congé ?'
            : 'Êtes-vous sûr de vouloir refuser cette demande de congé ?'
        }
        confirmLabel={confirmDialog.action === 'approve' ? 'Approuver' : 'Refuser'}
        cancelLabel="Annuler"
        onConfirm={handleConfirm}
        onCancel={closeConfirmDialog}
        variant={confirmDialog.action === 'approve' ? 'success' : 'danger'}
      >
        <div className="mt-4">
          <label htmlFor="comments" className="block text-sm font-medium text-neutral-700 mb-1">
            Ajouter un commentaire (facultatif)
          </label>
          <textarea
            id="comments"
            rows={3}
            className="w-full p-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Commentaire pour l'employé..."
            value={confirmDialog.comments}
            onChange={handleCommentsChange}
          ></textarea>
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default ManageLeave;