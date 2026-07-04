import { XCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full glass-light rounded-2xl overflow-hidden relative z-10"
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5">
              <XCircle className="text-red-400 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-surface-400 text-center text-sm mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="bg-surface-800/50 rounded-xl p-4 mb-6">
            <p className="text-sm text-surface-400 text-center">
              If you encountered any issues during checkout, please
              don&apos;t hesitate to contact our support team.
            </p>
          </div>
          <Link
            to="/"
            className="btn-secondary w-full !py-3 justify-center"
          >
            <ArrowLeft className="mr-2" size={18} />
            Return to Shop
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
