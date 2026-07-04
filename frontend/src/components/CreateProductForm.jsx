import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, ImagePlus } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
    } catch {
      console.error("Error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  return (
    <motion.div
      className="glass-light rounded-2xl p-6 sm:p-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-white mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-surface-300 mb-1.5"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            className="block w-full bg-surface-800/50 border border-surface-700 rounded-xl py-2.5 px-4 text-white 
              text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 
              transition-all duration-300"
            placeholder="e.g. Classic Denim Jacket"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-surface-300 mb-1.5"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            rows="3"
            className="block w-full bg-surface-800/50 border border-surface-700 rounded-xl py-2.5 px-4 text-white 
              text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 
              transition-all duration-300 resize-none"
            placeholder="Describe the product..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-surface-300 mb-1.5"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            step="0.01"
            className="block w-full bg-surface-800/50 border border-surface-700 rounded-xl py-2.5 px-4 text-white 
              text-sm placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 
              transition-all duration-300"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-surface-300 mb-1.5"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            className="block w-full bg-surface-800/50 border border-surface-700 rounded-xl py-2.5 px-4 text-white 
              text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 
              transition-all duration-300"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1.5">
            Product Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer flex items-center gap-2 bg-surface-800/50 border border-dashed border-surface-600 
                rounded-xl py-3 px-4 text-sm text-surface-400 hover:text-surface-300 hover:border-surface-500 
                hover:bg-surface-800 transition-all duration-300 flex-1"
            >
              {newProduct.image ? (
                <>
                  <ImagePlus className="h-5 w-5 text-brand-400" />
                  <span className="text-brand-400">Image selected</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Click to upload image</span>
                </>
              )}
            </label>
          </div>
          {newProduct.image && (
            <div className="mt-3">
              <img
                src={newProduct.image}
                alt="Preview"
                className="h-20 w-20 rounded-xl object-cover border border-surface-700"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary w-full !py-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Creating...
            </>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;
