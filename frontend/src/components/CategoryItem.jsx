import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CategoryItem = ({ category }) => {
  return (
    <Link
      to={"/category" + category.href}
      className="group relative overflow-hidden rounded-2xl block"
    >
      {/* Image */}
      <div className="aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h3 className="text-white text-xl sm:text-2xl font-bold mb-1 tracking-tight">
          {category.name}
        </h3>
        <div className="flex items-center gap-1.5 text-brand-400 text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span>Shop Now</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>

      {/* Top-right decorative glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2" />
    </Link>
  );
};

export default CategoryItem;
