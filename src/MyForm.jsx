import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";
import "./app.css";

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
    <div className="container">
      <h1>React Demo Project</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("productName")} placeholder="Product Name" />
        {errors.productName && <span>{errors.productName.message}</span>}

        <input {...register("brand")} placeholder="Brand" />
        {errors.brand && <span>{errors.brand.message}</span>}

        <input {...register("category")} placeholder="Category" />
        {errors.category && <span>{errors.category.message}</span>}

        <textarea
          {...register("description")}
          cols={65}
          rows={10}
          placeholder="Description"
        />
        {errors.description && <span>{errors.description.message}</span>}

        <input type="number" {...register("price")} placeholder="Price" />
        {errors.price && <span>{errors.price.message}</span>}

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => navigate("/table")}>
            View Table
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyForm;
