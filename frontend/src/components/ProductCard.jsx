import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add to cart", { id: "login" });
      return;
    } else {
      addToCart(product);
    }
  };
  return (
    <div className="glass-light rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 flex flex-col justify-between h-full">
      <Link to={`/product/${product._id}`} className="block overflow-hidden flex-1">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            className="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5 pb-2">
          <h5 className="text-base font-semibold text-white group-hover:text-brand-400 transition-colors duration-300 truncate">
            {product.name}
          </h5>
          <p className="text-xl font-bold text-brand-400 mt-2">
            ${product.price}
          </p>
        </div>
      </Link>

      <div className="p-5 pt-0">
        <button
          className="w-full bg-surface-800 hover:bg-brand-600 text-surface-300 hover:text-white font-medium 
            py-2.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} className="transition-transform duration-300 group-hover/btn:scale-110" />
          <span className="text-sm">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
