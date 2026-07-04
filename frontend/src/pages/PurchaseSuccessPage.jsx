import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.error("Checkout error:", error);
      } finally {
        setIsProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session ID found in the URL");
    }
  }, [clearCart]);

  if (isProcessing)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-400 text-sm">Processing your order...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-light rounded-2xl p-8 max-w-md w-full text-center">
          <p className="text-red-400 font-medium mb-4">Error: {error}</p>
          <Link to="/" className="btn-primary">
            Return to Shop
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />

      <motion.div
        className="max-w-md w-full glass-light rounded-2xl overflow-hidden relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-500/20 flex items-center justify-center mb-5">
              <CheckCircle className="text-brand-400 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2">
            Purchase Successful!
          </h1>

          <p className="text-surface-400 text-center text-sm mb-2">
            Thank you for your order. We&apos;re processing it now.
          </p>
          <p className="text-brand-400 text-center text-xs mb-6">
            Check your email for order details and updates.
          </p>

          <div className="bg-surface-800/50 rounded-xl p-4 mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-400">Order number</span>
              <span className="text-sm font-semibold text-brand-400">
                #12345
              </span>
            </div>
            <div className="h-px bg-surface-700" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-surface-400">Estimated delivery</span>
              <span className="text-sm font-semibold text-brand-400">
                3-5 business days
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="btn-primary w-full !py-3">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to="/"
              className="btn-secondary w-full !py-3 justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;
