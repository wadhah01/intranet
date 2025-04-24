import React, { useState } from 'react';
import { CreditCard, PlusCircle, Filter } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import { RequestStatus } from '../../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { motion } from 'framer-motion';

// Données mockées pour les demandes d'avance
const mockAdvanceRequests = [
  {
    id: '1',
    amount: 500,
    reason: 'Dépenses imprévues',
    status: RequestStatus.PENDING,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-06-01T10:00:00Z',
  },
  {
    id: '2',
    amount: 1000,
    reason: 'Réparation voiture',
    status: RequestStatus.APPROVED,
    comments: 'Demande approuvée',
    createdAt: '2025-05-15T14:30:00Z',
    updatedAt: '2025-05-16T09:00:00Z',
  },
  {
    id: '3',
    amount: 300,
    reason: 'Achat matériel',
    status: RequestStatus.REJECTED,
    comments: 'Montant trop élevé',
    createdAt: '2025-05-01T11:20:00Z',
    updatedAt: '2025-05-02T15:45:00Z',
  },
];

const CashAdvance: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [amount, setAmount] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const filteredRequests = filter === 'ALL'
    ? mockAdvanceRequests
    : mockAdvanceRequests.filter(request => request.status === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez implémenter la soumission de la demande
    console.log('Nouvelle demande:', { amount, reason });
    setShowForm(false);
    setAmount('');
    setReason('');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Demandes d'avance</h1>
          <p className="text-neutral-600">Gérez vos demandes d'avance sur salaire</p>
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
            <h3 className="text-lg font-medium text-neutral-800 mb-4">Nouvelle demande d'avance</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Montant (€)
                </label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Motif de la demande
                </label>
                <textarea
                  className="w-full py-2 px-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
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
          Toutes
        </Button>
        <Button
          variant={filter === RequestStatus.PENDING ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter(RequestStatus.PENDING)}
        >
          En attente
        </Button>
        <Button
          variant={filter === RequestStatus.APPROVED ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter(RequestStatus.APPROVED)}
        >
          Approuvées
        </Button>
        <Button
          variant={filter === RequestStatus.REJECTED ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter(RequestStatus.REJECTED)}
        >
          Refusées
        </Button>
      </div>

      {/* Liste des demandes */}
      {filteredRequests.length === 0 ? (
        <Card>
          <div className="text-center py-6">
            <CreditCard size={48} className="mx-auto text-neutral-300 mb-2" />
            <h3 className="text-lg font-medium text-neutral-700 mb-1">Aucune demande trouvée</h3>
            <p className="text-neutral-500">
              {filter === 'ALL'
                ? "Vous n'avez pas encore fait de demande d'avance"
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
                        {request.amount} €
                      </span>
                    </div>

                    <p className="text-sm text-neutral-600">{request.reason}</p>

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

export default CashAdvance;