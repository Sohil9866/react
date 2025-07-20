import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";
import getProducts from "./@utils/getProducts";

const Table = () => {
  const navigate = useNavigate();
  const { products: formProducts, removeProduct } = useProducts();

  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading immediately

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setApiProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Merge form products + API products
  const allProducts = [
    ...formProducts.map((p, i) => ({
      ...p,
      _source: "form",
      _formIndex: i,
    })),
    ...apiProducts.map((p, i) => ({ ...p, _source: "api", _apiIndex: i })),
  ];

  const handleDelete = (item) => {
    if (item._source === "form") {
      removeProduct(item._formIndex);
    } else if (item._source === "api") {
      setApiProducts((prev) => prev.filter((_, i) => i !== item._apiIndex));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Navigation Button */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate("/myform")}
          className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Form
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Product Table</h1>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : allProducts.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border-b text-left">Product Name</th>
                <th className="px-4 py-2 border-b text-left">Brand</th>
                <th className="px-4 py-2 border-b text-left">Category</th>
                <th className="px-4 py-2 border-b text-left">Description</th>
                <th className="px-4 py-2 border-b text-left">Price</th>
                <th className="px-4 py-2 border-b text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((prod, idx) => (
                <tr key={`${prod._source}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {prod.productName || prod.title}
                  </td>
                  <td className="px-4 py-2 border-b">{prod.brand}</td>
                  <td className="px-4 py-2 border-b">{prod.category}</td>
                  <td className="px-4 py-2 border-b">{prod.description}</td>
                  <td className="px-4 py-2 border-b">${prod.price}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleDelete(prod)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
