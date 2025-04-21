import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = ({ description }) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Mô tả sản phẩm</div>
        <div className="descriptionbox-nav-box fade">Đánh giá (0)</div>
      </div>
      <div className="descriptionbox-description">
        {description ? (
          <div dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>Không có mô tả cho sản phẩm này.</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
