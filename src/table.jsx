import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";
import getProducts from "./@utils/getProducts";

const Table = () => {
  const navigate = useNavigate();
  const { products: formProducts, removeProduct } = useProducts();
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setApiProducts(data);
    }
    fetchData();
  }, []);

  // Build a unified list: add a `source` flag so we know how to delete
  const allProducts = [
    ...formProducts.map((p, i) => ({ ...p, _source: "form", _formIndex: i })),
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
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Product Table</h1>
        <button
          onClick={() => navigate("/myform")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Form
        </button>
      </div>

      {allProducts.length === 0 ? (
        <p className="text-center text-gray-600">No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Product Name
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Brand
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Category
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Description
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Price
                </th>
                <th className="px-4 py-2 border border-gray-300 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((prod, idx) => (
                <tr key={`${prod._source}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {prod.productName || prod.title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {prod.brand}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {prod.category}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {prod.description}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    ${prod.price}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
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
