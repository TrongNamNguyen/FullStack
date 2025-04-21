import React from 'react';
import './Breadcrums.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Breadcrums = ({ product }) => {
  return (
    <div className="breadcrums flex items-center text-sm text-gray-700">
      {/* Icon Home */}
      <FontAwesomeIcon icon={faHome} className="mr-2" />

      {/* HOME link */}
      <span className="mr-2">HOME</span>

      {/* Separator */}
      <span className="mx-2">|</span>

      {/* Category */}
      <span>{product.category}</span>

      {/* Separator */}
      {product.name && (
        <>
          <span className="mx-2">|</span>
          <span>{product.name}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrums;
