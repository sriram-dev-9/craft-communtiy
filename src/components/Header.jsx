import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiImage, FiUsers, FiBook, FiLogIn } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const { user } = useAuth();
  const navigate = useNavigate();

  // const navItems = [
  //   { name: 'Home', icon: FiHome },
  //   { name: 'Gallery', icon: FiImage },
  //   { name: 'Community', icon: FiUsers },
  //   { name: 'Guides', icon: FiBook }
  // ];

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleGoToApp = () => {
    navigate('/app');
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b-4 border-minecraft-grass"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-12 h-12 bg-minecraft-grass border-2 border-minecraft-leaves pixelated"></div>
              <h1 className="minecraft-font text-white text-xl md:text-2xl">
                CraftCommunity
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {/* {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className="flex items-center space-x-2 text-white hover:text-minecraft-gold transition-colors"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="minecraft-font text-sm">{item.name}</span>
                </motion.a>
              ))} */}
              
              {/* Auth Buttons */}
              {user ? (
                <motion.button
                  onClick={handleGoToApp}
                  className="minecraft-button bg-minecraft-gold text-black px-4 py-2 font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to App
                </motion.button>
              ) : (
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => handleAuthClick('signin')}
                    className="flex items-center space-x-2 text-white hover:text-minecraft-gold transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    <SafeIcon icon={FiLogIn} className="w-4 h-4" />
                    <span className="minecraft-font text-sm">Sign In</span>
                  </motion.button>
                  <motion.button
                    onClick={() => handleAuthClick('signup')}
                    className="minecraft-button bg-minecraft-gold text-black px-4 py-2 font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Now
                  </motion.button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav 
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {/* {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={`#${item.name.toLowerCase()}`}
                  className="flex items-center space-x-3 text-white py-3 border-b border-white/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <SafeIcon icon={item.icon} className="w-4 h-4" />
                  <span className="minecraft-font text-sm">{item.name}</span>
                </motion.a>
              ))} */}
              
              {/* Mobile Auth Buttons */}
              {user ? (
                <motion.button
                  onClick={() => { handleGoToApp(); setIsMenuOpen(false); }}
                  className="w-full text-left flex items-center space-x-3 text-minecraft-gold py-3 border-b border-white/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <SafeIcon icon={FiHome} className="w-4 h-4" />
                  <span className="minecraft-font text-sm">Go to App</span>
                </motion.button>
              ) : (
                <>
                  <motion.button
                    onClick={() => { handleAuthClick('signin'); setIsMenuOpen(false); }}
                    className="w-full text-left flex items-center space-x-3 text-white py-3 border-b border-white/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <SafeIcon icon={FiLogIn} className="w-4 h-4" />
                    <span className="minecraft-font text-sm">Sign In</span>
                  </motion.button>
                  <motion.button
                    onClick={() => { handleAuthClick('signup'); setIsMenuOpen(false); }}
                    className="w-full text-left flex items-center space-x-3 text-minecraft-gold py-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <SafeIcon icon={FiUsers} className="w-4 h-4" />
                    <span className="minecraft-font text-sm">Join Now</span>
                  </motion.button>
                </>
              )}
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
};

export default Header;