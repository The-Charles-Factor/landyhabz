'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

// Sample student data organized by grade levels
const studentsData = {
  playgroup: [
    { id: 1, name: 'Emma Johnson', age: 3, gender: 'Female', parent: 'Sarah Johnson', contact: '555-1234', attendance: [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], performance: { motor: 'Good', social: 'Excellent', cognitive: 'Developing' }, allergies: 'None', notes: 'Loves painting' },
    { id: 2, name: 'Noah Williams', age: 3, gender: 'Male', parent: 'James Williams', contact: '555-5678', attendance: [1, 1, 1, 1, 1, 0, 0, 1, 1, 1], performance: { motor: 'Excellent', social: 'Good', cognitive: 'Good' }, allergies: 'Peanuts', notes: 'Very active' },
    { id: 3, name: 'Olivia Brown', age: 3, gender: 'Female', parent: 'Lisa Brown', contact: '555-9012', attendance: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1], performance: { motor: 'Developing', social: 'Good', cognitive: 'Excellent' }, allergies: 'None', notes: 'Quiet but observant' },
  ],
  grade1: [
    { id: 4, name: 'Liam Jones', age: 4, gender: 'Male', parent: 'Robert Jones', contact: '555-3456', attendance: [1, 0, 1, 1, 1, 1, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Developing', math: 'Excellent', social: 'Good' }, allergies: 'Dairy', notes: 'Enjoys story time' },
    { id: 5, name: 'Ava Garcia', age: 4, gender: 'Female', parent: 'Maria Garcia', contact: '555-7890', attendance: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1], performance: { reading: 'Excellent', writing: 'Good', math: 'Good', social: 'Excellent' }, allergies: 'None', notes: 'Natural leader' },
    { id: 6, name: 'Lucas Martinez', age: 4, gender: 'Male', parent: 'Carlos Martinez', contact: '555-2345', attendance: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1], performance: { reading: 'Developing', writing: 'Good', math: 'Developing', social: 'Good' }, allergies: 'Eggs', notes: 'Loves building blocks' },
    { id: 7, name: 'Mia Anderson', age: 4, gender: 'Female', parent: 'Jennifer Anderson', contact: '555-6789', attendance: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Excellent', math: 'Good', social: 'Developing' }, allergies: 'None', notes: 'Creative thinker' },
  ],
  grade2: [
    { id: 8, name: 'Ethan Taylor', age: 5, gender: 'Male', parent: 'David Taylor', contact: '555-0123', attendance: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1], performance: { reading: 'Excellent', writing: 'Good', math: 'Excellent', science: 'Good', social: 'Excellent' }, allergies: 'None', notes: 'Very curious' },
    { id: 9, name: 'Isabella Thomas', age: 5, gender: 'Female', parent: 'Patricia Thomas', contact: '555-4567', attendance: [1, 1, 0, 1, 1, 1, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Excellent', math: 'Good', science: 'Excellent', social: 'Good' }, allergies: 'Shellfish', notes: 'Great at sharing' },
    { id: 10, name: 'James Moore', age: 5, gender: 'Male', parent: 'Michael Moore', contact: '555-8901', attendance: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0], performance: { reading: 'Developing', writing: 'Good', math: 'Developing', science: 'Good', social: 'Excellent' }, allergies: 'None', notes: 'Needs encouragement' },
    { id: 11, name: 'Sophia Jackson', age: 5, gender: 'Female', parent: 'Elizabeth Jackson', contact: '555-1235', attendance: [1, 1, 1, 0, 1, 1, 1, 1, 1, 1], performance: { reading: 'Excellent', writing: 'Excellent', math: 'Good', science: 'Excellent', social: 'Good' }, allergies: 'Pollen', notes: 'Loves outdoor activities' },
  ],
  grade3: [
    { id: 12, name: 'Benjamin White', age: 6, gender: 'Male', parent: 'Richard White', contact: '555-5679', attendance: [1, 1, 1, 1, 1, 0, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Excellent', math: 'Excellent', science: 'Good', social: 'Excellent', arts: 'Good' }, allergies: 'None', notes: 'Excellent problem solver' },
    { id: 13, name: 'Charlotte Harris', age: 6, gender: 'Female', parent: 'Susan Harris', contact: '555-9013', attendance: [1, 1, 1, 1, 1, 1, 1, 0, 1, 1], performance: { reading: 'Excellent', writing: 'Good', math: 'Good', science: 'Excellent', social: 'Good', arts: 'Excellent' }, allergies: 'Bee stings', notes: 'Very artistic' },
    { id: 14, name: 'Mason Clark', age: 6, gender: 'Male', parent: 'Thomas Clark', contact: '555-3457', attendance: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Developing', math: 'Excellent', science: 'Good', social: 'Excellent', arts: 'Good' }, allergies: 'None', notes: 'Eager to learn' },
    { id: 15, name: 'Amelia Lewis', age: 6, gender: 'Female', parent: 'Nancy Lewis', contact: '555-7891', attendance: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1], performance: { reading: 'Excellent', writing: 'Excellent', math: 'Good', science: 'Excellent', social: 'Good', arts: 'Excellent' }, allergies: 'None', notes: 'Helps other students' },
    { id: 16, name: 'Elijah Robinson', age: 6, gender: 'Male', parent: 'Paul Robinson', contact: '555-2346', attendance: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1], performance: { reading: 'Good', writing: 'Good', math: 'Excellent', science: 'Good', social: 'Excellent', arts: 'Developing' }, allergies: 'Dust', notes: 'Loves science experiments' },
    { id: 17, name: 'Harper Walker', age: 6, gender: 'Female', parent: 'Michelle Walker', contact: '555-6780', attendance: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1], performance: { reading: 'Excellent', writing: 'Excellent', math: 'Excellent', science: 'Excellent', social: 'Good', arts: 'Good' }, allergies: 'None', notes: 'Very organized' },
  ]
};

