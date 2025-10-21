import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
              Hyvinvointisovellus
            </Link>

            <div className="flex gap-6 items-center">
              <Link
                to="/dashboard"
                className={`hover:text-blue-600 transition ${
                  isActive('/dashboard') ? 'text-blue-600 font-semibold' : 'text-gray-600'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/nutrition"
                className={`hover:text-blue-600 transition ${
                  isActive('/nutrition') ? 'text-blue-600 font-semibold' : 'text-gray-600'
                }`}
              >
                Ravinto
              </Link>
              <Link
                to="/exercise"
                className={`hover:text-green-600 transition ${
                  isActive('/exercise') ? 'text-green-600 font-semibold' : 'text-gray-600'
                }`}
              >
                Liikunta
              </Link>
              <Link
                to="/sleep"
                className={`hover:text-purple-600 transition ${
                  isActive('/sleep') ? 'text-purple-600 font-semibold' : 'text-gray-600'
                }`}
              >
                Uni
              </Link>
              <Link
                to="/mood"
                className={`hover:text-pink-600 transition ${
                  isActive('/mood') ? 'text-pink-600 font-semibold' : 'text-gray-600'
                }`}
              >
                Mieliala
              </Link>

              <div className="flex items-center gap-4 ml-6 border-l pl-6">
                <span className="text-gray-600">
                  Hei, {user?.profile.firstName || user?.email}!
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Kirjaudu ulos
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;