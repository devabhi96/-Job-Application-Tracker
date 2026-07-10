import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


// Import your existing pages
import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';
// Import the new Login component we built
import Login from './Login'; 

// 1. Create a quick wrapper to protect your private routes
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    
    // If there is no token, kick them to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    // If they have a token, let them render the page
    return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        
        <Route 
            path="/" 
            element={
                <ProtectedRoute>
                    <ApplicationList />
                </ProtectedRoute>
            } 
        />
        
        <Route 
            path="/new" 
            element={
                <ProtectedRoute>
                    <ApplicationForm />
                </ProtectedRoute>
            } 
        />
        
        <Route 
            path="/edit/:id" 
            element={
                <ProtectedRoute>
                    <ApplicationForm />
                </ProtectedRoute>
            } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;