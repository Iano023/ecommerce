import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

  return (
    <motion.div
      className="glass-light rounded-2xl overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-surface-700">
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider"
              >
                Featured
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-surface-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-surface-800">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-white/[0.02] transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                    <span className="text-sm font-medium text-white">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-surface-300">
                    ${product.price.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-surface-800 text-surface-300 capitalize">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleFeaturedProduct(product._id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      product.isFeatured
                        ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                        : "bg-surface-800 text-surface-500 hover:text-surface-300 hover:bg-surface-700"
                    }`}
                  >
                    <Star
                      className={`h-4 w-4 ${product.isFeatured ? "fill-amber-400" : ""}`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsList;
