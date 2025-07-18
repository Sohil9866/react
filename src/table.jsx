import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "./productContext";
import "./table.css";
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
    <div className="table-container">
      <button onClick={() => navigate("/myform")} className="navigate-btn">
        Form
      </button>
      <h1>Product Table</h1>

      {allProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((prod, idx) => (
              <tr key={`${prod._source}-${idx}`}>
                <td>{prod.productName || prod.title}</td>
                <td>{prod.brand}</td>
                <td>{prod.category}</td>
                <td>{prod.description}</td>
                <td>${prod.price}</td>
                <td>
                  <button onClick={() => handleDelete(prod)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
