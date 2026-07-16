import { motion } from "framer-motion";
import { FaQrcode, FaExclamationTriangle } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InvalidSession = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    localStorage.removeItem("token");

    // Go back so the user can scan the QR again.
    // Change this if you have a dedicated landing page.
    // navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white flex items-center justify-center p-6 overflow-hidden">
      {/* Floating Background Circles */}
      <motion.div
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-36 h-36 rounded-full bg-yellow-200/30 blur-2xl"
      />

      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-orange-200/30 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative flex justify-center mb-6"
        >
          <div className="absolute w-24 h-24 rounded-full bg-yellow-100"></div>

          <div className="relative w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
            <FaExclamationTriangle className="text-white text-4xl" />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold text-center text-gray-800">
          Session Expired
        </h1>

        <p className="text-center text-gray-500 mt-3 leading-relaxed">
          This page is no longer connected to an active restaurant table.
          <br />
          Please scan your table's QR code again to continue ordering.
        </p>

        {/* Info Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mt-8 rounded-2xl bg-yellow-50 border border-yellow-200 p-5"
        >
          <div className="flex justify-center mb-3">
            <FaQrcode className="text-5xl text-yellow-600" />
          </div>

          <p className="text-sm text-gray-700 text-center">
            Your QR session may have expired, the table may have been reset,
            or your access token is no longer valid.
          </p>
        </motion.div>

        {/* Retry Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleRetry}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-2xl shadow-lg transition-colors"
        >
          <MdRefresh className="text-2xl" />
          Scan QR Again
        </motion.button>

        <p className="text-xs text-center text-gray-400 mt-5">
          If the problem continues, please ask the restaurant staff for
          assistance.
        </p>
      </motion.div>
    </div>
  );
};

export default InvalidSession;