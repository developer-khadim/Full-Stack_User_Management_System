import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import resetPassword_Icon from '../assets/forgot.png';
import Modal from 'react-modal';


//Set the Root of POP-UP
Modal.setAppElement('#root')

const ResetPassword = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validatePasswords = () => {
    const newErrors = {};
    if (passwords.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      // Simulate an API call to reset password
      setIsSubmitted(true);
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/signin');
      }, 3000);
    }
  };

  return (
    <section className="min-h-[85vh] w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full md:w-1/2 p-8 lg:p-12"
          >
            <div className="max-w-md mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-gray-900 mb-2 text-center"
              >
                Reset Password
              </motion.h2>
              <p className="text-gray-500 text-center mb-8">Enter your new password below</p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 bg-green-50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Password Reset Successful!</h3>
                  <p className="text-gray-600">Redirecting you to login page...</p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={passwords.newPassword}
                      onChange={(e) =>
                        setPasswords({ ...passwords, newPassword: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      placeholder="Enter new password"
                    />
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirmPassword: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out"
                      placeholder="Confirm new password"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Reset Password
                  </motion.button>
                </motion.form>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Back to Sign In
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
            {/* Image Section */}
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 bg-gradient-to-br from-indigo-50 to-blue-50 p-8 flex flex-col items-center justify-center relative"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              src={resetPassword_Icon}
              alt="Reset Password"
              className="w-full max-w-md h-auto"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-8 right-8 bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Password</h3>
              <p className="text-gray-600">Choose a strong password to protect your account.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      {/* Modal for Success */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={()=> setIsModalOpen(false) }
        className="fixed inset-0 flex items-center justify-center bg-black/50 "
        overlayClassName="fixed inset-0 bg-black/50"
        >
            <div className='bg-white max-w-xl w-full h-[20vh] flex flex-col items-center justify-center rounded-lg shadow-xl' >
                <h2 className='text-2xl font-bold text-blue-700 mb-4 ' > Password Reset Successful!</h2>
                <p className='text-gray-600' >Your password has been changed successfully.</p>
                <button
                onClick={ ()=> setIsModalOpen(false)}
                className='mt-6 px-4 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 duration-300 '
                >Close</button>
            </div>
      </Modal>
    </section>
  );
};

export default ResetPassword;
