import React, { useEffect, useState } from 'react'
import Breadcrums from '../Components/Breadcrums/Breadcrums'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useParams } from 'react-router-dom'
import { backend_url } from '../App'

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backend_url}/product/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        
        // Format the product data to include the full image URL
        const formattedProduct = {
          ...data,
          image: data.image ? `${backend_url}${data.image}` : '',
          category: data.category_name,
          // Ensure these properties exist to prevent undefined errors
          colors: data.colors || [],
          sizes: data.sizes || []
        };
        
        setProduct(formattedProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return <div className="loading-container">
      <div className="loading">Đang tải dữ liệu...</div>
    </div>;
  }

  if (error) {
    return <div className="error-container">
      <div className="error">Lỗi: {error}</div>
      <button onClick={() => window.location.reload()}>Thử lại</button>
    </div>;
  }

  if (!product) {
    return <div className="error-container">
      <div className="error">Không tìm thấy sản phẩm</div>
      <button onClick={() => window.history.back()}>Quay lại</button>
    </div>;
  }

  return (
    <div>
      <Breadcrums product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox description={product.description}/>
      <RelatedProducts id={product.id} category_id={product.category_id}/>
    </div>
  );
}

export default Product
