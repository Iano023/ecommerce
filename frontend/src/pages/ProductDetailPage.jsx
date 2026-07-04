import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    getProduct();
  }, [id, fetchProductById]);

  if (loading) return <LoadingSpinner />;

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <div className="glass-light rounded-2xl p-8 max-w-md w-full text-center">
          <p className="text-surface-400 mb-6">Product not found or has been removed.</p>
          <Link to="/" className="btn-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-surface-400 hover:text-white mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back to browsing
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Product Image */}
          <motion.div
            className="glass-light rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full rounded-2xl object-contain hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-lg bg-surface-800 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-brand-400 mt-3">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="h-px bg-surface-800" />

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-surface-400 text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="btn-primary w-full sm:w-auto !px-8 !py-3.5 flex items-center justify-center gap-2 group"
            >
              <ShoppingCart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Add to Cart</span>
            </button>

            <div className="h-px bg-surface-800" />

            {/* Shopping perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center text-brand-400 shrink-0">
                  <Truck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Free shipping</h4>
                  <p className="text-[10px] text-surface-500">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center text-brand-400 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Secure payment</h4>
                  <p className="text-[10px] text-surface-500">100% SSL protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-800 flex items-center justify-center text-brand-400 shrink-0">
                  <RotateCcw size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Easy returns</h4>
                  <p className="text-[10px] text-surface-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <div className="mt-16 sm:mt-24">
          <PeopleAlsoBought />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
