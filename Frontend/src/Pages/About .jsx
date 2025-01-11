import React, { useEffect } from 'react';
import KhadimImage from '../assets/khadim.jpeg';
import KaifImage from '../assets/kaif.jpeg';
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award,
  Clock,
  Building,
  Mail,
  Phone,
  MapPin,
  Shield
} from 'lucide-react';
import Footer from '../Components/Footer';

const About = () => {
  useEffect(() => {
    document.title = 'About | User Management';
  }, []);

  const teamMembers = [
    {
      name: "Khadim Ali",
      role: "Founder & CEO",
      image: KhadimImage,
    },
    {
      name: "Kaif Sasoli",
      role: "Technical Lead",
      image: KaifImage,
    },
    {
      name: "Kaif Sasoli",
      role: "Product Manager",
      image: KaifImage,
    },
    {
      name: "Khadim Ali",
      role: "UX Designer",
      image: KhadimImage,
    }
  ];

  const stats = [
    { value: "5+", label: "Years Experience", icon: Clock },
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "99%", label: "Success Rate", icon: Target },
    { value: "24/7", label: "Support", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}

      {/* Hero Section */}
      <motion.div
  className="bg-blue-600 text-white py-20"
  initial={{ opacity: 0, y: -50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
    <p className="text-xl max-w-3xl mx-auto text-center text-blue-100">
      We're dedicated to revolutionizing user management through innovative solutions
      that empower organizations to handle their user data efficiently and securely.
    </p>
  </div>
</motion.div>


      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
  {stats.map((stat, index) => (
    <motion.div
      key={index}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <div className="flex justify-center m-2 ">
        <stat.icon className="h-8 w-8 text-blue-600" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-sm text-gray-500">{stat.label}</div>
    </motion.div>
  ))}
</div>


      {/* Mission Section */}
      <motion.div
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To provide organizations with powerful, secure, and user-friendly tools for managing 
            their user base and digital content, while ensuring data privacy and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What We Do</h3>
            <p className="text-gray-600 mb-4">
              We develop comprehensive user management solutions that help organizations 
              streamline their operations, protect user data, and provide seamless 
              experiences for both administrators and end-users.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <Building className="h-5 w-5 text-blue-600 mr-2" />
                Enterprise-level solutions
              </li>
              <li className="flex items-center">
                <Shield className="h-5 w-5 text-blue-600 mr-2" />
                Advanced security features
              </li>
              <li className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                Scalable user management
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Innovation</h4>
                  <p className="text-gray-600">Constantly improving our solutions</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Security</h4>
                  <p className="text-gray-600">Protecting user data is our priority</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">User-Centric</h4>
                  <p className="text-gray-600">Focusing on user experience</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </motion.div>
      {/* Team Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {teamMembers.map((member, index) => (
    <motion.div
      key={index}
      className="flex flex-col items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-48 h-48 rounded-full object-cover mb-6 border-4 border-white shadow-lg"
      />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {member.name}
      </h3>
      <p className="text-gray-600">
        {member.role}
      </p>
    </motion.div>
  ))}
</div>


      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <Mail className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-600">contact@usermanage.com</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-600">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-gray-600">123 Tech Street, SF, CA 94105</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default About;