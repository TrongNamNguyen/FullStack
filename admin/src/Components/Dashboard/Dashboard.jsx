import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { backend_url } from '../../App';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Tải số lượng sản phẩm
        const productsResponse = await fetch(`${backend_url}/allproducts`);
        const productsData = await productsResponse.json();
        
        // Tải số lượng danh mục
        const categoriesResponse = await fetch(`${backend_url}/categories`);
        const categoriesData = await categoriesResponse.json();
        
        setStats({
          products: productsData.length,
          categories: categoriesData.length,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        setStats(prev => ({...prev, loading: false}));
      }
    };
    
    fetchStats();
  }, []);

  const summaryCards = [
    {
      title: 'Tổng sản phẩm',
      value: stats.products,
      icon: '📦',
      color: '#3498db',
      link: '/listproduct'
    },
    {
      title: 'Tổng danh mục',
      value: stats.categories,
      icon: '🗂️',
      color: '#2ecc71',
      link: '/listcategories'
    },
    {
      title: 'Doanh thu ước tính',
      value: '0 đ',
      icon: '📈',
      color: '#9b59b6',
      link: '/'
    },
    {
      title: 'Đơn hàng',
      value: '0',
      icon: '🛒',
      color: '#e74c3c',
      link: '/'
    }
  ];

  const recentProducts = [];
  const recentCategories = [];

  return (
    <div className="dashboard">
      <div className="admin-header">
        <h1>Bảng điều khiển</h1>
      </div>
      
      {stats.loading ? (
        <div className="dashboard-loading">Đang tải dữ liệu...</div>
      ) : (
        <>
          <div className="admin-summary">
            {summaryCards.map((card, index) => (
              <Link to={card.link} className="admin-summary-card" key={index}>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
                <div className="icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
              </Link>
            ))}
          </div>
          
          <div className="dashboard-row">
            <div className="admin-card dashboard-card">
              <h2 className="admin-form-title">Quản lý sản phẩm</h2>
              <div className="dashboard-actions">
                <Link to="/listproduct" className="admin-button admin-button-primary">Xem sản phẩm</Link>
                <Link to="/addproduct" className="admin-button admin-button-secondary">Thêm sản phẩm</Link>
              </div>
            </div>
            
            <div className="admin-card dashboard-card">
              <h2 className="admin-form-title">Quản lý danh mục</h2>
              <div className="dashboard-actions">
                <Link to="/listcategories" className="admin-button admin-button-primary">Xem danh mục</Link>
                <Link to="/addcategory" className="admin-button admin-button-secondary">Thêm danh mục</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 