// Attendance dates for the past 10 days
const attendanceDates = [];
for (let i = 9; i >= 0; i--) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  attendanceDates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
}

// Staff data
const staffData = [
  { id: 1, name: 'Jennifer Wilson', role: 'Head Teacher', contact: '555-1001', email: 'j.wilson@sunshinekg.com' },
  { id: 2, name: 'Robert Davis', role: 'Assistant Teacher', contact: '555-1002', email: 'r.davis@sunshinekg.com' },
  { id: 3, name: 'Maria Garcia', role: 'Playgroup Specialist', contact: '555-1003', email: 'm.garcia@sunshinekg.com' },
  { id: 4, name: 'David Miller', role: 'Arts Teacher', contact: '555-1004', email: 'd.miller@sunshinekg.com' },
  { id: 5, name: 'Sarah Thompson', role: 'Administrator', contact: '555-1005', email: 's.thompson@sunshinekg.com' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studentSubTab, setStudentSubTab] = useState('playgroup');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(true); // Set to true for demo
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState(studentsData);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', gender: '', parent: '', contact: '', allergies: '', notes: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [events, setEvents] = useState([
    { id: 1, title: 'Parent-Teacher Meeting', date: '2023-11-15', time: '14:00', location: 'School Hall' },
    { id: 2, title: 'Annual Day Celebration', date: '2023-11-25', time: '10:00', location: 'School Grounds' },
    { id: 3, title: 'Field Trip to Zoo', date: '2023-12-05', time: '09:00', location: 'City Zoo' },
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '' });
  const [activeSection, setActiveSection] = useState('overview');

  // Function to handle attendance marking
  const markAttendance = (grade, studentId, dayIndex, status) => {
    const updatedData = { ...attendanceData };
    const student = updatedData[grade].find(s => s.id === studentId);
    if (student) {
      student.attendance[dayIndex] = status;
      setAttendanceData(updatedData);
    }
  };

  // Function to mark all attendance for a day
  const markAllAttendance = (grade, dayIndex, status) => {
    const updatedData = { ...attendanceData };
    updatedData[grade].forEach(student => {
      student.attendance[dayIndex] = status;
    });
    setAttendanceData(updatedData);
  };

  // Function to add a new student
  const addNewStudent = () => {
    if (newStudent.name && newStudent.age && newStudent.gender && newStudent.parent && newStudent.contact) {
      const updatedData = { ...attendanceData };
      const newId = Math.max(...updatedData[studentSubTab].map(s => s.id)) + 1;
      const attendanceArray = new Array(10).fill(1); // Default all present
      
      updatedData[studentSubTab].push({
        id: newId,
        name: newStudent.name,
        age: parseInt(newStudent.age),
        gender: newStudent.gender,
        parent: newStudent.parent,
        contact: newStudent.contact,
        allergies: newStudent.allergies || 'None',
        notes: newStudent.notes || '',
        attendance: attendanceArray,
        performance: studentSubTab === 'playgroup' ? 
          { motor: 'Developing', social: 'Developing', cognitive: 'Developing' } :
          studentSubTab === 'grade1' ? 
          { reading: 'Developing', writing: 'Developing', math: 'Developing', social: 'Developing' } :
          studentSubTab === 'grade2' ?
          { reading: 'Developing', writing: 'Developing', math: 'Developing', science: 'Developing', social: 'Developing' } :
          { reading: 'Developing', writing: 'Developing', math: 'Developing', science: 'Developing', social: 'Developing', arts: 'Developing' }
      });
      
      setAttendanceData(updatedData);
      setNewStudent({ name: '', age: '', gender: '', parent: '', contact: '', allergies: '', notes: '' });
    }
  };

  // Function to add a new event
  const addNewEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const newId = Math.max(...events.map(e => e.id)) + 1;
      setEvents([...events, { id: newId, ...newEvent }]);
      setNewEvent({ title: '', date: '', time: '', location: '' });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password123') {
      setAdminLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Try admin/password123');
    }
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Calculate statistics
  const totalStudents = Object.values(attendanceData).reduce((total, grade) => total + grade.length, 0);
  const attendanceRate = Math.round(
    (Object.values(attendanceData).flatMap(grade => grade.flatMap(s => s.attendance)).filter(a => a === 1).length / 
    (totalStudents * 10)) * 100
  );

  // Get today's date for display
  const today = new Date();
  const todayFormatted = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Head>
        <title>KinderManage Pro | Kindergarten Management System</title>
        <meta name="description" content="Modern management system for kindergartens and playgroups" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm py-3 px-4 flex justify-between items-center shadow-sm z-50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v8" />
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-800">KinderManage</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <button 
            onClick={() => { setActiveTab('dashboard'); setSelectedStudent(null); }} 
            className={`transition-all duration-300 hover:scale-105 ${activeTab === 'dashboard' ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('students'); setSelectedStudent(null); }} 
            className={`transition-all duration-300 hover:scale-105 ${activeTab === 'students' ? 'text-blue-500 font-semibold' : 'text-gray-600'}`}
          >
            Students
          </button>
          <button 
            onClick={() => setActiveTab('attendance')} 
            className={`transition-all duration-300 hover:scale-105 ${activeTab === 'attendance' ? 'text-green-500 font-semibold' : 'text-gray-600'}`}
          >
            Attendance
          </button>
          <button 
            onClick={() => setActiveTab('admin')} 
            className={`transition-all duration-300 hover:scale-105 ${activeTab === 'admin' ? 'text-yellow-500 font-semibold' : 'text-gray-600'}`}
          >
            Admin
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-5 h-0.5 bg-gray-600 rounded"></span>
          <span className="w-5 h-0.5 bg-gray-600 rounded"></span>
          <span className="w-5 h-0.5 bg-gray-600 rounded"></span>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-3 px-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <button onClick={() => { setActiveTab('dashboard'); setSelectedStudent(null); setIsMenuOpen(false); }} className="text-left text-gray-600 hover:text-blue-500 transition-colors duration-300 py-1">Dashboard</button>
              <button onClick={() => { setActiveTab('students'); setSelectedStudent(null); setIsMenuOpen(false); }} className="text-left text-gray-600 hover:text-blue-500 transition-colors duration-300 py-1">Students</button>
              <button onClick={() => { setActiveTab('attendance'); setIsMenuOpen(false); }} className="text-left text-gray-600 hover:text-green-500 transition-colors duration-300 py-1">Attendance</button>
              <button onClick={() => { setActiveTab('admin'); setIsMenuOpen(false); }} className="text-left text-gray-600 hover:text-yellow-500 transition-colors duration-300 py-1">Admin</button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-16 px-4 max-w-7xl mx-auto">
        {/* Dashboard Section */}
        {activeTab === 'dashboard' && (
          <section className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            </div>
            
            <div className="mb-5">
              <p className="text-gray-600">Today is {todayFormatted}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-blue-800 text-sm mb-1">Total Students</h3>
                <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-semibold text-green-800 text-sm mb-1">Attendance Rate</h3>
                <p className="text-2xl font-bold text-green-600">{attendanceRate}%</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h3 className="font-semibold text-yellow-800 text-sm mb-1">Staff Members</h3>
                <p className="text-2xl font-bold text-yellow-600">{staffData.length}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h3 className="font-semibold text-purple-800 text-sm mb-1">Upcoming Events</h3>
                <p className="text-2xl font-bold text-purple-600">{events.length}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recent Activity</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">Attendance marked for Playgroup</p>
                    <p className="text-xs text-gray-500">Today at 9:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">New student added to Grade 1</p>
                    <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">New event added: Parent-Teacher Meeting</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Upcoming Events</h3>
              <div className="space-y-3">
                {events.slice(0, 3).map(event => (
                  <div key={event.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                    <p className="text-xs text-gray-500">{event.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Students Records Section */}
        {activeTab === 'students' && (
          <section className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Students Records</h2>
            </div>
            
            {selectedStudent ? (
              // Individual Student Detail View
              <div className="bg-gray-50 p-5 rounded-lg">
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="mb-4 flex items-center text-blue-500 hover:text-blue-700 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to student list
                </button>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-300 to-purple-300 flex items-center justify-center text-white text-xl font-bold mr-4">
                      {selectedStudent.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{selectedStudent.name}</h3>
                      <p className="text-gray-600">{selectedStudent.gender}, {selectedStudent.age} years old</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Contact Information</h4>
                      <p className="text-gray-600 text-sm">Parent: {selectedStudent.parent}</p>
                      <p className="text-gray-600 text-sm">Phone: {selectedStudent.contact}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Attendance Summary</h4>
                      <p className="text-gray-600 text-sm">
                        Present: {selectedStudent.attendance.filter(a => a === 1).length} of {selectedStudent.attendance.length} days
                      </p>
                      <p className="text-gray-600 text-sm">
                        Rate: {Math.round((selectedStudent.attendance.filter(a => a === 1).length / selectedStudent.attendance.length) * 100)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <h4 className="font-semibold text-gray-700 mb-2">Additional Information</h4>
                    <p className="text-gray-600 text-sm">Allergies: {selectedStudent.allergies}</p>
                    <p className="text-gray-600 text-sm">Notes: {selectedStudent.notes}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3">Performance Assessment</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.entries(selectedStudent.performance).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg">
                          <span className="block text-xs font-medium text-gray-600 capitalize">{key}</span>
                          <span className={`text-sm font-semibold ${
                            value === 'Excellent' ? 'text-green-600' :
                            value === 'Good' ? 'text-blue-600' :
                            value === 'Developing' ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Student List View
              <>
                <div className="flex space-x-2 mb-5 overflow-x-auto pb-2">
                  <button 
                    onClick={() => setStudentSubTab('playgroup')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'playgroup' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Playgroup ({studentsData.playgroup.length})
                  </button>
                  <button 
                    onClick={() => setStudentSubTab('grade1')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade1' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Grade 1 ({studentsData.grade1.length})
                  </button>
                  <button 
                    onClick={() => setStudentSubTab('grade2')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade2' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Grade 2 ({studentsData.grade2.length})
                  </button>
                  <button 
                    onClick={() => setStudentSubTab('grade3')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade3' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Grade 3 ({studentsData.grade3.length})
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-600">
                      <tr>
                        <th className="py-2 px-3 text-left text-sm">Name</th>
                        <th className="py-2 px-3 text-left text-sm">Age</th>
                        <th className="py-2 px-3 text-left text-sm">Gender</th>
                        <th className="py-2 px-3 text-left text-sm">Parent</th>
                        <th className="py-2 px-3 text-left text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {attendanceData[studentSubTab].map((student) => (
                        <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-2 px-3 text-sm">{student.name}</td>
                          <td className="py-2 px-3 text-sm">{student.age}</td>
                          <td className="py-2 px-3 text-sm">{student.gender}</td>
                          <td className="py-2 px-3 text-sm">{student.parent}</td>
                          <td className="py-2 px-3 text-sm">
                            <button 
                              onClick={() => setSelectedStudent(student)}
                              className="bg-blue-100 text-blue-600 py-1 px-2 rounded text-xs hover:bg-blue-200 transition-colors mr-1"
                            >
                              View
                            </button>
                            <button className="bg-gray-100 text-gray-600 py-1 px-2 rounded text-xs hover:bg-gray-200 transition-colors">
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-5 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Add New Student to {studentSubTab.replace('grade', 'Grade ')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={newStudent.age}
                      onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <select
                      value={newStudent.gender}
                      onChange={(e) => setNewStudent({...newStudent, gender: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Parent Name"
                      value={newStudent.parent}
                      onChange={(e) => setNewStudent({...newStudent, parent: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Contact"
                      value={newStudent.contact}
                      onChange={(e) => setNewStudent({...newStudent, contact: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Allergies (if any)"
                      value={newStudent.allergies}
                      onChange={(e) => setNewStudent({...newStudent, allergies: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Notes (optional)"
                    value={newStudent.notes}
                    onChange={(e) => setNewStudent({...newStudent, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-3"
                    rows="2"
                  />
                  <button
                    onClick={addNewStudent}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Add Student
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* Attendance Section */}
        {activeTab === 'attendance' && (
          <section className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Attendance Tracking</h2>
            </div>
            
            <div className="mb-5 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-blue-800 text-sm mb-2">Today's Attendance: {todayFormatted}</h3>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button 
                  onClick={() => markAllAttendance(studentSubTab, 9, 1)}
                  className="bg-green-500 text-white py-1.5 px-3 rounded text-sm hover:bg-green-600 transition-colors whitespace-nowrap"
                >
                  Mark All Present
                </button>
                <button 
                  onClick={() => markAllAttendance(studentSubTab, 9, 0)}
                  className="bg-red-500 text-white py-1.5 px-3 rounded text-sm hover:bg-red-600 transition-colors whitespace-nowrap"
                >
                  Mark All Absent
                </button>
                <button className="bg-gray-200 text-gray-700 py-1.5 px-3 rounded text-sm hover:bg-gray-300 transition-colors whitespace-nowrap">
                  Save Attendance
                </button>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-5 overflow-x-auto pb-2">
              <button 
                onClick={() => setStudentSubTab('playgroup')} 
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'playgroup' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Playgroup ({studentsData.playgroup.length})
              </button>
              <button 
                onClick={() => setStudentSubTab('grade1')} 
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade1' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Grade 1 ({studentsData.grade1.length})
              </button>
              <button 
                onClick={() => setStudentSubTab('grade2')} 
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade2' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Grade 2 ({studentsData.grade2.length})
              </button>
              <button 
                onClick={() => setStudentSubTab('grade3')} 
                className={`px-3 py-1.5 rounded-full transition-colors text-sm ${studentSubTab === 'grade3' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
              >
                Grade 3 ({studentsData.grade3.length})
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="py-2 px-3 text-left text-sm">Student Name</th>
                    {attendanceDates.slice(0, 5).map((date, index) => (
                      <th key={index} className="py-2 px-1 text-center text-xs">{date}</th>
                    ))}
                    <th className="py-2 px-3 text-center text-sm">Rate</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {attendanceData[studentSubTab].map((student) => {
                    const presentCount = student.attendance.filter(a => a === 1).length;
                    const attendanceRate = Math.round((presentCount / student.attendance.length) * 100);
                    
                    return (
                      <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-2 px-3 text-sm">{student.name}</td>
                        {student.attendance.slice(0, 5).map((attended, index) => (
                          <td key={index} className="py-2 px-1 text-center">
                            <button
                              onClick={() => markAttendance(studentSubTab, student.id, index, attended === 1 ? 0 : 1)}
                              className={`inline-block w-5 h-5 rounded-full flex items-center justify-center text-xs ${attended === 1 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                            >
                              {attended === 1 ? '✓' : '✗'}
                            </button>
                          </td>
                        ))}
                        <td className="py-2 px-3 text-center">
                          <span className={`inline-block py-1 px-2 rounded-full text-xs font-semibold ${attendanceRate >= 90 ? 'bg-green-100 text-green-800' : attendanceRate >= 80 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {attendanceRate}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-100 border border-green-300"></span>
                  <span className="text-xs text-gray-600">Present</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-100 border border-red-300"></span>
                  <span className="text-xs text-gray-600">Absent</span>
                </div>
              </div>
              <button className="bg-blue-500 text-white py-1.5 px-3 rounded text-sm hover:bg-blue-600 transition-colors">
                View Full History
              </button>
            </div>
          </section>
        )}

        {/* Admin Section */}
        {activeTab === 'admin' && (
          <section className="bg-white rounded-2xl shadow-md p-5 mb-6">
            <div className="flex items-center mb-5">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            </div>
            
            {!adminLoggedIn ? (
              <div className="max-w-md mx-auto bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 text-sm" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter password"
                    />
                  </div>
                  {loginError && (
                    <div className="mb-4 text-red-500 text-sm">{loginError}</div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Login
                  </button>
                </form>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  Demo credentials: username: <strong>admin</strong>, password: <strong>password123</strong>
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-gray-800">School Management</h3>
                  <button 
                    onClick={handleLogout}
                    className="bg-gray-200 text-gray-700 py-1.5 px-3 rounded text-sm hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                </div>
                
                <div className="flex space-x-2 mb-5 overflow-x-auto pb-2">
                  <button 
                    onClick={() => setActiveSection('overview')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${activeSection === 'overview' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveSection('staff')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${activeSection === 'staff' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Staff
                  </button>
                  <button 
                    onClick={() => setActiveSection('events')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${activeSection === 'events' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Events
                  </button>
                  <button 
                    onClick={() => setActiveSection('reports')} 
                    className={`px-3 py-1.5 rounded-full transition-colors text-sm ${activeSection === 'reports' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    Reports
                  </button>
                </div>
                
                {activeSection === 'overview' && (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <h4 className="font-semibold text-blue-800 text-xs mb-1">Total Students</h4>
                        <p className="text-xl font-bold text-blue-600">{totalStudents}</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <h4 className="font-semibold text-green-800 text-xs mb-1">Attendance Rate</h4>
                        <p className="text-xl font-bold text-green-600">{attendanceRate}%</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                        <h4 className="font-semibold text-yellow-800 text-xs mb-1">Staff Members</h4>
                        <p className="text-xl font-bold text-yellow-600">{staffData.length}</p>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                        <h4 className="font-semibold text-purple-800 text-xs mb-1">Upcoming Events</h4>
                        <p className="text-xl font-bold text-purple-600">{events.length}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 text-sm mb-3">Students by Grade</h4>
                        <div className="space-y-2">
                          {Object.entries(attendanceData).map(([grade, students]) => (
                            <div key={grade} className="flex justify-between items-center">
                              <span className="capitalize text-gray-700 text-sm">{grade.replace('grade', 'Grade ')}</span>
                              <span className="font-semibold text-sm">{students.length} students</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 text-sm mb-3">Attendance Overview</h4>
                        <div className="space-y-2">
                          {Object.entries(attendanceData).map(([grade, students]) => {
                            const presentCount = students.flatMap(s => s.attendance).filter(a => a === 1).length;
                            const totalDays = students.length * 10;
                            const rate = Math.round((presentCount / totalDays) * 100);
                            
                            return (
                              <div key={grade} className="flex justify-between items-center">
                                <span className="capitalize text-gray-700 text-sm">{grade.replace('grade', 'Grade ')}</span>
                                <span className="font-semibold text-sm">{rate}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 text-sm mb-3">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-white border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <span className="block font-semibold text-gray-800 text-sm">Send Notifications</span>
                          <span className="text-xs text-gray-600">Message parents</span>
                        </button>
                        
                        <button className="bg-white border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <span className="block font-semibold text-gray-800 text-sm">Generate Reports</span>
                          <span className="text-xs text-gray-600">Attendance, performance</span>
                        </button>
                        
                        <button className="bg-white border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <span className="block font-semibold text-gray-800 text-sm">Manage Staff</span>
                          <span className="text-xs text-gray-600">Add/edit teachers</span>
                        </button>
                        
                        <button className="bg-white border border-gray-200 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                          <span className="block font-semibold text-gray-800 text-sm">System Settings</span>
                          <span className="text-xs text-gray-600">Configure settings</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeSection === 'staff' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-3">Staff Members</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white rounded-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600">
                          <tr>
                            <th className="py-2 px-3 text-left text-sm">Name</th>
                            <th className="py-2 px-3 text-left text-sm">Role</th>
                            <th className="py-2 px-3 text-left text-sm">Contact</th>
                            <th className="py-2 px-3 text-left text-sm">Email</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          {staffData.map((staff) => (
                            <tr key={staff.id} className="border-b border-gray-200 hover:bg-gray-50">
                              <td className="py-2 px-3 text-sm">{staff.name}</td>
                              <td className="py-2 px-3 text-sm">{staff.role}</td>
                              <td className="py-2 px-3 text-sm">{staff.contact}</td>
                              <td className="py-2 px-3 text-sm">{staff.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-5 bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 text-sm mb-3">Add New Staff Member</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Role"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Contact Number"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Add Staff Member
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSection === 'events' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-3">School Events</h4>
                    <div className="space-y-3 mb-5">
                      {events.map(event => (
                        <div key={event.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-gray-800 text-sm">{event.title}</h5>
                              <p className="text-xs text-gray-600">{event.date} at {event.time}</p>
                              <p className="text-xs text-gray-500">{event.location}</p>
                            </div>
                            <button className="text-red-500 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 text-sm mb-3">Add New Event</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={newEvent.location}
                          onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      <button
                        onClick={addNewEvent}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                      >
                        Add Event
                      </button>
                    </div>
                  </div>
                )}
                
                {activeSection === 'reports' && (
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-3">Generate Reports</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-800 text-sm mb-2">Attendance Reports</h5>
                        <div className="space-y-2">
                          <button className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-100 transition-colors text-left">
                            Monthly Attendance Report
                          </button>
                          <button className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-100 transition-colors text-left">
                            Student-wise Attendance
                          </button>
                          <button className="w-full bg-blue-50 text-blue-700 py-2 px-3 rounded text-sm hover:bg-blue-100 transition-colors text-left">
                            Class-wise Attendance Summary
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-800 text-sm mb-2">Performance Reports</h5>
                        <div className="space-y-2">
                          <button className="w-full bg-green-50 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-100 transition-colors text-left">
                            Student Progress Reports
                          </button>
                          <button className="w-full bg-green-50 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-100 transition-colors text-left">
                            Class Performance Summary
                          </button>
                          <button className="w-full bg-green-50 text-green-700 py-2 px-3 rounded text-sm hover:bg-green-100 transition-colors text-left">
                            Skills Assessment Report
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800 text-sm mb-2">Export Options</h5>
                      <div className="flex space-x-3">
                        <button className="bg-white border border-gray-300 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                          Export as PDF
                        </button>
                        <button className="bg-white border border-gray-300 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                          Export as Excel
                        </button>
                        <button className="bg-white border border-gray-300 py-2 px-3 rounded text-sm hover:bg-gray-50 transition-colors">
                          Print Report
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/90 py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-sm">© 2025 KinderManage Pro - Kindergarten Management System</p>
          <div className="mt-3 flex justify-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-300 text-sm">Contact</a>
            <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-300 text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-300 text-sm">About</a>
            <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors duration-300 text-sm">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}