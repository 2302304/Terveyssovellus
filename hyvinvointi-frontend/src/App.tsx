import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Layout from './components/layout/Layout';
import NutritionPage from './pages/NutritionPage';
import ExercisePage from './pages/ExercisePage';
import SleepPage from './pages/SleepPage';
import MoodPage from './pages/MoodPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Ravinto</h3>
          <p className="text-gray-600">Seuraa ruokavaliotasi ja nesteiden saantia</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Liikunta</h3>
          <p className="text-gray-600">Kirjaa harjoituksesi ja aktiivisuutesi</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2 text-purple-600">Uni</h3>
          <p className="text-gray-600">Seuraa unen laatua ja määrää</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
          <h3 className="text-xl font-semibold mb-2 text-pink-600">Mieliala</h3>
          <p className="text-gray-600">Kirjaa tuntemuksesi päivittäin</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutrition"
            element={
              <ProtectedRoute>
                <Layout>
                  <NutritionPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/exercise"
            element={
              <ProtectedRoute>
                <Layout>
                  <ExercisePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sleep"
            element={
              <ProtectedRoute>
                <Layout>
                  <SleepPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <Layout>
                  <MoodPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;