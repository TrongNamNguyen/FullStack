import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { backend_url } from '../../App';

const RelatedProducts = ({ category_id, id }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backend_url}/relatedproducts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category_id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch related products');
        }

        const data = await response.json();
        
        // Format the products data to include the full image URL
        const formattedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          image: product.image ? `${backend_url}${product.image}` : '',
          new_price: product.new_price,
          old_price: product.old_price,
          category: product.category_name,
          colors: product.colors || [],
        }));
        
        setRelatedProducts(formattedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (category_id) {
      fetchRelatedProducts();
    }
  }, [category_id]);

  if (loading) {
    return <div className="related-loading">Đang tải...</div>;
  }

  if (error) {
    return null; // Hide the component if there's an error
  }

  // Filter out the current product and limit to 4 products
  const filteredProducts = relatedProducts
    .filter(item => item.id !== id)
    .slice(0, 4);

  if (filteredProducts.length === 0) {
    return null; // Don't show the section if there are no related products
  }

  return (
    <div className='relatedproducts'>
      <h1>Có thể bạn thích</h1>
      <hr />
      <div className="relatedproducts-item">
        {filteredProducts.map((item, index) => (
          <Item 
            key={index} 
            id={item.id} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
            colors={item.colors} 
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts
