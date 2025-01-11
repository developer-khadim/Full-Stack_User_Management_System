import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  UserCircle, 
  Shield, 
  Upload,
  Image,
  Video,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  useEffect(() => {
    document.title = "User Management";
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
      >
        <div className="text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-8"
          >
            Manage Users and Their Data <br className="hidden sm:block" />
            with Ease and Security
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            A powerful platform for managing user accounts, content, and administrative operations.
            Upload and manage media files securely.
          </motion.p>
          <motion.div 
            variants={staggerChildren}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div variants={scaleIn}>
              <Link to='/signin' className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 flex items-center justify-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.button 
              variants={scaleIn}
              className="bg-gray-100 text-gray-800 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Secure Management", desc: "Advanced security features to protect user data and maintain privacy compliance." },
            { icon: Upload, title: "Easy Upload", desc: "Seamlessly upload and manage your photos, videos, and documents." },
            { icon: UserCircle, title: "User Control", desc: "Complete control over user accounts, permissions, and content access." }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <feature.icon className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Media Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="bg-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Supported Media Types
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: Image, title: "Image Management", desc: "Support for JPG, PNG, GIF and other image formats" },
              { icon: Video, title: "Video Support", desc: "Handle MP4, AVI and other video formats" }
            ].map((media, index) => (
              <motion.div 
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-lg shadow-sm flex items-center"
              >
                <media.icon className="h-8 w-8 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold mb-1">{media.title}</h3>
                  <p className="text-gray-600">{media.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;