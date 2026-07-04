import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Lock,
  LogOut,
  UserPlus,
  LogIn,
  Menu,
  X,
  Store,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "glass shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
              onClick={closeMobileMenu}
            >
              <div className="w-9 h-9 rounded-lg bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors duration-300">
                <Store className="w-5 h-5 text-brand-400" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                EverGreen Store
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                to="/"
                className="px-3 py-2 text-sm font-medium text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                Home
              </Link>

              {user && (
                <Link
                  to="/cart"
                  className="relative px-3 py-2 text-sm font-medium text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-1.5"
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-brand-500/30">
                      {cart.length}
                    </span>
                  )}
                </Link>
              )}

              {isAdmin && (
                <Link
                  to="/secret-dashboard"
                  className="px-3 py-2 text-sm font-medium text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Lock size={16} />
                  <span>Dashboard</span>
                </Link>
              )}

              <div className="w-px h-6 bg-surface-700 mx-1" />

              {user ? (
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-1.5"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary !py-2 !px-4 !text-xs">
                    <LogIn className="mr-1.5" size={14} />
                    Login
                  </Link>
                  <Link to="/signup" className="btn-primary !py-2 !px-4 !text-xs">
                    <UserPlus className="mr-1.5" size={14} />
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden"
            >
              <div className="glass mx-4 mt-2 rounded-xl p-4 shadow-2xl">
                <nav className="flex flex-col gap-1">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    Home
                  </Link>

                  {user && (
                    <Link
                      to="/cart"
                      onClick={closeMobileMenu}
                      className="px-4 py-3 text-sm font-medium text-surface-200 hover:text-white rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingCart size={18} />
                        Cart
                      </span>
                      {cart.length > 0 && (
                        <span className="bg-brand-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  )}

                  {isAdmin && (
                    <Link
                      to="/secret-dashboard"
                      onClick={closeMobileMenu}
                      className="px-4 py-3 text-sm font-medium text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors flex items-center gap-2"
                    >
                      <Lock size={16} />
                      Dashboard
                    </Link>
                  )}

                  <div className="h-px bg-surface-700 my-2" />

                  {user ? (
                    <button
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="px-4 py-3 text-sm font-medium text-surface-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2 w-full text-left"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2 pt-1">
                      <Link
                        to="/login"
                        onClick={closeMobileMenu}
                        className="btn-secondary !py-2.5 w-full justify-center"
                      >
                        <LogIn className="mr-2" size={16} />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={closeMobileMenu}
                        className="btn-primary !py-2.5 w-full justify-center"
                      >
                        <UserPlus className="mr-2" size={16} />
                        Sign Up
                      </Link>
                    </div>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
