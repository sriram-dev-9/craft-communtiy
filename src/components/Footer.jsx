import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTwitter, FiGithub, FiMail, FiHeart } = FiIcons;

const Footer = () => {
  const socialLinks = [
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiMail, href: '#', label: 'Email' }
  ];

  const footerLinks = [
    {
      title: 'Community',
      links: ['Browse Builds', 'Upload Build', 'Competitions', 'Leaderboard']
    },
    {
      title: 'Resources',
      links: ['Building Guides', 'Texture Packs', 'Tutorials', 'Tips & Tricks']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact Us', 'Bug Reports', 'Feature Requests']
    }
  ];

  return (
    <footer className="bg-black/40 backdrop-blur-md border-t-4 border-minecraft-grass">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-minecraft-grass border-2 border-minecraft-leaves pixelated"></div>
              <h3 className="minecraft-font text-white text-xl">
                CraftCommunity
              </h3>
            </motion.div>
            <p className="text-white/70 mb-6 max-w-md">
              The ultimate platform for Minecraft builders to showcase their creations, 
              connect with the community, and find inspiration for their next build.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white hover:bg-minecraft-gold hover:text-black transition-all duration-200"
                  whileHover={{ y: -2 }}
                  aria-label={social.label}
                >
                  <SafeIcon icon={social.icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="minecraft-font text-white text-sm mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-minecraft-gold transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 CraftCommunity. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <span>Made with</span>
            <SafeIcon icon={FiHeart} className="w-4 h-4 text-red-500" />
            <span>for the Minecraft community</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;