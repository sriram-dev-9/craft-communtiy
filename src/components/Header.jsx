import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiHome, FiImage, FiUsers, FiBook } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Gallery', icon: FiImage },
    { name: 'Community', icon: FiUsers },
    { name: 'Guides', icon: FiBook }
  ];

  return (
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
            {navItems.map((item, index) => (
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
            ))}
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
            {navItems.map((item, index) => (
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
            ))}
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;