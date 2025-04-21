import React, { useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [expandedProducts, setExpandedProducts] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState(true);

  const isActive = (paths) => {
    return paths.some(path => location.pathname === path);
  };

  const toggleProducts = () => {
    setExpandedProducts(!expandedProducts);
  };

  const toggleCategories = () => {
    setExpandedCategories(!expandedCategories);
  };

  return (
    <div className='sidebar'>
      <div className="sidebar-brand">
        <h2>ADMIN DASHBOARD</h2>
      </div>
      
      <Link to='/' className={`sidebar-item ${isActive(['/']) ? 'active' : ''}`}>
        <span className="sidebar-icon">📊</span>
        <p>Tổng quan</p>
      </Link>
      
      <div className="sidebar-section">
        <div className="sidebar-section-header" onClick={toggleProducts}>
          <span className="sidebar-icon-small">{expandedProducts ? '▼' : '▶'}</span>
          <p>Quản lý sản phẩm</p>
        </div>
        
        {expandedProducts && (
          <div className="sidebar-section-content">
            <Link to='/listproduct' className={`sidebar-item ${isActive(['/listproduct']) ? 'active' : ''}`}>
              <span className="sidebar-icon">📋</span>
              <p>Danh sách sản phẩm</p>
            </Link>
            <Link to='/addproduct' className={`sidebar-item ${isActive(['/addproduct']) ? 'active' : ''}`}>
              <span className="sidebar-icon">➕</span>
              <p>Thêm sản phẩm</p>
            </Link>
          </div>
        )}
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-section-header" onClick={toggleCategories}>
          <span className="sidebar-icon-small">{expandedCategories ? '▼' : '▶'}</span>
          <p>Quản lý danh mục</p>
        </div>
        
        {expandedCategories && (
          <div className="sidebar-section-content">
            <Link to='/listcategories' className={`sidebar-item ${isActive(['/listcategories']) ? 'active' : ''}`}>
              <span className="sidebar-icon">🗂️</span>
              <p>Danh sách danh mục</p>
            </Link>
            <Link to='/addcategory' className={`sidebar-item ${isActive(['/addcategory']) ? 'active' : ''}`}>
              <span className="sidebar-icon">➕</span>
              <p>Thêm danh mục</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
