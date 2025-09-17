import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlay, FiArrowDown } = FiIcons;

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    if (user) {
      navigate('/app');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <section className="pt-24 pb-16 px-4 min-h-screen flex items-center">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="minecraft-font text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Build.
                <br />
                <span className="text-minecraft-gold">Share.</span>
                <br />
                Inspire.
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Showcase your amazing Minecraft builds to the world. Connect with builders, 
                share your creations, and get inspired by the community.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button 
                  onClick={handleStartBuilding}
                  className="minecraft-button minecraft-font text-white px-8 py-4 text-sm flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlay} className="w-4 h-4" />
                  <span>{user ? 'Go to App' : 'Start Building'}</span>
                </button>
                
                {/* <button className="bg-transparent border-4 border-white text-white minecraft-font px-8 py-4 text-sm hover:bg-white hover:text-black transition-all duration-200">
                  View Gallery
                </button> */}
              </motion.div>
            </motion.div>

            {/* Right Content - Minecraft Scene */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Floating Blocks */}
                <motion.div 
                  className="absolute top-0 left-1/4 w-16 h-16 bg-minecraft-grass border-2 border-minecraft-leaves pixelated"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute top-20 right-1/4 w-12 h-12 bg-minecraft-stone border-2 border-gray-400 pixelated"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div 
                  className="absolute bottom-20 left-1/3 w-14 h-14 bg-minecraft-gold border-2 border-yellow-400 pixelated"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
                
                {/* Main Castle Structure */}
                <div className="relative z-10 bg-gradient-to-b from-gray-600 to-gray-800 border-4 border-gray-700 p-8 rounded-lg">
                  <div className="grid grid-cols-8 gap-1 h-64">
                    {/* Castle blocks pattern */}
                    {Array.from({ length: 64 }, (_, i) => {
                      const row = Math.floor(i / 8);
                      const col = i % 8;
                      let blockType = 'bg-minecraft-stone';
                      
                      if (row < 2) blockType = 'bg-minecraft-cobblestone';
                      if (row === 6 && (col === 2 || col === 5)) blockType = 'bg-minecraft-wood';
                      if (row === 7 && col >= 2 && col <= 5) blockType = 'bg-minecraft-wood';
                      
                      return (
                        <motion.div
                          key={i}
                          className={`w-full h-full ${blockType} border border-gray-600 pixelated`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.01, duration: 0.2 }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <SafeIcon icon={FiArrowDown} className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signup"
      />
    </>
  );
};

export default Hero;