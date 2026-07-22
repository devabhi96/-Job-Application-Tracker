import React from 'react';
import LandingPage from './pages/LandingPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ViewApplication from './pages/ViewApplication';


import ApplicationList from './pages/ApplicationList';
import ApplicationForm from './pages/ApplicationForm';

import Login from './Login'; 
import Register from './Register';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    
    return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        
        <Route path="/" element={<LandingPage />} />

        <Route 
            path="/dashboard" 
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

        <Route
            path = "/register"
            element={<Register/>}
            /> 

  <Route 
            path ="/view/:id"
            element={
                <ProtectedRoute>
                    <ViewApplication/>
                    </ProtectedRoute>
            }
        />


      </Routes>

      

    </BrowserRouter>
  );
}

export default App;