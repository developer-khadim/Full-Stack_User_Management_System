import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Shield,
  Upload,
  Settings,
  UserCircle,
  Image,
  Video,
  Lock,
  BarChart3,
  Bell,
  Search,
  Zap,
  Cloud,
  FileCheck
} from 'lucide-react';

const Features = () => {
  useEffect(() => {
    document.title = 'Features | User Management';
  }, []);

  const mainFeatures = [
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive tools for managing user accounts, roles, and permissions with ease.",
      color: "bg-blue-500"
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security features including 2FA, encryption, and audit logs.",
      color: "bg-green-500"
    },
    {
      icon: Upload,
      title: "Media Upload",
      description: "Seamless upload and management of images, videos, and documents.",
      color: "bg-purple-500"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Detailed insights and analytics about user behavior and system usage.",
      color: "bg-orange-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: "Role-Based Access",
      description: "Define custom roles and permissions"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Real-time alerts and updates"
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Secure cloud-based file storage"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Advanced search capabilities"
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimized for speed and efficiency"
    },
    {
      icon: FileCheck,
      title: "File Management",
      description: "Organize and manage all your files"
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Modern User Management</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to manage users, content, and administrative operations in one secure platform.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Features Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
            >
              <div className={`${feature.color} p-4 flex justify-center`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Features Grid */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">More Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-lg p-2">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
