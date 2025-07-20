import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";

// ✅ Zod schema
const schema = z.object({
  productName: z.string().nonempty("Product Name is required"),
  brand: z.string().nonempty("Brand is required"),
  category: z.string().nonempty("Category is required"),
  description: z.string().nonempty("Description is required"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Minimum price is 1")
  ),
});

function MyForm() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    addProduct(data); // ✅ Add to context
    reset();
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        React Demo Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <input
            {...register("productName")}
            placeholder="Product Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Brand */}
        <div>
          <input
            {...register("brand")}
            placeholder="Brand"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <input
            {...register("category")}
            placeholder="Category"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            {...register("price")}
            placeholder="Price"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/table")}
            className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            View Table
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyForm;
