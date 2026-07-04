import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage);
  const currentPage = Math.floor(currentIndex / itemsPerPage);

  return (
    <div className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-brand-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Curated for You
          </span>
          <h2 className="section-heading text-white mb-4">
            Featured Products
          </h2>
          <p className="section-subheading mx-auto">
            Hand-picked pieces that define the season. Limited stock, unlimited style.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
                >
                  <div className="glass-light rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 group flex flex-col justify-between">
                    <Link to={`/product/${product._id}`} className="block overflow-hidden flex-1">
                      <div className="overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-52 object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 pb-2">
                        <h3 className="text-base font-semibold mb-2 text-white group-hover:text-brand-400 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-brand-400 font-bold text-lg">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-surface-800 hover:bg-brand-600 text-surface-300 hover:text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-300 
                        flex items-center justify-center gap-2 group/btn"
                      >
                        <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                        <span className="text-sm">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-3 sm:-left-5 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isStartDisabled
                ? "bg-surface-800/50 text-surface-600 cursor-not-allowed"
                : "glass text-white hover:bg-brand-500/20 hover:text-brand-400"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-3 sm:-right-5 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isEndDisabled
                ? "bg-surface-800/50 text-surface-600 cursor-not-allowed"
                : "glass text-white hover:bg-brand-500/20 hover:text-brand-400"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Indicators */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * itemsPerPage)}
                className={`transition-all duration-300 rounded-full ${
                  currentPage === i
                    ? "w-8 h-2.5 bg-brand-500"
                    : "w-2.5 h-2.5 bg-surface-700 hover:bg-surface-600"
                }`}
                aria-label={`Go to slide group ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default FeaturedProducts;
