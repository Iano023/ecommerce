import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import Ordersummary from "../components/Ordersummary";
import GiftCouponCard from "../components/GiftCouponCard";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Shopping Cart
          </h1>
          {cart.length > 0 && (
            <p className="text-sm text-surface-400 mt-1">
              {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
            </p>
          )}
        </motion.div>

        <div className="lg:flex lg:items-start lg:gap-8">
          {/* Cart Items */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            )}
            {cart.length > 0 && <PeopleAlsoBought />}
          </motion.div>

          {/* Sidebar */}
          {cart.length > 0 && (
            <motion.div
              className="lg:w-96 lg:flex-shrink-0 mt-8 lg:mt-0 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Ordersummary />
              <GiftCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="glass-light rounded-2xl flex flex-col items-center justify-center py-16 px-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-20 h-20 rounded-2xl bg-surface-800 flex items-center justify-center mb-6">
      <ShoppingCart className="h-10 w-10 text-surface-500" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">
      Your cart is empty
    </h3>
    <p className="text-surface-400 text-sm text-center max-w-xs mb-6">
      Looks like you haven&apos;t added anything to your cart yet. Start exploring our collection!
    </p>
    <Link className="btn-primary" to="/">
      Start Shopping
    </Link>
  </motion.div>
);
