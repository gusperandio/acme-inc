import React from "react";
import Home from "./views/Home/Home.jsx";
import Product from "./views/Product/Products";
import Cart from "./views/Cart/Cart.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
