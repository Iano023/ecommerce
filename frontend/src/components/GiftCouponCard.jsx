import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (!userInputCode) return;
    applyCoupon(userInputCode);
  };

  const handleRemoveCoupon = async () => {
    await removeCoupon();
    setUserInputCode("");
  };

  return (
    <motion.div
      className="glass-light rounded-2xl p-5 sm:p-6 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-3">
        <label
          htmlFor="voucher"
          className="block text-sm font-medium text-surface-300"
        >
          Have a voucher or gift card?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="voucher"
            className="flex-1 bg-surface-800/50 border border-surface-700 rounded-xl px-4 py-2.5 text-sm 
              text-white placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 
              focus:border-brand-500 transition-all duration-300"
            placeholder="Enter code"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
          />
          <motion.button
            type="button"
            className="btn-primary !px-5 !py-2.5 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApplyCoupon}
          >
            Apply
          </motion.button>
        </div>
      </div>

      {isCouponApplied && coupon && (
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-400">{coupon.code}</p>
              <p className="text-xs text-surface-400 mt-0.5">
                {coupon.discountPercentage}% off applied
              </p>
            </div>
            <motion.button
              type="button"
              className="text-xs font-medium text-red-400 hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-400/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleRemoveCoupon}
            >
              Remove
            </motion.button>
          </div>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="bg-surface-800/50 rounded-xl p-3">
          <p className="text-xs text-surface-400">
            Available coupon: <span className="text-brand-400 font-medium">{coupon.code}</span> — {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GiftCouponCard;
