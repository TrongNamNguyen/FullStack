import React, { useState, useEffect } from "react";
import "./EditProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category_id: "",
    new_price: "",
    old_price: "",
    available: true
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tải danh sách danh mục
        const categoriesResponse = await fetch(`${backend_url}/categories`);
        if (!categoriesResponse.ok) {
          throw new Error('Không thể tải danh sách danh mục');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        
        // Tải thông tin sản phẩm
        const productResponse = await fetch(`${backend_url}/product/${id}`);
        if (!productResponse.ok) {
          throw new Error('Sản phẩm không tồn tại');
        }
        const productData = await productResponse.json();
        
        setProductDetails({
          name: productData.name,
          description: productData.description,
          image: productData.image,
          category_id: productData.category_id.toString(),
          new_price: productData.new_price,
          old_price: productData.old_price,
          available: productData.available === 1 || productData.available === true
        });
        
        setPreviewImage(backend_url + productData.image);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải thông tin. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productDetails.name || !productDetails.description || !productDetails.category_id || !productDetails.new_price) {
      toast.error("Vui lòng điền đầy đủ thông tin sản phẩm");
      return;
    }
    
    try {
      setSubmitting(true);
      
      let updatedProduct = {...productDetails};
      updatedProduct.category_id = parseInt(productDetails.category_id);
      updatedProduct.new_price = parseFloat(productDetails.new_price);
      
      if (productDetails.old_price) {
        updatedProduct.old_price = parseFloat(productDetails.old_price);
      }
      
      // Nếu người dùng đã chọn hình ảnh mới
      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const uploadResponse = await fetch(`${backend_url}/upload`, {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("Upload error:", errorText);
          throw new Error("Tải hình ảnh lên thất bại");
        }
        
        const uploadData = await uploadResponse.json();
        if (!uploadData.success) {
          throw new Error(uploadData.message || "Tải hình ảnh lên thất bại");
        }
        
        updatedProduct.image = uploadData.image_url;
      }

      const response = await fetch(`${backend_url}/updateproduct/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Update error:", errorText);
        throw new Error("Cập nhật sản phẩm thất bại");
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Sản phẩm đã được cập nhật thành công!");
        navigate('/listproduct');
      } else {
        throw new Error(result.message || "Cập nhật sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật sản phẩm");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails({ 
      ...productDetails, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  if (loading) {
    return <div className="loading">Đang tải thông tin sản phẩm...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/listproduct')}>Quay lại danh sách sản phẩm</button>
      </div>
    );
  }

  return (
    <div className="editproduct">
      <h2>Chỉnh sửa sản phẩm</h2>
      <div className="editproduct-itemfield">
        <p>Tên sản phẩm <span className="required">*</span></p>
        <input 
          type="text" 
          name="name" 
          value={productDetails.name} 
          onChange={handleInputChange} 
          placeholder="Nhập tên sản phẩm" 
          required
        />
      </div>
      <div className="editproduct-itemfield">
        <p>Mô tả sản phẩm <span className="required">*</span></p>
        <textarea 
          name="description" 
          value={productDetails.description} 
          onChange={handleInputChange} 
          placeholder="Nhập mô tả sản phẩm"
          rows="4"
          required
        />
      </div>
      <div className="editproduct-price">
        <div className="editproduct-itemfield">
          <p>Giá gốc</p>
          <input 
            type="number" 
            name="old_price" 
            value={productDetails.old_price} 
            onChange={handleInputChange} 
            placeholder="Nhập giá gốc" 
          />
        </div>
        <div className="editproduct-itemfield">
          <p>Giá bán <span className="required">*</span></p>
          <input 
            type="number" 
            name="new_price" 
            value={productDetails.new_price} 
            onChange={handleInputChange} 
            placeholder="Nhập giá bán" 
            required
          />
        </div>
      </div>
      <div className="editproduct-itemfield">
        <p>Danh mục sản phẩm <span className="required">*</span></p>
        <select 
          value={productDetails.category_id} 
          name="category_id" 
          className="editproduct-selector" 
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Chọn danh mục</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="editproduct-itemfield">
        <p>Hình ảnh sản phẩm <span className="required">*</span></p>
        <div className="editproduct-image-container">
          <label htmlFor="file-input">
            <img 
              className="editproduct-thumbnail-img" 
              src={previewImage || upload_area} 
              alt="Hình ảnh sản phẩm" 
            />
          </label>
          <input 
            onChange={handleImageChange}
            type="file" 
            name="image" 
            id="file-input" 
            accept="image/*" 
            hidden 
          />
          <p className="editproduct-image-hint">Nhấp vào hình ảnh để thay đổi</p>
        </div>
      </div>
      <div className="editproduct-itemfield">
        <label className="editproduct-checkbox-label">
          <input 
            type="checkbox" 
            name="available" 
            checked={productDetails.available} 
            onChange={handleInputChange} 
          />
          Sản phẩm có sẵn để bán
        </label>
      </div>
      <div className="editproduct-buttons">
        <button className="editproduct-cancel-btn" onClick={() => navigate('/listproduct')}>
          HỦY
        </button>
        <button 
          className="editproduct-save-btn" 
          onClick={handleUpdateProduct} 
          disabled={submitting}
        >
          {submitting ? "ĐANG CẬP NHẬT..." : "LƯU THAY ĐỔI"}
        </button>
      </div>
    </div>
  );
};

export default EditProduct; 