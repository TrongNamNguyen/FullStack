import React, { useState, useEffect } from "react";
import "./CategoryStyles.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        setFetchLoading(true);
        const response = await fetch(`${backend_url}/category/${id}`);
        if (!response.ok) {
          throw new Error('Danh mục không tồn tại');
        }
        const data = await response.json();
        
        if (data.success) {
          setCategoryDetails({
            name: data.category.name || "",
            slug: data.category.slug || "",
            description: data.category.description || "",
            image: data.category.image || ""
          });
          
          if (data.category.image) {
            setPreviewImage(data.category.image);
          }
        } else {
          throw new Error(data.message || 'Failed to fetch category');
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin danh mục:", error);
        setFetchError(error.message);
        setLoading(false);
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchCategoryDetails();
    }
  }, [id]);

  const handleGenerateSlug = () => {
    // Tạo slug tự động từ tên danh mục
    const slug = categoryDetails.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setCategoryDetails({...categoryDetails, slug});
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

  const updateCategory = async (e) => {
    e.preventDefault();
    
    if (!categoryDetails.name || !categoryDetails.slug) {
      toast.error('Name and slug are required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      let imageUrl = categoryDetails.image;
      
      // Upload new image if selected
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        
        const uploadResponse = await fetch(`${backend_url}/upload`, {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
        }
        
        const uploadData = await uploadResponse.json();
        
        if (uploadData.success) {
          imageUrl = uploadData.imageUrl;
        } else {
          throw new Error(uploadData.message || 'Image upload failed');
        }
      }
      
      // Update category data
      const response = await fetch(`${backend_url}/updatecategory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: categoryDetails.name,
          slug: categoryDetails.slug,
          description: categoryDetails.description,
          image: imageUrl
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast.success('Danh mục đã được cập nhật thành công!');
        navigate('/listcategories');
      } else {
        throw new Error(result.message || 'Failed to update category');
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error(error.message || 'An error occurred while updating the category');
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setCategoryDetails({ 
      ...categoryDetails, 
      [e.target.name]: e.target.value 
    });
  };

  const handleCancel = () => {
    navigate('/listcategories');
  };

  if (fetchLoading) {
    return <div className="loading">Đang tải thông tin danh mục...</div>;
  }

  if (fetchError) {
    return (
      <div className="error">
        <p>{fetchError}</p>
        <button onClick={handleCancel}>Quay lại danh sách danh mục</button>
      </div>
    );
  }

  return (
    <div className="category-form">
      <h2>Chỉnh sửa danh mục</h2>
      <form onSubmit={updateCategory}>
        <div className="category-itemfield">
          <p>Tên danh mục <span className="required">*</span></p>
          <input 
            type="text" 
            name="name" 
            value={categoryDetails.name} 
            onChange={changeHandler} 
            placeholder="Nhập tên danh mục" 
            required
          />
        </div>
        <div className="category-itemfield">
          <div className="slug-field">
            <p>Đường dẫn (slug) <span className="required">*</span></p>
            <button 
              type="button" 
              className="generate-slug-btn" 
              onClick={handleGenerateSlug}
              disabled={!categoryDetails.name}
            >
              Tạo tự động
            </button>
          </div>
          <input 
            type="text" 
            name="slug" 
            value={categoryDetails.slug} 
            onChange={changeHandler} 
            placeholder="Nhập đường dẫn (slug) cho danh mục" 
            required
          />
          <small>Ví dụ: thoi-trang-nam, do-dien-tu, ...</small>
        </div>
        <div className="category-itemfield">
          <p>Mô tả danh mục</p>
          <textarea 
            name="description" 
            value={categoryDetails.description} 
            onChange={changeHandler} 
            placeholder="Nhập mô tả cho danh mục" 
            rows="4"
          />
        </div>
        <div className="category-itemfield">
          <p>Hình ảnh danh mục</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="category-image-input"
          />
          <label htmlFor="category-image-input" className="category-image-container">
            <img
              src={previewImage || upload_area}
              alt="Category thumbnail"
              className="category-thumbnail-img"
            />
            <small className="category-image-hint">
              Click to {previewImage ? 'change' : 'upload'} image (optional)
            </small>
          </label>
        </div>
        <div className="category-buttons">
          <button className="category-cancel-btn" onClick={handleCancel}>
            HỦY
          </button>
          <button 
            className="category-save-btn" 
            type="submit"
            disabled={loading || !categoryDetails.name || !categoryDetails.slug}
          >
            {loading ? 'Lưu thay đổi...' : 'LƯU THAY ĐỔI'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory; 