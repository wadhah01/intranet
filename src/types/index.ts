// Types d'utilisateur
export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  SUPERVISOR = 'SUPERVISOR',
}

// Informations utilisateur
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  position: string;
  avatar?: string;
  supervisorId?: string;
}

// État de présence
export enum PresenceStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
}

// État des demandes
export enum RequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

// Types de congés
export enum LeaveType {
  VACATION = 'VACATION',
  SICK = 'SICK',
  PERSONAL = 'PERSONAL',
  OTHER = 'OTHER',
}

// Demande de congé
export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: LeaveType;
  reason: string;
  status: RequestStatus;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

// Demande d'avance
export interface CashAdvanceRequest {
  id: string;
  employeeId: string;
  amount: number;
  reason: string;
  status: RequestStatus;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

// Message
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  attachment?: string;
  read: boolean;
  createdAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'leave' | 'advance' | 'news' | 'document';
  read: boolean;
  relatedId?: string;
  createdAt: string;
}

// Document d'entreprise
export interface CompanyDocument {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  uploadedBy: string;
  category: string;
  createdAt: string;
}

// Actualité d'entreprise
export interface CompanyNews {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
}

// Réponse d'API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}