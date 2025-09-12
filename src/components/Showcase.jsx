import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiEye, FiHeart, FiMessageSquare } = FiIcons;

const Showcase = () => {
  const builds = [
    {
      id: 1,
      title: 'Medieval Castle',
      author: 'BuildMaster99',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      views: '12.5K',
      likes: '2.1K',
      comments: '456'
    },
    {
      id: 2,
      title: 'Floating Islands',
      author: 'SkyBuilder',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      views: '8.7K',
      likes: '1.8K',
      comments: '234'
    },
    {
      id: 3,
      title: 'Modern City',
      author: 'UrbanCrafter',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
      views: '15.2K',
      likes: '3.2K',
      comments: '678'
    },
    {
      id: 4,
      title: 'Underwater Base',
      author: 'AquaBuilder',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      views: '9.3K',
      likes: '1.5K',
      comments: '312'
    },
    {
      id: 5,
      title: 'Desert Temple',
      author: 'SandCrafter',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop',
      views: '11.1K',
      likes: '2.4K',
      comments: '543'
    },
    {
      id: 6,
      title: 'Space Station',
      author: 'CosmicBuilder',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop',
      views: '13.8K',
      likes: '2.9K',
      comments: '721'
    }
  ];

  return (
    <section id="gallery" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="minecraft-font text-3xl md:text-4xl text-white mb-4">
            Featured Builds
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover amazing creations from our talented community of builders.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builds.map((build, index) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/20 backdrop-blur-md rounded-lg overflow-hidden border-2 border-white/30 hover:border-minecraft-gold transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={build.image} 
                  alt={build.title}
                  className="w-full h-48 object-cover pixelated group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <h3 className="minecraft-font text-lg text-white mb-2">
                  {build.title}
                </h3>
                <p className="text-minecraft-gold text-sm mb-4">
                  by {build.author}
                </p>
                
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiEye} className="w-4 h-4" />
                    <span>{build.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiHeart} className="w-4 h-4" />
                    <span>{build.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                    <span>{build.comments}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="minecraft-button minecraft-font text-white px-8 py-4 text-sm">
            View More Builds
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;