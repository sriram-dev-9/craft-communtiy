import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrendingUp, FiImage, FiAward } = FiIcons;

const Community = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { icon: FiUsers, value: '2+', label: 'Active Builders' },
    { icon: FiImage, value: '5+', label: 'Builds Shared' },
    { icon: FiTrendingUp, value: '10+', label: 'Views Monthly' }
  ];

  const handleSignUpClick = () => {
    if (user) {
      navigate('/app');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <section id="community" className="py-20 px-4 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="minecraft-font text-3xl md:text-4xl text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Be part of our Minecraft building community. Share your creations, 
            get feedback, and inspire others with your builds.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-minecraft-gold rounded-lg flex items-center justify-center mx-auto mb-4 pixelated">
                <SafeIcon icon={stat.icon} className="w-8 h-8 text-white" />
              </div>
              <div className="minecraft-font text-2xl md:text-3xl text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-2xl mx-auto border-2 border-white/30">
            <h3 className="minecraft-font text-xl text-white mb-4">
              Ready to Share Your Builds?
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of builders showcasing their amazing creations. 
              It's free and takes less than a minute to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleSignUpClick}
                className="minecraft-button minecraft-font text-white px-8 py-4 text-sm"
              >
                {user ? 'Go to App' : 'Sign Up Free'}
              </button>
              {/* <button className="bg-transparent border-2 border-white text-white minecraft-font px-8 py-4 text-sm hover:bg-white hover:text-black transition-all duration-200">
                Learn More
              </button> */}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signup"
      />
    </section>
  );
};

export default Community;