import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const perks = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% protected checkout",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

const Homepage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 overflow-hidden">
        {/* Hero Background Glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[120px] animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-400/5 rounded-full blur-[100px] animate-pulse-soft animate-delay-300" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-light text-brand-400 text-xs font-semibold tracking-wider uppercase mb-6 sm:mb-8">
                <Sparkles size={14} />
                New Season Collection
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-white">Fashion That </span>
              <span className="gradient-text">Feels Good</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl text-surface-400 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover eco-friendly fashion that doesn't compromise on style.
              Premium quality, sustainable materials, timeless designs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/category/jeans" className="btn-primary !px-8 !py-3.5 text-base group">
                Shop Now
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
              <a href="#categories" className="btn-secondary !px-8 !py-3.5 text-base">
                Browse Categories
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PERKS BAR ===== */}
      <section className="relative z-10 py-6 border-y border-surface-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                className="flex items-center justify-center gap-3 py-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <perk.icon size={20} className="text-brand-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{perk.title}</p>
                  <p className="text-xs text-surface-400">{perk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section id="categories" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Explore
            </span>
            <h2 className="section-heading text-white mb-4">
              Shop by Category
            </h2>
            <p className="section-subheading mx-auto">
              From everyday essentials to statement pieces — find your style.
            </p>
          </motion.div>

          {/* Bento Grid Layout: 3 on top, 4 on bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-5">
            {categories.slice(0, 3).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryItem category={category} />
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.slice(3).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <CategoryItem category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      {!isLoading && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}

      {/* ===== PROMO BANNER ===== */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-800 to-surface-900" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15)_0%,transparent_70%)]" />

            {/* Content */}
            <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left max-w-lg">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                  Get 15% Off Your First Order
                </h3>
                <p className="text-brand-200/70 text-base sm:text-lg">
                  Sign up today and unlock exclusive deals on sustainable fashion.
                </p>
              </div>
              <Link
                to="/signup"
                className="btn-primary !bg-white !text-brand-900 hover:!bg-surface-100 !px-8 !py-4 text-base font-bold flex-shrink-0 shadow-xl"
              >
                Create Account
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-brand-400/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
