import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../Context/ShopContext";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { backend_url } from "../App";


const FILTER_COLORS = [
    { name: "Đen", value: "#2d3436" }, // Màu đen
    { name: "Trắng", value: "#FFFFFF" }, // Màu trắng
    { name: "Xanh", value: "#0984e3" }, // Màu xanh dương
    { name: "Đỏ", value: "#eb4d4b" }, // Màu đỏ
    { name: "Vàng", value: "#f9ca24" }, // Màu vàng
    { name: "Hồng", value: "#e056fd" }, // Màu hồng
    { name: "Nâu", value: "#535c68" }, // Màu nâu
    { name: "Xám", value: "#808080" }, // Màu xám
    { name: "Be", value: "#F5F5DC" }, // Màu be
    { name: "Cam", value: "#f0932b" }, // Màu cam
]


const FILTER_SIZES = [
    { name: "S", value: "s" },
    { name: "M", value: "m" },
    { name: "L", value: "l" },
    { name: "XL", value: "xl" },
    { name: "XXL", value: "xxl" },
]

const FILTER_PRICES = [
    { name: "Dưới 500.000đ", value: "under_500k" },
    { name: "500.000đ - 1.000.000đ", value: "500k_to_1m" },
    { name: "1.000.000đ - 2.000.000đ", value: "1m_to_2m" },
    { name: "2.000.000đ - 3.000.000đ", value: "2m_to_3m" },
    { name: "Trên 3.000.000đ", value: "over_3m" },
]


