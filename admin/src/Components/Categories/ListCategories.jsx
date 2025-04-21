import React, { useEffect, useState } from "react";
import "./CategoryStyles.css";
import { backend_url } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backend_url}/categories`);
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Không thể tải danh sách danh mục");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const removeCategory = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      return;
    }
    
    try {
      const response = await fetch(`${backend_url}/removecategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Danh mục đã được xóa thành công!");
        fetchCategories();
      } else {
        toast.error("Không thể xóa danh mục: " + (result.message || "Lỗi không xác định"));
      }
    } catch (error) {
      console.error("Error removing category:", error);
      toast.error("Đã xảy ra lỗi khi xóa danh mục. Vui lòng thử lại sau.");
    }
  };

  const editCategory = (id) => {
    navigate(`/editcategory/${id}`);
  };

  // Lọc danh mục theo từ khóa tìm kiếm
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Quản lý danh mục</h1>
        <button 
          className="admin-button admin-button-primary"
          onClick={() => navigate('/addcategory')}
        >
          <span>➕</span> Thêm danh mục mới
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-filters">
          <div className="admin-search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm danh mục..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="admin-loading">Đang tải dữ liệu...</div>
        ) : (
          <>
            {filteredCategories.length === 0 ? (
              <div className="admin-empty">
                <p>Không tìm thấy danh mục nào</p>
                {searchTerm && (
                  <button 
                    className="admin-button admin-button-primary"
                    onClick={() => setSearchTerm("")}
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Tên danh mục</th>
                      <th>Mô tả</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCategories.map((category) => (
                      <tr key={category.id}>
                        <td>
                          <img 
                            className="product-thumbnail" 
                            src={category.image ? (backend_url + category.image) : '/placeholder.jpg'} 
                            alt={category.name} 
                          />
                        </td>
                        <td>{category.name}</td>
                        <td>{category.description || 'Không có mô tả'}</td>
                        <td>
                          <div className="admin-table-actions">
                            <button 
                              className="action-button edit-button" 
                              onClick={() => editCategory(category.id)} 
                              title="Chỉnh sửa danh mục"
                            >
                              ✏️
                            </button>
                            <button 
                              className="action-button delete-button" 
                              onClick={() => removeCategory(category.id)} 
                              title="Xóa danh mục"
                            >
                              🗑️
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

export default ListCategories; 