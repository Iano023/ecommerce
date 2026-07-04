import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_KEY
);

const Ordersummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });
    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Stripe checkout error:", result.error);
    }
  };

  return (
    <motion.div
      className="glass-light rounded-2xl p-5 sm:p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white">Order Summary</h3>

      <div className="space-y-3">
        <dl className="flex items-center justify-between">
          <dt className="text-sm text-surface-400">Subtotal</dt>
          <dd className="text-sm font-medium text-surface-200">
            ${formattedSubtotal}
          </dd>
        </dl>

        {savings > 0 && (
          <dl className="flex items-center justify-between">
            <dt className="text-sm text-surface-400">Savings</dt>
            <dd className="text-sm font-medium text-brand-400">
              -${formattedSavings}
            </dd>
          </dl>
        )}

        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between">
            <dt className="text-sm text-surface-400">
              Coupon ({coupon.code})
            </dt>
            <dd className="text-sm font-medium text-brand-400">
              -{coupon.discountPercentage}%
            </dd>
          </dl>
        )}

        <div className="h-px bg-surface-700" />

        <dl className="flex items-center justify-between">
          <dt className="text-base font-semibold text-white">Total</dt>
          <dd className="text-lg font-bold text-brand-400">
            ${formattedTotal}
          </dd>
        </dl>
      </div>

      <motion.button
        className="btn-primary w-full !py-3"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
      >
        Proceed to Checkout
      </motion.button>

      <div className="flex items-center justify-center gap-2">
        <span className="text-xs text-surface-500">or</span>
        <Link
          to="/"
          className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors inline-flex items-center gap-1"
        >
          Continue Shopping
          <MoveRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Ordersummary;