const ShopCategory = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [colorPicked, setColorPicked] = useState("");
    const [sizePicked, setSizePicked] = useState("");
    const [pricePicked, setPricePicked] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryId, setCategoryId] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch category ID by name
    const fetchCategoryId = async () => {
        try {
            const response = await fetch(`${backend_url}/categories`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const categories = await response.json();
            const category = categories.find(cat => 
                cat.name.toLowerCase() === props.category.toLowerCase()
            );
            
            if (category) {
                setCategoryId(category.id);
                return category.id;
            } else {
                setError('Không tìm thấy danh mục');
                return null;
            }
        } catch (error) {
            console.error("Error fetching category:", error);
            setError(error.message);
            return null;
        }
    };

    // Fetch products by category ID
    const fetchProducts = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`${backend_url}/products/category/${id}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            
            const products = await response.json();
            
            // Format products
            const formattedProducts = products.map(product => ({
                id: product.id,
                name: product.name,
                image: product.image ? `${backend_url}${product.image}` : '',
                new_price: product.new_price,
                old_price: product.old_price,
                category: props.category,
                colors: product.colors || [],
                available: product.available
            }));
            
            setAllProducts(formattedProducts);
            setFilteredProducts(formattedProducts);
            setTotalProducts(formattedProducts.length);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        const fetchData = async () => {
            const id = await fetchCategoryId();
            if (id) {
                await fetchProducts(id);
            }
        };
        
        fetchData();
    }, [props.category]);

    // Apply filters, search, and sorting
    useEffect(() => {
        if (allProducts.length === 0) return;
        
        let filtered = [...allProducts];
        
        // Apply search filter
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        // Apply color filter if selected
        if (colorPicked) {
            // Apply color filter if the product has this color
            // This is a placeholder - you'll need to modify based on your actual color data structure
        }
        
        // Apply size filter if selected
        if (sizePicked) {
            // Apply size filter
            // This is a placeholder - you'll need to modify based on your actual size data structure
        }
        
        // Apply price filter if selected
        if (pricePicked) {
            switch (pricePicked) {
                case 'under_500k':
                    filtered = filtered.filter(item => item.new_price < 500000);
                    break;
                case '500k_to_1m':
                    filtered = filtered.filter(item => item.new_price >= 500000 && item.new_price <= 1000000);
                    break;
                case '1m_to_2m':
                    filtered = filtered.filter(item => item.new_price > 1000000 && item.new_price <= 2000000);
                    break;
                case '2m_to_3m':
                    filtered = filtered.filter(item => item.new_price > 2000000 && item.new_price <= 3000000);
                    break;
                case 'over_3m':
                    filtered = filtered.filter(item => item.new_price > 3000000);
                    break;
                default:
                    break;
            }
        }
        
        // Apply sorting
        switch (sortBy) {
            case 'price_low_to_high':
                filtered.sort((a, b) => a.new_price - b.new_price);
                break;
            case 'price_high_to_low':
                filtered.sort((a, b) => b.new_price - a.new_price);
                break;
            case 'newest':
            default:
                // Sort by ID descending assuming newer products have higher IDs
                filtered.sort((a, b) => b.id - a.id);
                break;
        }
        
        setFilteredProducts(filtered);
    }, [allProducts, colorPicked, sizePicked, pricePicked, sortBy, searchTerm]);

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        e.preventDefault();
        // Tìm kiếm đã được xử lý trong useEffect
    };

    // Hàm xử lý xóa tìm kiếm
    const clearSearch = () => {
        setSearchTerm("");
    };

    if (loading) {
        return <div className="loading-container">
            <div className="loading">Đang tải dữ liệu...</div>
        </div>;
    }

    if (error) {
        return <div className="error-container">
            <div className="error">Lỗi: {error}</div>
            <button onClick={() => fetchCategoryId()}>Thử lại</button>
        </div>;
    }

    return (
        <div className="shopcategory">
            <Breadcrums product={{
                category: props.category,
            }} />
            <img src={props.banner} className="shopcategory-banner" alt="" />
            
            {/* Thêm khung tìm kiếm */}
            <div className="search-container mb-4 mt-4">
                <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="py-2 px-4 w-full outline-none"
                    />
                    {searchTerm && (
                        <button 
                            type="button" 
                            onClick={clearSearch}
                            className="px-2 text-gray-500 hover:text-gray-700"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                    <button 
                        type="submit" 
                        className="bg-black text-white py-2 px-4 hover:bg-gray-800"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
            
            <div className="shopcategory-indexSort">
                <div>
                    <h1 className="uppercase text-4xl font-bold">{props.category}</h1>
                    <p><span>Hiển thị {filteredProducts.length}</span> trong tổng số {totalProducts} sản phẩm</p>
                </div>
                <div className="shopcategory-sort">
                    <span className="font-bold mr-4">Sắp xếp theo:</span>
                    <select 
                        name="sort" 
                        id="sort" 
                        className="outline-none"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="price_low_to_high">Giá thấp đến cao</option>
                        <option value="price_high_to_low">Giá cao đến thấp</option>
                    </select>
                </div>
            </div>
            {/* filters */}
            <div className="shopcategory-filters pt-5 pb-5 ">
                <span className="uppercase font-bold">Bộ lọc</span>
                <div className="group flex items-center justify-between gap-[100px] relative">
                    <div className="shopcategory-filter-item flex items-center justify-center gap-2 cursor-pointer">
                        <p className="font-bold">Màu sắc</p>
                        <FontAwesomeIcon icon={faCaretDown} className="mb-1" />
                    </div>
                    <div className="shopcategory-filter-item flex items-center justify-center gap-2 cursor-pointer">
                        <p className="font-bold">Kích cỡ</p>
                        <FontAwesomeIcon icon={faCaretDown} className="mb-1" />
                    </div>
                    <div className="shopcategory-filter-item flex items-center justify-center gap-2 cursor-pointer">
                        <p className="font-bold">Khoảng giá</p>
                        <FontAwesomeIcon icon={faCaretDown} className="mb-1" />
                    </div>

                    {/* Filter board */}
                    <div className="absolute top-[100%] left-0 translate-x-[-100px] lg-left-2 w-fit h-fit bg-white z-10 hidden group-hover:block trabslate-y-2 transition-all duration-500 ease-in-out shadow-lg rounded-lg p-5 border">
                        <div className="shopcategory-filter-board flex gap-[120px]">
                            <div className="shopcategory-filter-board-item">
                                {/* <h1 className="font-bold">Màu sắc</h1> */}
                                <div className="shopcategory-filter-board-item-colors grid grid-cols-2 gap-3 w-[60px]">
                                    {FILTER_COLORS.map((color, index) => {
                                        return (
                                            <div key={index} className={`shopcategory-filter-board-item-color transition-all duration-300 ease-in-out ${colorPicked === color.value && 'scale-[1.2]'}`} onClick={() => setColorPicked(color.value)}>
                                                <div className="shopcategory-filter-board-item-color-box w-[25px] h-[25px] cursor-pointer border" style={{ backgroundColor: color.value }}></div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="shopcategory-filter-board-item">
                                {/* <h1 className="font-bold">Kích cỡ</h1> */}
                                <div className="shopcategory-filter-board-item-sizes">
                                    {FILTER_SIZES.map((size, index) => {
                                        return (
                                            <div key={index} className="shopcategory-filter-board-item-size " onClick={() => setSizePicked(size.value)}>
                                                <label htmlFor={`size-${size.value}`} className="flex items-center justify-start gap-2 select-none mb-2">
                                                    <input type="checkbox" className="checkbox-custom" id={`size-${size.value}`} />
                                                    <p className="">{size.name}</p>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="shopcategory-filter-board-item">
                                {/* <h1 className="font-bold">Khoảng giá</h1> */}
                                <div className="shopcategory-filter-board-item-prices">
                                    {FILTER_PRICES.map((price, index) => {
                                        return (
                                            <div key={index} className="shopcategory-filter-board-item-price" onClick={() => setPricePicked(price.value)}>
                                               <label htmlFor={`size-${price.value}`} className="flex items-center justify-start gap-2 mb-2">
                                                    <input type="checkbox" className="checkbox-custom" id={`size-${price.value}`} checked={pricePicked === price.value} />
                                                    <p className="text-nowrap select-none">{price.name}</p>
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="shopcategory-products">
                {filteredProducts.map((item, i) => (
                    <Item 
                        id={item.id} 
                        key={i} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                        colors={item.colors || []} 
                    />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-products">
                    <p>Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc{searchTerm ? ` hoặc từ khóa "${searchTerm}"` : ""}.</p>
                    <button 
                        className="admin-button admin-button-primary"
                        onClick={() => {
                            setColorPicked("");
                            setSizePicked("");
                            setPricePicked("");
                            setSortBy("newest");
                            setSearchTerm("");
                        }}
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            )}

            {/* Pagination */}
            <div className="shopcategory-pagination pt-5">
                <div className="shopcategory-pagination-item active">1</div>
                <div className="shopcategory-pagination-item">2</div>
                <div className="shopcategory-pagination-item">3</div>
                <div className="shopcategory-pagination-item">4</div>
                <div className="shopcategory-pagination-item">5</div>
                <div className="shopcategory-pagination-item">...</div>
                <div className="shopcategory-pagination-item">10</div>
                <div className="shopcategory-pagination-item">Next</div>
            </div>
        </div>
    );
};

export default ShopCategory;
