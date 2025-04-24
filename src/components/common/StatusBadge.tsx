import React from 'react';
import { RequestStatus, PresenceStatus } from '../../types';

interface StatusBadgeProps {
  status: RequestStatus | PresenceStatus;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let bgColor = '';
  let textColor = '';
  let label = '';

  // Définir les couleurs et les libellés en fonction du statut
  switch (status) {
    // Statuts de demande
    case RequestStatus.PENDING:
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      label = 'En attente';
      break;
    case RequestStatus.APPROVED:
      bgColor = 'bg-success-50';
      textColor = 'text-success-700';
      label = 'Approuvé';
      break;
    case RequestStatus.REJECTED:
      bgColor = 'bg-error-50';
      textColor = 'text-error-700';
      label = 'Refusé';
      break;
    
    // Statuts de présence
    case PresenceStatus.ONLINE:
      bgColor = 'bg-success-50';
      textColor = 'text-success-700';
      label = 'En ligne';
      break;
    case PresenceStatus.OFFLINE:
      bgColor = 'bg-neutral-100';
      textColor = 'text-neutral-700';
      label = 'Hors ligne';
      break;
    case PresenceStatus.AWAY:
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      label = 'Absent';
      break;
    
    default:
      bgColor = 'bg-neutral-100';
      textColor = 'text-neutral-700';
      label = 'Inconnu';
  }

  // Classes de taille
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-sm px-2.5 py-0.5';

  return (
    <span className={`inline-flex items-center rounded-full ${bgColor} ${textColor} ${sizeClasses} font-medium`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${textColor.replace('text', 'bg')}`}></span>
      {label}
    </span>
  );
};

export default StatusBadge;