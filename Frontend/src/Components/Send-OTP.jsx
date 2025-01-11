import React, { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion";
import axios from "axios";
import { Check } from "lucide-react";

Modal.setAppElement("#root");

const OTP = ({ isOpen, onClose, email, username, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(Array(4).fill("")); // Changed to 4 digits
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleInputChange = (value, index) => {
    setError("");
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, otp.length);

    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste numbers only");
      return;
    }

    const newOtp = [...otp];
    pastedData.split("").forEach((value, index) => {
      if (index < otp.length) newOtp[index] = value;
    });
    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, otp.length - 1);
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex].focus();
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.some(digit => !digit)) {
      setError("Please enter all digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(import.meta.env.VITE_VERIFY_OTP_API, {
        email,
        username,
        otp: otp.join("")
      });
      
      setSuccessModalOpen(true);
      onVerificationSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_SEND_OTP_API, {
        email,
        username
      });
      setOtp(Array(4).fill("")); // Reset to 4 digits
      inputRefs.current[0].focus();
      setError("New OTP sent successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setSuccessModalOpen(false);
    onClose();
  };

  const SuccessModal = () => (
    <Modal
      isOpen={isSuccessModalOpen}
      onRequestClose={handleCloseSuccess}
      className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-xl transform transition-all outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="text-center p-6">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your email has been verified. You can now continue with your registration.
        </p>
        <button
          onClick={handleCloseSuccess}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-bold"
        >
          Continue
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={false} // Disable closing on outside click
        className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-xl transform transition-all outline-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          className="relative p-6 md:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors text-xl"
          >
            ×
          </button>

          <motion.div
            className="text-center space-y-2 mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-2xl font-bold text-indigo-600">Verify Your Email</h2>
            <p className="text-gray-500 text-sm md:text-base">
              We've sent a 4-digit code to your email.
              <br />
              Please enter it below to continue.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                disabled={isLoading}
                className="w-12 h-12 text-center text-lg text-indigo-600 font-semibold border-2 rounded-lg
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all
                  disabled:bg-gray-50 disabled:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              />
            ))}
          </div>

          {error && (
            <motion.p
              className="text-red-500 text-sm text-center mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium mb-4
              hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all
              disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            <div className="text-gray-500 text-sm">
              Didn't receive the code?{" "}
              <button
                className="text-sm text-indigo-600 hover:underline font-medium disabled:text-indigo-400 disabled:cursor-not-allowed"
                onClick={handleResendOTP}
                disabled={isLoading}
              >
                Resend
              </button>
            </div>
          </div>
        </motion.div>
      </Modal>
      <SuccessModal />
    </>
  );
};

export default OTP;
