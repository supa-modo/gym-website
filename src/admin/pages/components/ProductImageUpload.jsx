import { FiUpload } from "react-icons/fi";
import { TbCloudUpload, TbTrash } from "react-icons/tb";

export const ProductImageUpload = ({
  imagePreview,
  handleImageChange,
  handleRemoveImage,
  errors,
}) => {
  return (
    <div className="bg-zinc-800 rounded-xl border border-zinc-700 p-6">
      <h2 className="text-lg font-medium text-white mb-4">Product Image</h2>

      <div className="space-y-4">
        {/* Image Preview */}
        <div className="aspect-square bg-zinc-700 rounded-lg overflow-hidden flex items-center justify-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6">
              <FiUpload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No image selected</p>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="image-upload"
            className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center cursor-pointer"
          >
            <div className="flex items-center space-x-2 justify-center">
              <TbCloudUpload className="w-5 h-5" />
              <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
            </div>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
            >
              <TbTrash className="w-4 h-4 mr-2" />
              Remove Image
            </button>
          )}

          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}

          <p className="text-gray-400 text-xs mt-2">
            Recommended size: 800x800 pixels. Max file size: 5MB. Supported
            formats: JPEG, PNG, GIF, WEBP.
          </p>
        </div>
      </div>
    </div>
  );
};
