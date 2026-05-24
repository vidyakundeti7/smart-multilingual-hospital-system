export type Language = 'en' | 'te' | 'hi';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  phone: string;
  location: string;
  medicalHistory: string;
  isDonorEligible: boolean;
}

export type DepartmentType = 
  | 'General Medicine' 
  | 'Cardiology' 
  | 'Neurology' 
  | 'Orthopedics' 
  | 'Pediatrics' 
  | 'Emergency Care';

export interface Doctor {
  id: string;
  name: string;
  department: DepartmentType;
  experience: number;
  fee: number;
  availability: string;
  patientsInQueue: number;
  rating?: number;
}

export type AppointmentType = 'Normal' | 'EarlyBird' | 'Emergency' | 'Video';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  department: DepartmentType;
  type: AppointmentType;
  fee: number;
  tokenNumber: string;
  queuePosition: number;
  estimatedWaitMinutes: number;
  date: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  dosage: string;
  category: string;
}

export interface MedicineOrder {
  id: string;
  patientId: string;
  patientName: string;
  items: {
    medicineId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'Pending' | 'Dispensed';
}

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: 'Appointment' | 'VideoConsultation' | 'MedicineOrder' | 'EmergencyService';
  amount: number;
  details: string;
  date: string;
  status: 'Unpaid' | 'Paid';
}

export interface DonorProfile {
  patientId: string;
  name: string;
  age: number;
  bloodGroup: Patient['bloodGroup'];
  location: string;
  contact: string;
}

export interface UserSession {
  role: 'Patient' | 'Doctor' | 'Admin';
  id: string; // P-101, D1, or admin
  name: string;
  extraInfo?: string;
}

export interface AmbulanceBooking {
  id: string;
  patientId: string;
  patientName: string;
  pickupLocation: string;
  destinationHospital: string;
  ambulanceType: 'Basic Life Support' | 'Advanced Cardiac Support' | 'Neonatal Critical Care';
  driverName: string;
  driverPhone: string;
  vehiclePlate: string;
  status: 'Requested' | 'Dispatched' | 'En Route' | 'Arrived';
  etaMinutes: number;
  timestamp: string;
  notes?: string;
}

export interface HealthReport {
  id: string;
  patientId: string;
  title: string;
  type: 'Prescription' | 'Scan Report' | 'Blood Report' | 'Diag Summary';
  fileName: string;
  fileDataUrl?: string; // simulation base64 URL or description
  notes: string;
  date: string;
  uploadedBy: string;
  size: string;
}

export interface HospitalNotification {
  id: string;
  title: string;
  message: string;
  type: 'general' | 'reminder' | 'emergency';
  timestamp: string;
  isRead: boolean;
}

