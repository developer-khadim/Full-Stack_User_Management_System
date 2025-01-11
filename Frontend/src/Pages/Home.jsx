import React, { useEffect } from 'react';
import { Star } from 'lucide-react'; // Import Lucide Star icon

const Home = () => {
  useEffect(() => {
    document.title = 'User Management';
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your Digital Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover a new way to manage your digital life. Powerful features, seamless integration, and beautiful design all in one place.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Get Started
              </button>
              <button className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 lg:py-24 bg-white shadow-xl ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides all the tools and features you need to take your business to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-indigo-600" /> {/* Using the Lucide Star Icon */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Work together seamlessly with your team members in real-time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                {/* Icon for Feature 2 */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Security</h3>
              <p className="text-gray-600">
                Bank-grade security to keep your data safe and protected.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                {/* Icon for Feature 3 */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized performance to keep your workflow smooth and efficient.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Sections (Testimonials, CTA, etc.) can be updated similarly */}
    </div>
  );
};

export default Home;
