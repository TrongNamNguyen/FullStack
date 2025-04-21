import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import { backend_url, currency } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    setLoading(true);
    try {
      // Tải danh sách sản phẩm
      const productsResponse = await fetch(`${backend_url}/allproducts`);
      const productsData = await productsResponse.json();
      setAllProducts(productsData);

      // Tải danh sách danh mục
      const categoriesResponse = await fetch(`${backend_url}/categories`);
      const categoriesData = await categoriesResponse.json();
      setCategories(categoriesData);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      toast.error("Không thể tải dữ liệu");
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }
    
    try {
      const response = await fetch(`${backend_url}/removeproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Sản phẩm đã được xóa thành công!");
        fetchInfo();
      } else {
        toast.error("Không thể xóa sản phẩm: " + (result.message || "Lỗi không xác định"));
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Đã xảy ra lỗi khi xóa sản phẩm. Vui lòng thử lại sau.");
    }
  };

  const toggleAvailability = async (product) => {
    try {
      const newAvailability = product.available === 1 || product.available === true ? 0 : 1;
      
      const response = await fetch(`${backend_url}/updateavailability/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: newAvailability }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success(newAvailability ? "Sản phẩm đã được hiển thị" : "Sản phẩm đã được ẩn");
        fetchInfo();
      } else {
        toast.error("Không thể cập nhật trạng thái sản phẩm: " + (result.message || "Lỗi không xác định"));
      }
    } catch (error) {
      console.error("Error updating product availability:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật trạng thái sản phẩm.");
    }
  };

  const editProduct = (id) => {
    navigate(`/editproduct/${id}`);
  };

  const formatPrice = (price) => {
    return price ? currency + Number(price).toLocaleString('vi-VN') : "-";
  };

  // Lọc sản phẩm theo tìm kiếm và danh mục
  const filteredProducts = allproducts.filter(product => {
    // Lọc theo tên
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Lọc theo danh mục
    const categoryMatch = filterCategory === "" || product.category_id.toString() === filterCategory;
    
    return nameMatch && categoryMatch;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Quản lý sản phẩm</h1>
        <button 
          className="admin-button admin-button-primary"
          onClick={() => navigate('/addproduct')}
        >
          📥 Thêm sản phẩm mới
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-filters">
          <div className="admin-search">
            🔍
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="admin-filter">
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="admin-loading">Đang tải dữ liệu...</div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="admin-empty">
                <p>Không tìm thấy sản phẩm nào</p>
                <button 
                  className="admin-button admin-button-primary"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("");
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá gốc</th>
                      <th>Giá bán</th>
                      <th>Danh mục</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img 
                            className="product-thumbnail" 
                            src={backend_url + product.image} 
                            alt={product.name} 
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{formatPrice(product.old_price)}</td>
                        <td>{formatPrice(product.new_price)}</td>
                        <td>{product.category_name}</td>
                        <td>
                          <span 
                            className={`admin-status-badge ${product.available === 1 || product.available === true ? 'admin-status-active' : 'admin-status-inactive'}`}
                            onClick={() => toggleAvailability(product)}
                          >
                            {product.available === 1 || product.available === true ? 'Hiển thị' : 'Ẩn'}
                          </span>
                        </td>
                        <td>
                          <div className="admin-table-actions">
                            <button 
                              className="action-button edit-button" 
                              onClick={() => editProduct(product.id)}
                              title="Chỉnh sửa"
                            >
                              ✏️
                            </button>
                            <button 
                              className="action-button delete-button" 
                              onClick={() => removeProduct(product.id)}
                              title="Xóa"
                            >
                              🗑️
                            </button>
                            <button 
                              className="action-button visibility-button" 
                              onClick={() => toggleAvailability(product)}
                              title={product.available === 1 || product.available === true ? 'Ẩn sản phẩm' : 'Hiển thị sản phẩm'}
                            >
                              {product.available === 1 || product.available === true ? '👁️‍🗨️' : '👁️'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListProduct;
