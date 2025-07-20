import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyForm from "./MyForm";
import Table from "./table";
import { ProductProvider } from "./productContext";

function App() {
  return (
    <div>
      <ProductProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/myform" replace />} />
        <Route path="/myform" element={<MyForm />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
