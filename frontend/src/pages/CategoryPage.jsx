import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          className="flex items-center gap-2 text-sm text-surface-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="hover:text-brand-400 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="text-surface-600" />
          <span className="text-surface-200 font-medium">{categoryName}</span>
        </motion.nav>

        {/* Page Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="section-heading text-white">{categoryName}</h1>
          <p className="section-subheading mt-2">
            Explore our {categoryName.toLowerCase()} collection
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products?.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface-800 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No products found
              </h2>
              <p className="text-sm text-surface-400 mb-6">
                We don&apos;t have any {categoryName.toLowerCase()} at the moment.
              </p>
              <Link to="/" className="btn-primary">
                Browse All Categories
              </Link>
            </div>
          )}

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
