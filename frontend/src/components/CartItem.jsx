import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="glass-light rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        {/* Image */}
        <div className="shrink-0">
          <img
            className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-white truncate">
            {item.name}
          </h4>
          <p className="text-sm text-surface-400 mt-0.5 line-clamp-1">
            {item.description}
          </p>
          <p className="text-lg font-bold text-brand-400 mt-2">
            ${item.price}
          </p>
        </div>

        {/* Quantity & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
          {/* Quantity controls */}
          <div className="flex items-center gap-3">
            <button
              className="w-8 h-8 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center
                text-surface-300 hover:bg-surface-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 
                transition-all duration-200"
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus size={14} />
            </button>

            <span className="text-white font-semibold text-sm w-6 text-center">
              {item.quantity}
            </span>

            <button
              className="w-8 h-8 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center
                text-surface-300 hover:bg-surface-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 
                transition-all duration-200"
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Delete */}
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center text-surface-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
            onClick={() => removeFromCart(item._id)}
            aria-label="Remove item"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
