import React, { useState, useEffect } from 'react';
import { Patient, Doctor, Appointment, MedicineOrder, BillingRecord, Language, UserSession, AmbulanceBooking, HealthReport, HospitalNotification } from './types';
import { INITIAL_DOCTORS } from './data/hospitalData';
import { translations } from './data/translations';

// Components
import RegistrationForm from './components/RegistrationForm';
import DoctorGrid from './components/DoctorGrid';
import BookingPanel from './components/BookingPanel';
import SymptomChecker from './components/SymptomChecker';
import MedicineOrderPanel from './components/MedicineOrderPanel';
import BloodDonationPanel from './components/BloodDonationPanel';
import BillingInvoice from './components/BillingInvoice';
import AdminPanel from './components/AdminPanel';
import EmergencyCommandCenter from './components/EmergencyCommandCenter';

// NEW SYSTEMS
import AuthGate from './components/AuthGate';
import AmbulanceModule from './components/AmbulanceModule';
import HealthReports from './components/HealthReports';
import DoctorDashboard from './components/DoctorDashboard';

import { 
  Building2, 
  UserPlus, 
  Stethoscope, 
  Calendar, 
  Bot, 
  Pill, 
  HeartHandshake, 
  ReceiptText, 
  ShieldAlert, 
  Code2, 
  Globe,
  Sun,
  Moon,
  Bell,
  LogOut,
  Truck,
  FolderHeart,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  
  // Enterprise Single Sign On / Auth state
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  // Modern Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hospital_dark_mode');
    return saved === 'true';
  });

  // Dynamic Tabs tracking
  const [activeTab, setActiveTab] = useState<string>('booking');

  // Pre-populated medical database directory
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "P-101",
      name: "Anil Kumble",
      age: 34,
      gender: "Male",
      bloodGroup: "A+",
      phone: "9876543210",
      location: "Ameerpet, Hyderabad",
      medicalHistory: "Incipient hypertension control",
      isDonorEligible: true
    },
    {
      id: "P-102",
      name: "Sita Mahalakshmi",
      age: 28,
      gender: "Female",
      bloodGroup: "O+",
      phone: "8876543211",
      location: "Begumpet, Secunderabad",
      medicalHistory: "Thyroid hormone monitoring",
      isDonorEligible: true
    },
    {
      id: "P-103",
      name: "Rahul Roy",
      age: 17,
      gender: "Male",
      bloodGroup: "B-",
      phone: "7876543212",
      location: "Gachibowli, Hyderabad",
      medicalHistory: "Frequent seasonal asthma",
      isDonorEligible: false
    }
  ]);

  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);

  // Pre-populated active appointments roster
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "APP-3401",
      patientId: "P-101",
      patientName: "Anil Kumble",
      doctorId: "D1",
      doctorName: "Dr. Satish Kumar",
      department: "General Medicine",
      type: "Normal",
      fee: 300,
      tokenNumber: "TKN-501",
      queuePosition: 2,
      estimatedWaitMinutes: 30,
      date: "Today (Live)",
      status: "Scheduled"
    },
    {
      id: "APP-3402",
      patientId: "P-102",
      patientName: "Sita Mahalakshmi",
      doctorId: "D2",
      doctorName: "Dr. Rama Raju",
      department: "Cardiology",
      type: "Emergency",
      fee: 500,
      tokenNumber: "TKN-502",
      queuePosition: 1,
      estimatedWaitMinutes: 5,
      date: "Today (Live)",
      status: "Scheduled"
    }
  ]);

  // Unified financial billing logs ledger
  const [billingRecords, setBillingRecords] = useState<BillingRecord[]>([
    {
      id: "INV-8101",
      patientId: "P-101",
      patientName: "Anil Kumble",
      type: "Appointment",
      amount: 300,
      details: "O.P.D Regular Consultation with Dr. Satish Kumar",
      date: "Today (Verified)",
      status: "Paid"
    },
    {
      id: "INV-8102",
      patientId: "P-102",
      patientName: "Sita Mahalakshmi",
      type: "EmergencyService",
      amount: 500,
      details: "Immediate priority Cardiac screening with Dr. Rama Raju",
      date: "Today (Deferred)",
      status: "Unpaid"
    },
    {
      id: "INV-8103",
      patientId: "P-103",
      patientName: "Rahul Roy",
      type: "MedicineOrder",
      amount: 150,
      details: "Paracetamol Drops x10 supply reorder dispatch",
      date: "Today",
      status: "Unpaid"
    }
  ]);

  // Emergency ambulance fleet tracking state
  const [activeAmbulanceBookings, setActiveAmbulanceBookings] = useState<AmbulanceBooking[]>([
    {
      id: "AMB-2010",
      patientId: "P-102",
      patientName: "Sita Mahalakshmi",
      pickupLocation: "Begumpet Circle Metro, Secunderabad",
      destinationHospital: "Custom Care Center - Cardiac Wing D",
      ambulanceType: "Advanced Cardiac Support",
      driverName: "Suresh Gowd",
      driverPhone: "+91 88776 54321",
      vehiclePlate: "TS 07 BC 8841",
      status: "En Route",
      etaMinutes: 8,
      timestamp: "10:34 AM",
      notes: "Severe breath shortness reported under cardiology."
    }
  ]);

  // Clinical health reports state
  const [healthReports, setHealthReports] = useState<HealthReport[]>([
    {
      id: "REP-4101",
      patientId: "P-101",
      title: "Comprehensive Lipids & Serum Chem Profile",
      type: "Blood Report",
      fileName: "lipids_cbc_p101_v3.pdf",
      notes: "Metabolic parameters outline:\n• Hemoglobin: 14.1 g/dL (Normal)\n• Total Triglycerides: 210 mg/dL (Abnormal HIGH • standard: <150)\n• HDL Healthy Cholesterol: 38 mg/dL (Low)",
      date: "May 22, 2026",
      uploadedBy: "MedLab Diagnostics Center, Hyderabad",
      size: "1.2 MB"
    },
    {
      id: "REP-4102",
      patientId: "P-102",
      title: "High-Freq Electrocardiogram (ECG) Graph Summary",
      type: "Scan Report",
      fileName: "ecg_trace_study_p102.pdf",
      notes: "Heart dynamic rhythm assessment:\n• Normal sinus rhythm traced with minor PAC intervals.\n• Heart rate average: 78 bpm.\nNo acute ischemic waves detected.",
      date: "May 20, 2026",
      uploadedBy: "Apollo Electro-Radiology Diagnostics",
      size: "3.4 MB"
    }
  ]);

  // Internal Hospital Notification Hub
  const [notifications, setNotifications] = useState<HospitalNotification[]>([
    {
      id: "NOT-001",
      title: "Blood Drive Crisis Needed",
      message: "Direct emergency transfusion requested for Sita Mahalakshmi (Cardiology ER). A+ or O+ blood type preferred.",
      type: "emergency",
      timestamp: "Just Now",
      isRead: false
    },
    {
      id: "NOT-002",
      title: "Clinic Consultation Called",
      message: "Anil Kumble (Token TKN-501) has been called inside General Medicine Room 3.",
      type: "reminder",
      timestamp: "8 mins ago",
      isRead: false
    },
    {
      id: "NOT-003",
      title: "Discharged Summary Signed",
      message: "Dr. Satish Kumar electronically signed digital prescriptions summary for Rahul Roy.",
      type: "general",
      timestamp: "3 hours ago",
      isRead: true
    }
  ]);

  const [showNotificationCount, setShowNotificationCount] = useState<boolean>(true);
  const [showNotifDropdown, setShowNotifDropdown] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    localStorage.setItem('hospital_dark_mode', String(isDarkMode));
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto redirect on user session role
  useEffect(() => {
    if (userSession) {
      if (userSession.role === 'Patient') {
        setActiveTab('booking');
      } else if (userSession.role === 'Doctor') {
        setActiveTab('doctor-board');
      } else {
        setActiveTab('register');
      }
    }
  }, [userSession]);

  const t = translations[language];

  // Helper callbacks to modify state

  const handleRegisterPatient = (newPatient: Patient) => {
    setPatients((prev) => [...prev, newPatient]);
    
    // Auto trigger alert notification
    const pushNotif: HospitalNotification = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: "New Patient Registered",
      message: `${newPatient.name} successfully registered with assigned record file ID ${newPatient.id}.`,
      type: 'general',
      timestamp: 'Just Now',
      isRead: false
    };
    setNotifications(prev => [pushNotif, ...prev]);

    // Flat file setup invoice
    const folderInvoice: BillingRecord = {
      id: `INV-${Math.floor(8000 + Math.random() * 900)}`,
      patientId: newPatient.id,
      patientName: newPatient.name,
      type: 'Appointment',
      amount: 100,
      details: `One-time physical record file setup fee`,
      date: 'Today (Live Registration)',
      status: 'Unpaid'
    };
    setBillingRecords((prev) => [folderInvoice, ...prev]);
  };

  const handleBookAppointment = (app: Appointment) => {
    setAppointments((prev) => [app, ...prev]);

    // Increments doctor's queue representation
    setDoctors((prev) => 
      prev.map(d => d.id === app.doctorId ? { ...d, patientsInQueue: d.patientsInQueue + 1 } : d)
    );

    // Push notification trigger
    const appNotif: HospitalNotification = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: "Appointment Booked",
      message: `Consultation confirmed under slot ${app.tokenNumber} with ${app.doctorName}. Est wait: ${app.estimatedWaitMinutes}m.`,
      type: 'reminder',
      timestamp: 'Just Now',
      isRead: false
    };
    setNotifications(prev => [appNotif, ...prev]);

    // Invoice
    const appointInvoice: BillingRecord = {
      id: `INV-${Math.floor(8000 + Math.random() * 900)}`,
      patientId: app.patientId,
      patientName: app.patientName,
      type: app.type === 'Video' ? 'VideoConsultation' : 'Appointment',
      amount: app.fee,
      details: `${app.type} Consultation Ticket (${app.tokenNumber}) with ${app.doctorName}`,
      date: 'Today',
      status: 'Unpaid'
    };
    setBillingRecords((prev) => [appointInvoice, ...prev]);
  };

  const handlePlaceOrder = (order: MedicineOrder) => {
    // Generate drug order notify alert
    const medNotif: HospitalNotification = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: "Pharma Order Dispatching",
      message: `Prescription dispatch order for ${order.patientName} has been routed to centralized pharmacy block.`,
      type: 'reminder',
      timestamp: 'Just Now',
      isRead: false
    };
    setNotifications(prev => [medNotif, ...prev]);

    // Generate Invoice
    const orderInvoice: BillingRecord = {
      id: `INV-${Math.floor(8000 + Math.random() * 900)}`,
      patientId: order.patientId,
      patientName: order.patientName,
      type: 'MedicineOrder',
      amount: order.totalAmount,
      details: `Online Pharmacy dispatch ID: ${order.id}`,
      date: 'Today',
      status: 'Unpaid'
    };
    setBillingRecords((prev) => [orderInvoice, ...prev]);
  };

  const handleRecordPayment = (id: string) => {
    setBillingRecords((prev) => 
      prev.map(rec => rec.id === id ? { ...rec, status: 'Paid' } : rec)
    );
  };

  const handleUpdateMedicalHistory = (patientId: string, historyText: string) => {
    setPatients((prev) => 
      prev.map(p => p.id === patientId ? { ...p, medicalHistory: historyText } : p)
    );
  };

  const handleRemovePatient = (patientId: string) => {
    setPatients((prev) => prev.filter(p => p.id !== patientId));
    setAppointments((prev) => prev.filter(app => app.patientId !== patientId));
    setBillingRecords((prev) => prev.filter(b => b.patientId !== patientId));
  };

  // AMBULANCE METHODS
  const handleBookAmbulance = (booking: AmbulanceBooking) => {
    setActiveAmbulanceBookings(prev => [booking, ...prev]);

    // Push alert notification
    const ambNotif: HospitalNotification = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: "ALERT: Ambulance Summoned",
      message: `Critically booked ${booking.ambulanceType} to location: ${booking.pickupLocation}. Vehicle Plate ${booking.vehiclePlate}.`,
      type: 'emergency',
      timestamp: 'Just Now',
      isRead: false
    };
    setNotifications(prev => [ambNotif, ...prev]);

    // Record emergency bill automatically
    const fee = booking.ambulanceType === 'Neonatal Critical Care' ? 1800 : booking.ambulanceType === 'Advanced Cardiac Support' ? 1500 : 800;
    const billRecord: BillingRecord = {
      id: `INV-${Math.floor(8000 + Math.random() * 900)}`,
      patientId: booking.patientId,
      patientName: booking.patientName,
      type: 'EmergencyService',
      amount: fee,
      details: `GPS Fleet dispatch - type: ${booking.ambulanceType} dispatched to ${booking.pickupLocation}`,
      date: 'Today (Live Dispatch)',
      status: 'Unpaid'
    };
    setBillingRecords(prev => [billRecord, ...prev]);
  };

  const handleUpdateAmbulanceStatus = (id: string, nextStatus: AmbulanceBooking['status'], eta: number) => {
    setActiveAmbulanceBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: nextStatus, etaMinutes: eta } : b)
    );

    // Push alert on arrival or dispatch
    if (nextStatus === 'Arrived' || nextStatus === 'Dispatched') {
      const bObj = activeAmbulanceBookings.find(b => b.id === id);
      const ambNotif: HospitalNotification = {
        id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
        title: `Ambulance ${nextStatus}`,
        message: `${bObj?.driverName || 'Driver'} reporting status "${nextStatus}" for fleet booking ID ${id}.`,
        type: 'emergency',
        timestamp: 'Just Now',
        isRead: false
      };
      setNotifications(prev => [ambNotif, ...prev]);
    }
  };

  // HEALTH REPORTS METHODS
  const handleUploadReport = (report: HealthReport) => {
    setHealthReports(prev => [report, ...prev]);

    // Notify info
    const reportNotif: HospitalNotification = {
      id: `NOT-${Math.floor(100 + Math.random() * 900)}`,
      title: "Medical Report Compiled",
      message: `Verified diagnostic entry "${report.title}" uploaded under clinical provider: ${report.uploadedBy}.`,
      type: 'general',
      timestamp: 'Just Now',
      isRead: false
    };
    setNotifications(prev => [reportNotif, ...prev]);
  };

  const handleRemoveReport = (id: string) => {
    setHealthReports(prev => prev.filter(r => r.id !== id));
  };

  // APPOINTMENTS DOCTOR ACTIONS
  const handleSetAppointmentStatus = (appId: string, status: Appointment['status']) => {
    setAppointments(prev => 
      prev.map(app => app.id === appId ? { ...app, status: status } : app)
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // FILTERED NAVIGATION TABS ACCORDING TO USER ROLE TO RESEMBLE AN ENTERPRISE
  const getNavTabsByRole = () => {
    if (!userSession) return [];

    const baseTabs = [
      { id: 'booking', label: t.bookAppointment, icon: Calendar },
      { id: 'symptoms', label: t.symptomAI, icon: Bot },
      { id: 'ambulance', label: language === 'en' ? 'Ambulance GPS' : language === 'te' ? 'అంబులెన్స్ సేవ' : 'एंबुलेंस सर्विस', icon: Truck },
      { id: 'pharmacy', label: t.pharmacy, icon: Pill },
      { id: 'reports', label: language === 'en' ? 'Health Reports' : language === 'te' ? 'ఆరోగ్య నివేదికలు' : 'स्वास्थ्य रिपोर्ट', icon: FolderHeart },
      { id: 'billing', label: t.billing, icon: ReceiptText },
    ];

    if (userSession.role === 'Patient') {
      return baseTabs;
    }

    if (userSession.role === 'Doctor') {
      return [
        { id: 'doctor-board', label: language === 'en' ? 'Consultation Desk' : language === 'te' ? 'వైద్యుని డెస్క్' : 'डॉक्टर परामर्श डेस्क', icon: Stethoscope },
        { id: 'symptoms', label: t.symptomAI, icon: Bot },
      ];
    }

    // Admin role shows all base plus configuration directories
    return [
      { id: 'register', label: t.registerPatient, icon: UserPlus },
      { id: 'doctors', label: t.docDept, icon: Stethoscope },
      { id: 'booking', label: t.bookAppointment, icon: Calendar },
      { id: 'symptoms', label: t.symptomAI, icon: Bot },
      { id: 'ambulance', label: language === 'en' ? 'Ambulance GPS' : language === 'te' ? 'అంబులెన్స్ సేవ' : 'एंबुलेंस सर्विस', icon: Truck },
      { id: 'pharmacy', label: t.pharmacy, icon: Pill },
      { id: 'reports', label: language === 'en' ? 'Health Reports' : language === 'te' ? 'ఆరోగ్య నివేదికలు' : 'स्वास्थ्य रिपोर्ट', icon: FolderHeart },
      { id: 'blood', label: t.bloodBank, icon: HeartHandshake },
      { id: 'billing', label: t.billing, icon: ReceiptText },
      { id: 'admin', label: t.adminDash, icon: ShieldAlert },
      { id: 'emergency-hub', label: language === 'en' ? 'Emergency Command' : language === 'te' ? 'అత్యవసర విభాగం' : 'आपातकालीन कमांड', icon: ShieldAlert },
    ];
  };

  // If session is null, display the elegant single Auth Gate page!
  if (!userSession) {
    return (
      <AuthGate
        language={language}
        onSetLanguage={setLanguage}
        patients={patients}
        doctors={doctors}
        onRegisterPatient={handleRegisterPatient}
        onLoginSuccess={(session) => setUserSession(session)}
      />
    );
  }

  const unreadNotifications = notifications.filter(n => !n.isRead);

  // Auto-fill pickup trigger inside symptom checker to cross-coordinate modules elegantly
  const triggerQuickSymptomAmbulance = (loc: string, notes: string) => {
    const defaultDrv = { name: "Raju Prasad", phone: "+91 90123 45678", plate: "TS 09 EA 3302" };
    const customAmb: AmbulanceBooking = {
      id: `AMB-${Math.floor(1000 + Math.random() * 9000)}`,
      patientId: userSession.id,
      patientName: userSession.name,
      pickupLocation: loc,
      destinationHospital: "Custom Care Center (Emergency ICU)",
      ambulanceType: "Advanced Cardiac Support",
      driverName: defaultDrv.name,
      driverPhone: defaultDrv.phone,
      vehiclePlate: defaultDrv.plate,
      status: 'Requested',
      etaMinutes: 10,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: notes,
    };
    handleBookAmbulance(customAmb);
    setActiveTab('ambulance');
  };

  return (
    <div id="hospital-suite-root" className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col antialiased transition-colors duration-200`}>
      
      {/* Dynamic Header with Live Notifs and theme toggles */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-850 py-4 px-6 md:px-8 sticky top-0 z-30 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-600/10 flex-shrink-0">
              H+
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 id="app-title-main" className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">Custom Care Center</h1>
                <span className="text-[9px] bg-slate-100 dark:bg-slate-800 dark:text-slate-350 text-slate-500 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono font-bold">
                  SSO v4.1
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1">{t.subtitle}</p>
            </div>
          </div>

          {/* Right Header Controls panel */}
          <div className="flex items-center gap-4 self-end sm:self-auto flex-wrap sm:flex-nowrap">
            
            {/* Multi-lingual Language Toggle Selector */}
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-850">
              {(['en', 'te', 'hi'] as const).map((langCode) => (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all uppercase cursor-pointer ${
                    language === langCode
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {langCode === 'en' ? 'EN' : langCode === 'te' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>

            {/* Dark & Light Theme Mode Switcher */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-755 rounded-xl text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-95 border border-slate-200/50 dark:border-slate-700"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-900" />}
            </button>

            {/* Interactive Real-Time Notifications Bell Popover */}
            <div className="relative">
              <button
                onClick={() => { setShowNotifDropdown(!showNotifDropdown); setShowNotificationCount(false); }}
                className="p-2 bg-slate-105 hover:bg-slate-200 dark:bg-slate-805 dark:hover:bg-slate-750 rounded-xl text-slate-600 dark:text-slate-300 transition-all cursor-pointer active:scale-95 border border-slate-200/50 dark:border-slate-705 relative"
                title="Hospital Alerts center"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadNotifications.length > 0 && showNotificationCount && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-550 rounded-full text-[9px] text-white font-bold flex items-center justify-center animate-bounce">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {/* Popover overlay dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 z-50 animate-fade-in text-xs max-h-[380px] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="font-extrabold text-slate-800 dark:text-white flex items-center gap-1">
                      🔔 Clinical Notifications
                    </span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[10px] text-blue-600 hover:underline font-bold cursor-pointer"
                    >
                      Clear All Badge
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <p className="text-slate-400 dark:text-slate-500 text-center py-6 font-medium">No new reports registered.</p>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg border flex items-start gap-2 justify-between transition-colors ${
                            n.isRead 
                              ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-850' 
                              : 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-105 dark:border-blue-900/50'
                          }`}
                        >
                          <div className="space-y-0.5">
                            <p className="font-bold flex items-center gap-1 text-slate-800 dark:text-white">
                              {n.type === 'Emergency' && <span className="h-1.5 w-1.5 bg-red-550 rounded-full animate-ping"></span>}
                              {n.title}
                            </p>
                            <p className="text-[11px] text-slate-600 dark:text-slate-350 leading-snug">{n.message}</p>
                            <span className="text-[9px] text-slate-400 font-mono block">{n.timestamp}</span>
                          </div>
                          <button
                            onClick={() => deleteNotification(n.id)}
                            className="text-slate-400 hover:text-slate-600 font-bold p-0.5 cursor-pointer text-[10px]"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-1.5 text-center text-[10px] text-slate-400">
                    Real-time clinical triggers active.
                  </div>
                </div>
              )}
            </div>

            {/* Profile Sign-out overlay */}
            <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-905 dark:text-white leading-none">{userSession.name}</p>
                <p className="text-[9px] text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wide mt-1 flex items-center gap-1 justify-end">
                  <Briefcase className="h-3 w-3" /> {userSession.role}
                </p>
              </div>

              {/* SSO Logout trigger */}
              <button
                onClick={() => { setUserSession(null); }}
                className="p-2 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 rounded-xl text-rose-600 dark:text-rose-450 transition-all cursor-pointer active:scale-95"
                title="Secure Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div id="main-content-layout" className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
        
        {/* Responsive Side Menu Navigation */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sticky top-24 shadow-sm space-y-2 flex flex-col justify-between min-h-[480px]">
            <div>
              <div className="px-3 flex justify-between items-center mb-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Workspace Menu</p>
                <span className="text-[9px] bg-slate-800 text-slate-350 px-1.5 py-0.5 rounded uppercase font-bold font-mono">
                  {userSession.role}
                </span>
              </div>
              
              <nav className="space-y-1">
                {getNavTabsByRole().map((tab) => {
                  const IconComp = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`sidebar-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`nav-menu-btn w-full px-3 py-2.5 rounded-xl text-left text-xs md:text-sm font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <IconComp className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Live Hospital Telemetry Alert Board */}
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 mt-6 space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">TRAFFIC BEACON</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-400 font-semibold">
                Logged user session: <strong className="text-white font-mono">{userSession.id}</strong>. Selected translations verified dynamic over localized dictionaries.
              </p>
            </div>
          </div>
        </aside>

        {/* Dynamic Display workspace */}
        <main className="flex-1 min-w-0">
          
          <div className="animate-fade-in">
            
            {activeTab === 'register' && (
              <RegistrationForm 
                language={language} 
                onRegister={handleRegisterPatient} 
              />
            )}

            {activeTab === 'doctors' && (
              <DoctorGrid 
                doctors={doctors} 
                language={language} 
              />
            )}

            {activeTab === 'booking' && (
              <BookingPanel 
                patients={patients} 
                doctors={doctors} 
                language={language} 
                onBookAppointment={handleBookAppointment} 
              />
            )}

            {activeTab === 'symptoms' && (
              <SymptomChecker 
                language={language} 
                onQuickAmbulance={triggerQuickSymptomAmbulance}
              />
            )}

            {activeTab === 'pharmacy' && (
              <MedicineOrderPanel 
                patients={patients} 
                language={language} 
                onPlaceOrder={handlePlaceOrder} 
              />
            )}

            {activeTab === 'blood' && (
              <BloodDonationPanel 
                patients={patients} 
                language={language} 
              />
            )}

            {activeTab === 'billing' && (
              <BillingInvoice 
                billingRecords={billingRecords.filter(b => userSession.role === 'Admin' ? true : b.patientId === userSession.id)} 
                language={language} 
                onRecordPayment={handleRecordPayment} 
              />
            )}

            {activeTab === 'admin' && (
              <AdminPanel 
                patients={patients} 
                appointments={appointments} 
                language={language} 
                onRemovePatient={handleRemovePatient} 
                onUpdateMedicalHistory={handleUpdateMedicalHistory} 
              />
            )}

            {activeTab === 'emergency-hub' && (
              <EmergencyCommandCenter 
                language={language}
                patients={patients}
                appointments={appointments}
                activeAmbulanceBookings={activeAmbulanceBookings}
                onUpdateAmbulanceStatus={handleUpdateAmbulanceStatus}
                onBookAmbulance={handleBookAmbulance}
                onSetAppointmentStatus={handleSetAppointmentStatus}
                onAddNotification={(notif) => setNotifications(prev => [notif, ...prev])}
              />
            )}

            {/* NEW ROUTED MODULES */}
            {activeTab === 'ambulance' && (
              <AmbulanceModule
                language={language}
                patients={patients}
                currentPatientId={userSession.id}
                activeBookings={activeAmbulanceBookings}
                onBookAmbulance={handleBookAmbulance}
                onUpdateBookingStatus={handleUpdateAmbulanceStatus}
              />
            )}

            {activeTab === 'reports' && (
              <HealthReports
                language={language}
                patients={patients}
                currentPatientId={userSession.id}
                activeReports={healthReports}
                onUploadReport={handleUploadReport}
                onRemoveReport={handleRemoveReport}
              />
            )}

            {activeTab === 'doctor-board' && (
              <DoctorDashboard
                language={language}
                doctorSession={{ id: userSession.id, name: userSession.name, department: userSession.extraInfo || 'Cardiology' }}
                appointments={appointments}
                patients={patients}
                billingRecords={billingRecords}
                onUpdateMedicalHistory={handleUpdateMedicalHistory}
                onRecordPayment={handlePlaceOrder as any}
                onSetAppointmentStatus={handleSetAppointmentStatus}
              />
            )}

          </div>

        </main>
      </div>

      {/* Aesthetic Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-205 dark:border-slate-850 py-5 text-center text-[10px] md:text-sm text-slate-400 dark:text-slate-500 font-sans tracking-wide mt-12 transition-colors select-none">
        <p>© 2026 Smart Healthcare Systems. All Rights Reserved. Multi-Lingual Console (ENG/HIN/TEL) & Emergency Command Center Hub V1.5</p>
      </footer>
    </div>
  );
}
