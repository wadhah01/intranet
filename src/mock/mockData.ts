import { User, UserRole, Notification, Message, PresenceStatus } from '../types';

// Utilisateurs mockés
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'employe@entreprise.fr',
    role: UserRole.EMPLOYEE,
    department: 'Marketing',
    position: 'Chargé de communication',
    supervisorId: '4',
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@entreprise.fr',
    role: UserRole.EMPLOYEE,
    department: 'Finance',
    position: 'Comptable',
    supervisorId: '4',
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre.durand@entreprise.fr',
    role: UserRole.EMPLOYEE,
    department: 'IT',
    position: 'Développeur',
    supervisorId: '4',
  },
  {
    id: '4',
    name: 'Sophie Lambert',
    email: 'superviseur@entreprise.fr',
    role: UserRole.SUPERVISOR,
    department: 'Direction',
    position: 'Responsable d\'équipe',
  },
];

// Présence des utilisateurs
export const mockPresence: Record<string, PresenceStatus> = {
  '1': PresenceStatus.ONLINE,
  '2': PresenceStatus.OFFLINE,
  '3': PresenceStatus.AWAY,
  '4': PresenceStatus.ONLINE,
};

// Messages mockés
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '4',
    content: 'Bonjour Sophie, pouvez-vous valider le document marketing que je vous ai envoyé hier ?',
    read: true,
    createdAt: '2025-06-20T09:30:00Z',
  },
  {
    id: '2',
    senderId: '4',
    receiverId: '1',
    content: 'Bonjour Jean, je regarderai ça dans l\'après-midi. Merci !',
    read: true,
    createdAt: '2025-06-20T10:15:00Z',
  },
  {
    id: '3',
    senderId: '4',
    receiverId: '1',
    content: 'J\'ai consulté le document. Pouvez-vous modifier la section "Objectifs" avant publication ?',
    read: false,
    createdAt: '2025-06-20T14:45:00Z',
  },
];

// Notifications mockées
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    title: 'Nouveau message',
    message: 'Sophie Lambert vous a envoyé un message',
    type: 'message',
    read: false,
    relatedId: '3',
    createdAt: '2025-06-20T14:45:00Z',
  },
  {
    id: '2',
    userId: '1',
    title: 'Demande approuvée',
    message: 'Votre demande de congé a été approuvée',
    type: 'leave',
    read: false,
    relatedId: '1',
    createdAt: '2025-06-05T14:30:00Z',
  },
  {
    id: '3',
    userId: '1',
    title: 'Nouveau document',
    message: 'Politique de télétravail mise à jour',
    type: 'document',
    read: true,
    relatedId: '5',
    createdAt: '2025-06-15T11:20:00Z',
  },
  {
    id: '4',
    userId: '4',
    title: 'Nouvelle demande',
    message: 'Jean Dupont a fait une demande d\'avance',
    type: 'advance',
    read: false,
    relatedId: '2',
    createdAt: '2025-06-01T10:00:00Z',
  },
];