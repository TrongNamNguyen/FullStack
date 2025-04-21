import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import { toast } from 'react-toastify';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category_id: "",
    new_price: "",
    old_price: ""
  });

  // Lấy danh sách danh mục khi component được tải
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${backend_url}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          // Đặt giá trị mặc định cho category_id (danh mục đầu tiên)
          if (data.length > 0) {
            setProductDetails(prev => ({...prev, category_id: data[0].id.toString()}));
          }
        } else {
          console.error("Không thể tải danh sách danh mục");
        }
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleAddProduct = async () => {
    // Kiểm tra dữ liệu đầu vào
    if (!productDetails.name || !productDetails.description || !image || !productDetails.category_id || !productDetails.new_price) {
      toast.error("Vui lòng điền đầy đủ thông tin sản phẩm");
      return;
    }

    try {
      setLoading(true);
      
      // Upload hình ảnh
      let imageUrl = '';
      const formData = new FormData();
      formData.append('image', image);

      const uploadResponse = await fetch(`${backend_url}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("Upload error response:", errorText);
        throw new Error("Tải hình ảnh lên thất bại");
      }

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        throw new Error(uploadData.message || "Tải hình ảnh lên thất bại");
      }

      imageUrl = uploadData.image_url;
      
      // Tạo sản phẩm mới
      const productData = {
        name: productDetails.name,
        description: productDetails.description,
        image: imageUrl,
        category_id: parseInt(productDetails.category_id),
        new_price: parseFloat(productDetails.new_price),
        old_price: productDetails.old_price ? parseFloat(productDetails.old_price) : null
      };

      const createResponse = await fetch(`${backend_url}/addproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error("Create product error:", errorText);
        throw new Error("Thêm sản phẩm thất bại");
      }

      const createData = await createResponse.json();
      if (createData.success) {
        toast.success("Thêm sản phẩm thành công!");
        
        // Reset form
        setImage(null);
        setPreviewImage(null);
        setProductDetails({
          name: "",
          description: "",
          image: "",
          category_id: categories.length > 0 ? categories[0].id.toString() : "",
          new_price: "",
          old_price: ""
        });
      } else {
        throw new Error(createData.message || "Thêm sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Đã xảy ra lỗi khi thêm sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
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
      
      <div className="addproduct-itemfield">
        <p>Mô tả sản phẩm <span className="required">*</span></p>
        <textarea 
          name="description" 
          value={productDetails.description} 
          onChange={handleInputChange}
          placeholder="Nhập mô tả sản phẩm" 
          rows={4}
          required 
        />
      </div>
      
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Giá gốc</p>
          <input 
            type="number" 
            name="old_price" 
            value={productDetails.old_price} 
            onChange={handleInputChange}
            placeholder="Nhập giá gốc" 
          />
        </div>
        <div className="addproduct-itemfield">
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
      
      <div className="addproduct-itemfield">
        <p>Danh mục <span className="required">*</span></p>
        <select 
          value={productDetails.category_id} 
          name="category_id" 
          className="add-product-selector" 
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
      
      <div className="addproduct-itemfield">
        <p>Hình ảnh sản phẩm <span className="required">*</span></p>
        <label htmlFor="file-input">
          <img 
            className="addproduct-thumbnail-img" 
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
      </div>
      
      <button 
        className="addproduct-btn" 
        onClick={handleAddProduct}
        disabled={loading}
      >
        {loading ? "ĐANG XỬ LÝ..." : "THÊM SẢN PHẨM"}
      </button>
    </div>
  );
};

export default AddProduct;
