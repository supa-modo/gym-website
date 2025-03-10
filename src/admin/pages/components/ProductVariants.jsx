import { FiMinus, FiPlus } from "react-icons/fi";
import { TbPalette, TbRuler } from "react-icons/tb";

export const ProductVariants = ({
  formData,
  handleChange,
  handleSizeTypeChange,
  handleSizeChange,
  handleAddSize,
  handleQuickAddSize,
  handleRemoveSize,
  handleColorChange,
  handleQuickAddColor,
  handleAddColor,
  handleRemoveColor,
  errors,
  newSize,
  newColor,
  sizeUnits,
}) => {
  // Format size for display
  const formatSize = (size) => {
    if (typeof size === "string") {
      return size;
    }

    // Handle both string and object formats
    if (size && typeof size === "object") {
      return `${size.value}${size.unit}`;
    }

    return size;
  };

  // Format color for display
  const formatColor = (color) => {
    if (typeof color === "string") {
      try {
        return JSON.parse(color);
      } catch {
        return { name: "Default", hex: "#000000" };
      }
    }
    return color;
  };

  // Common colors for quick selection
  const commonColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF0000" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Green", hex: "#008000" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Gray", hex: "#808080" },
    { name: "Purple", hex: "#800080" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "Orange", hex: "#FFA500" },
  ];

  return (
    <div className="mt-6 bg-zinc-800 rounded-xl border border-zinc-700 px-6 py-5">
      <h2 className="text-lg font-medium text-white mb-4">Product Variants</h2>

      <div className="space-y-6">
        {/* Size Options */}
        <div className="border-b border-zinc-700 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <TbRuler className="w-5 h-5 text-gray-400" />
              <h3 className="text-md font-medium text-white">Size Options</h3>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasSizeOptions"
                name="hasSizeOptions"
                checked={formData.hasSizeOptions}
                onChange={handleChange}
                className="mr-2 h-4 w-4 rounded border-gray-600 bg-zinc-700 text-primary focus:ring-primary"
              />
              <label htmlFor="hasSizeOptions" className="text-sm text-gray-300">
                Product has size options
              </label>
            </div>
          </div>

          {formData.hasSizeOptions && (
            <div className="space-y-4">
              {/* Size Type Selection */}
              <div>
                <label
                  htmlFor="sizeType"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Size Type
                </label>
                <select
                  id="sizeType"
                  name="sizeType"
                  value={formData.sizeType}
                  onChange={handleSizeTypeChange}
                  className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="standard">
                    Clothing Sizes (S, M, L, XL, etc.)
                  </option>
                  <option value="volume">Volume (ml, L, etc.)</option>
                  <option value="weight">Weight (g, kg, etc.)</option>
                </select>
              </div>

              {/* Quick Add Standard Sizes */}
              {formData.sizeType === "standard" && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Quick Add
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizeUnits.standard.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleQuickAddSize(size)}
                        className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 text-white text-sm rounded-md transition-colors"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Input */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <div className="flex-grow">
                  <label
                    htmlFor="sizeValue"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Size Value
                  </label>
                  <input
                    id="sizeValue"
                    name="value"
                    type="text"
                    value={newSize.value}
                    onChange={handleSizeChange}
                    className={`w-full bg-zinc-700/50 border ${
                      errors.sizeValue ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white placeholder-gray-500/40 focus:outline-none focus:border-primary transition-colors`}
                    placeholder={
                      formData.sizeType === "standard"
                        ? "S, M, L, XL, etc."
                        : formData.sizeType === "volume"
                        ? "500, 1, 2, etc."
                        : "100, 500, 1, etc."
                    }
                  />
                  {errors.sizeValue && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.sizeValue}
                    </p>
                  )}
                </div>

                {formData.sizeType !== "standard" && (
                  <div className="sm:w-1/3">
                    <label
                      htmlFor="sizeUnit"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Unit
                    </label>
                    <select
                      id="sizeUnit"
                      name="unit"
                      value={newSize.unit}
                      onChange={handleSizeChange}
                      className={`w-full bg-zinc-700/50 border ${
                        errors.sizeUnit ? "border-red-500" : "border-zinc-600"
                      } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    >
                      <option value="">Select unit</option>
                      {sizeUnits[formData.sizeType].map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                    {errors.sizeUnit && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sizeUnit}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Add Size Button */}
              <button
                type="button"
                onClick={handleAddSize}
                className="w-full sm:w-auto px-8 py-2 bg-primary hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Add Size
              </button>

              {/* Selected Sizes */}
              {formData.sizes.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Selected Sizes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.sizes.map((size, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-zinc-700 rounded-lg px-3 py-1 text-sm text-white"
                      >
                        <span>{formatSize(size)}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSize(index)}
                          className="ml-2 text-red-500 hover:text-red-400"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Color Options */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <TbPalette className="w-5 h-5 text-gray-400" />
              <h3 className="text-md font-medium text-white">Color Options</h3>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasColorOptions"
                name="hasColorOptions"
                checked={formData.hasColorOptions}
                onChange={handleChange}
                className="mr-2 h-4 w-4 rounded border-gray-600 bg-zinc-700 text-primary focus:ring-primary"
              />
              <label
                htmlFor="hasColorOptions"
                className="text-sm text-gray-300"
              >
                Product has color options
              </label>
            </div>
          </div>

          {formData.hasColorOptions && (
            <div className="space-y-4">
              {/* Quick Add Colors */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quick Add
                </label>
                <div className="flex flex-wrap gap-2">
                  {commonColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => handleQuickAddColor(color)}
                      className="px-3 py-1 rounded-md text-sm flex items-center space-x-2"
                      style={{ backgroundColor: color.hex }}
                    >
                      <span className="text-amber-700/80 font-semibold">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="colorName"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Color Name
                  </label>
                  <input
                    id="colorName"
                    name="name"
                    type="text"
                    value={newColor.name}
                    onChange={handleColorChange}
                    className={`w-full bg-zinc-700/50 border ${
                      errors.colorName ? "border-red-500" : "border-zinc-600"
                    } rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors`}
                    placeholder="Enter color name"
                  />
                  {errors.colorName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.colorName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="colorHex"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Color Code
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      id="colorHex"
                      name="hex"
                      type="color"
                      value={newColor.hex}
                      onChange={handleColorChange}
                      className="w-10 h-10 p-1 bg-zinc-700 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={newColor.hex}
                      onChange={handleColorChange}
                      className="w-full bg-zinc-700/50 border border-zinc-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Add Color Button */}
              <button
                type="button"
                onClick={handleAddColor}
                className="w-full sm:w-auto px-8 py-2 bg-primary hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Add Color
              </button>

              {/* Selected Colors */}
              {formData.colors.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Selected Colors
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.colors.map((color, index) => {
                      const formattedColor = formatColor(color);
                      return (
                        <div
                          key={index}
                          className="flex items-center rounded-lg px-3 py-1 text-sm text-white"
                          style={{ backgroundColor: formattedColor.hex }}
                        >
                          <span>{formattedColor.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(index)}
                            className="ml-2 text-white hover:text-red-400"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
