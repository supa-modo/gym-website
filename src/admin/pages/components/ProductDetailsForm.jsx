export const ProductDetailsForm = ({
  formData,
  handleChange,
  errors,
  categories,
}) => {
  return (
    <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
      <h2 className="text-lg font-medium text-white mb-4">Product Details</h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-zinc-700/50 border ${
              errors.name ? "border-red-500" : "border-zinc-600"
            } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Price ($) <span className="text-red-500">*</span>
            </label>
            <input
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
              className={`w-full bg-zinc-700/50 border ${
                errors.price ? "border-red-500" : "border-zinc-600"
              } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          {/* Stock Quantity */}
          <div>
            <label
              htmlFor="stockQuantity"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="stockQuantity"
              name="stockQuantity"
              type="number"
              min="0"
              value={formData.stockQuantity}
              onChange={handleChange}
              className={`w-full bg-zinc-700/50 border ${
                errors.stockQuantity ? "border-red-500" : "border-zinc-600"
              } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
              placeholder="Enter stock quantity"
            />
            {errors.stockQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stockQuantity}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="w-full">
            <label
              htmlFor="features"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Product Features
            </label>
            <input
              id="features"
              name="features"
              type="text"
              value={formData.features.join(", ")}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  features: e.target.value
                    .split(",")
                    .map((f) => f.trim())
                    .filter((f) => f),
                }))
              }
              className="w-full bg-zinc-700/50 placeholder-gray-500/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              placeholder="Enter features, separated by commas..."
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className={`w-full bg-zinc-700/50 border ${
              errors.description ? "border-red-500" : "border-zinc-600"
            } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
            placeholder="Enter product description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
