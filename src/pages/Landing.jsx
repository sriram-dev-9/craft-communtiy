import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Showcase from '../components/Showcase';
import Community from '../components/Community';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-green-400">
      <Header />
      <Hero />
      <Features />
      <Showcase />
      <Community />
      <Footer />
    </div>
  );
};

export default Landing;


