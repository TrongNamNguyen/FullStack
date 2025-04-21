import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import EditProduct from "../Components/EditProduct/EditProduct";
import AddCategory from "../Components/Categories/AddCategory";
import ListCategories from "../Components/Categories/ListCategories";
import EditCategory from "../Components/Categories/EditCategory";
import Dashboard from "../Components/Dashboard/Dashboard";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Product Management Routes */}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          
          {/* Category Management Routes */}
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/listcategories" element={<ListCategories />} />
          <Route path="/editcategory/:id" element={<EditCategory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
