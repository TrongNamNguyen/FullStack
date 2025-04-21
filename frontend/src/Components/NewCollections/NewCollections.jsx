import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = ({ products }) => {
  return (
    <div className='new-collections'>
      <h1>Sản phẩm mới</h1>
      <hr />
      <div className="collections">
        {products && products.length > 0 && products.map((item, index) => {
          return <Item 
            id={item.id} 
            key={index} 
            name={item.name} 
            image={item.image} 
            new_price={item.new_price} 
            old_price={item.old_price} 
            colors={item.colors || []}
          />
        })}
      </div>
    </div>
  )
}

export default NewCollections
