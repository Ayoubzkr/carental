import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const closeMobileMenu = () => setIsMenuOpen(false);

  // Liens communs
  const commonLinks = (
    <>
      <NavLink to="/voitures" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Voitures
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        À propos
      </NavLink>
      <NavLink to="/faq" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        FAQ
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Contact
      </NavLink>
    </>
  );

  // Liens utilisateur
  const userLinks = (
    <>
      <NavLink to="/reservations" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Mes Réservations
      </NavLink>
      <NavLink to="/historique" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Historique
      </NavLink>
    </>
  );

  // Liens admin
  const adminLinks = (
    <>
      <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Dashboard
      </NavLink>
      <NavLink to="/admin/voitures" className={({ isActive }) => `nav-link ${isActive ? 'text-blue-400' : 'text-zinc-400 hover:text-zinc-100'}`} onClick={closeMobileMenu}>
        Voitures
      </NavLink>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              Luxury Car Rental
            </Link>

            {/* Version Desktop */}
            <div className="hidden md:flex items-center gap-6">
              {commonLinks}

              {user ? (
                <>
                  {user.is_admin ? adminLinks : userLinks}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <div className="flex gap-4">
                  <NavLink to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Connexion
                  </NavLink>
                  <NavLink to="/register" className="px-4 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors">
                    Inscription
                  </NavLink>
                </div>
              )}
            </div>

            {/* Menu Mobile */}
            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile déroulant */}
        <div className={`md:hidden bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="px-4 py-4 flex flex-col gap-4">
            {commonLinks}
            {user ? (
              <>
                {user.is_admin ? adminLinks : userLinks}
                <button
                  onClick={handleLogout}
                  className="text-left py-2 text-red-400 hover:text-red-300"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="py-2 text-blue-400 hover:text-blue-300">
                  Connexion
                </NavLink>
                <NavLink to="/register" className="py-2 text-blue-400 hover:text-blue-300">
                  Inscription
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Espaceur pour la navbar fixed */}
    </>
  );
};

export default Navbar;