import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUpload, FiUsers, FiTrendingUp, FiAward, FiCamera, FiHeart } = FiIcons;

const Features = () => {
  const features = [
    {
      icon: FiUpload,
      title: 'Easy Upload',
      description: 'Share your builds in seconds with our simple upload system.',
      color: 'bg-minecraft-grass'
    },
    {
      icon: FiUsers,
      title: 'Community',
      description: 'Connect with thousands of builders from around the world.',
      color: 'bg-minecraft-water'
    },
    {
      icon: FiTrendingUp,
      title: 'Trending',
      description: 'Discover the most popular builds and latest trends.',
      color: 'bg-minecraft-gold'
    },
    {
      icon: FiAward,
      title: 'Competitions',
      description: 'Participate in building contests and win amazing prizes.',
      color: 'bg-minecraft-emerald'
    },
    {
      icon: FiCamera,
      title: 'Screenshots',
      description: 'Showcase multiple angles of your creations.',
      color: 'bg-minecraft-redstone'
    },
    {
      icon: FiHeart,
      title: 'Favorites',
      description: 'Save and organize your favorite builds for inspiration.',
      color: 'bg-minecraft-lava'
    }
  ];

  return (
    <section id="features" className="py-20 px-4 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="minecraft-font text-3xl md:text-4xl text-white mb-4">
            Why Choose CraftCommunity?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Everything you need to showcase your Minecraft builds and connect with fellow builders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/20 backdrop-blur-md rounded-lg p-6 border-2 border-white/30 hover:border-minecraft-gold transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-4 pixelated`}>
                <SafeIcon icon={feature.icon} className="w-8 h-8 text-white" />
              </div>
              <h3 className="minecraft-font text-xl text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;