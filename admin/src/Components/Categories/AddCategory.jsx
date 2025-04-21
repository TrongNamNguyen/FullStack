import React, { useState } from "react";
import "./CategoryStyles.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategory = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails({
      ...categoryDetails,
      [name]: value
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryDetails.name) {
      toast.error('Tên danh mục là bắt buộc');
      return;
    }
    
    try {
      setLoading(true);
      
      let imageUrl = '';
      
      // Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        
        console.log('Uploading image:', image.name, image.type, image.size);
        
        try {
          const uploadResponse = await fetch(`${backend_url}/upload`, {
            method: 'POST',
            body: formData
          });
          
          console.log('Upload response status:', uploadResponse.status);
          
          if (!uploadResponse.ok) {
            const responseText = await uploadResponse.text();
            console.error('Upload response text:', responseText);
            throw new Error(`Tải ảnh lên thất bại: ${uploadResponse.status} ${uploadResponse.statusText}`);
          }
          
          const uploadData = await uploadResponse.json();
          console.log('Upload response data:', uploadData);
          
          if (uploadData.success) {
            imageUrl = uploadData.image_url;
            console.log('Image URL:', imageUrl);
          } else {
            throw new Error(uploadData.message || 'Tải ảnh lên thất bại');
          }
        } catch (error) {
          console.error('Image upload error:', error);
          toast.error(error.message || 'Đã xảy ra lỗi khi tải ảnh lên');
          setLoading(false);
          return;
        }
      }
      
      // Create category
      const createResponse = await fetch(`${backend_url}/addcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: categoryDetails.name,
          description: categoryDetails.description,
          image: imageUrl
        })
      });
      
      if (!createResponse.ok) {
        const responseText = await createResponse.text();
        console.error('Create category response:', responseText);
        throw new Error(`Thêm danh mục thất bại: ${createResponse.status} ${createResponse.statusText}`);
      }
      
      const createData = await createResponse.json();
      
      if (createData.success) {
        toast.success('Thêm danh mục thành công');
        navigate('/listcategories');
      } else {
        throw new Error(createData.message || 'Thêm danh mục thất bại');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error(error.message || 'Đã xảy ra lỗi khi thêm danh mục');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-form">
      <h2>Thêm danh mục mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="category-itemfield">
          <p>Tên danh mục <span className="required">*</span></p>
          <input
            type="text"
            name="name"
            value={categoryDetails.name}
            onChange={handleInputChange}
            placeholder="Nhập tên danh mục"
            required
          />
        </div>
        
        <div className="category-itemfield">
          <p>Mô tả</p>
          <textarea
            name="description"
            value={categoryDetails.description}
            onChange={handleInputChange}
            placeholder="Mô tả danh mục (không bắt buộc)"
            rows={4}
          />
        </div>
        
        <div className="category-itemfield">
          <p>Hình ảnh danh mục</p>
          <div className="category-image-container">
            <label htmlFor="category-image-input">
              <img
                src={previewImage || upload_area}
                alt="Hình ảnh thu nhỏ danh mục"
                className="category-thumbnail-img"
              />
              <small className="category-image-hint">
                Nhấp để {previewImage ? 'thay đổi' : 'tải lên'} hình ảnh (không bắt buộc)
              </small>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="category-image-input"
              hidden
            />
          </div>
        </div>
        
        <div className="category-buttons">
          <button
            type="button"
            className="category-cancel-btn"
            onClick={() => navigate('/listcategories')}
          >
            Hủy
          </button>
          
          <button
            type="submit"
            className="category-save-btn"
            disabled={loading || !categoryDetails.name}
          >
            {loading ? 'Đang tạo...' : 'Tạo danh mục'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory; 