import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import { backend_url } from '../App'
import SearchBar from '../Components/SearchBar/SearchBar'

// HARD CODED DATA
const POPULARS = [
    {
        id: 1,
        title: "ÁO XUÂN HÈ",
        slug: "data-1",
        subcategory: [
            {
                id: 1,
                name: "Áo sơ mi",
                slug: "ao-so-mi",
                products: [
                    {
                        id: 1,
                        name: 'Black Dress',
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                        new_price: 500000,
                        old_price: 100000,
                        colors: [
                            {
                                id: 1,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                            },
                            {
                                id: 2,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                            },
                            {
                                id: 3,
                                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                            },
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "Áo thun",
                slug: "ao-thun",
                products: [
                    {
                        id: 1,
                        name: 'Black Dress',
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                        new_price: 500000,
                        old_price: 100000,
                        colors: [
                            {
                                id: 1,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                            },
                            {
                                id: 2,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                            },
                            {
                                id: 3,
                                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                            },
                        ]
                    }
                ]
            },
            {
                id: 3,
                name: "Áo khoác",
                slug: "ao-khoac",
                products: [
                    {
                        id: 1,
                        name: 'Black Dress',
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                        new_price: 500000,
                        old_price: 100000,
                        colors: [
                            {
                                id: 1,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                            },
                            {
                                id: 2,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                            },
                            {
                                id: 3,
                                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                            },
                        ]
                    }
                ]
            },
        ],
        products: [
            {
                id: 1,
                name: 'Áo Polo Regular L.3.3440',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 2,
                name: 'Áo Polo Regular L.3.3439',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 3,
                name: 'Áo Polo Regular L.3.3435',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_igNR5AU9VX.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 4,
                name: 'Áo Polo Regular L.3.3438',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250401_cBcUGdG74c.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 5,
                name: 'Áo Phông Oversize L.3.2900',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_OrewAydg3N.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 6,
                name: 'Áo Phông Oversize L.3.2880',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250401_K3YmY6vDUD.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 7,
                name: 'Áo Phông Loose L.3.2885',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250401_K3YmY6vDUD.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            }, ,
            {
                id: 8,
                name: 'Áo Phông Loose L.3.2902',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250401_K3YmY6vDUD.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
        ]
    },
    {
        id: 2,
        title: "QUẦN",
        slug: "data-2",
        subcategory: [
            {
                id: 1,
                name: "QUẦN DÀI",
                slug: "quan-dai",
                products: [
                    {
                        id: 1,
                        name: 'Black Dress',
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                        new_price: 500000,
                        old_price: 100000,
                        colors: [
                            {
                                id: 1,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                            },
                            {
                                id: 2,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                            },
                            {
                                id: 3,
                                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                            },
                        ]
                    }
                ]
            },
            {
                id: 2,
                name: "QUẦN SHORT",
                slug: "quan-short",
                products: [
                    {
                        id: 1,
                        name: 'Black Dress',
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg',
                        new_price: 500000,
                        old_price: 100000,
                        colors: [
                            {
                                id: 1,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                            },
                            {
                                id: 2,
                                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                            },
                            {
                                id: 3,
                                image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                            },
                        ]
                    }
                ]
            },
        ],
        products: [
            {
                id: 1,
                name: 'Quần Short Regular L.3.1648',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
            {
                id: 2,
                name: 'Quần Short Regular L.3.1659',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250225_OtrVROVmRT.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
            {
                id: 3,
                name: 'Quần Short Slim L.6.1631',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_B6Yn2JYkAb.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
            {
                id: 4,
                name: 'Quần Short Regular L.3.1635',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250125_GUnwO5bata.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
            {
                id: 5,
                name: 'Quần Âu 31.2.QA084',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250225_4GQ9DmBHLY.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
            {
                id: 6,
                name: 'Quần Jeans Loose QJ.30.1.1385',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20241216_WJILcLFY1z.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_1wI1EAgVKy.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_aMzjYLyFyF.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_ELnuslVKhm.jpeg"
                    },
                ]
            },
        ]
    },
]

const NEWCOLLECTIONS =  [
    {
        title: "BỘ SƯU TẬP MỚI",
        slug: "new-collection",
        products: [
            {
                id: 1,
                name: 'Black Dress',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 2,
                name: 'Black Dress',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            },
            {
                id: 3,
                name: 'Black Dress',
                image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_3RxnFFOYRt.jpeg',
                new_price: 500000,
                old_price: 100000,
                colors: [
                    {
                        id: 1,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250322_x8bscecumg.jpeg'
                    },
                    {
                        id: 2,
                        image: 'https://pos.nvncdn.com/f4d87e-8901/ps/20250327_eJIL3GouLA.jpeg'
                    },
                    {
                        id: 3,
                        image: "https://pos.nvncdn.com/f4d87e-8901/ps/20250322_X53u1e5afE.jpeg"
                    },
                ]
            }
        ]
    }
]

const Shop = () => {
    const [popularCategories, setPopularCategories] = useState([]);
    const [newCollection, setNewCollection] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchActive, setSearchActive] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backend_url}/categories`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            const categoriesData = await response.json();
            
            // Convert the categories to the format needed by the components
            if (categoriesData && categoriesData.length > 0) {
                const formattedCategories = await Promise.all(categoriesData.map(async (category) => {
                    // Fetch products for this category
                    const productsResponse = await fetch(`${backend_url}/products/category/${category.id}`);
                    let products = [];
                    
                    if (productsResponse.ok) {
                        products = await productsResponse.json();
                    }
                    
                    return {
                        id: category.id,
                        title: category.name,
                        slug: category.slug || category.name.toLowerCase().replace(/\s+/g, '-'),
                        subcategory: [], // Will need to implement subcategories if needed
                        products: products.map(product => ({
                            id: product.id,
                            name: product.name,
                            image: product.image ? `${backend_url}${product.image}` : '',
                            new_price: product.new_price,
                            old_price: product.old_price,
                            colors: product.colors || [], 
                            category: category.name
                        }))
                    };
                }));
                
                setPopularCategories(formattedCategories);
                
                // Set products for new collection (e.g., most recent products)
                const allProductsList = formattedCategories.flatMap(cat => cat.products);
                setAllProducts(allProductsList);
                setNewCollection(allProductsList.slice(0, 8)); // Take first 8 for new collection
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Hàm xử lý tìm kiếm
    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setSearchActive(false);
            return;
        }

        setSearchActive(true);
        const searchTermLower = searchTerm.toLowerCase();
        const results = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTermLower)
        );
        setFilteredProducts(results);
    };

    if (loading) {
        return <div className="loading-container">
            <div className="loading">Đang tải dữ liệu...</div>
        </div>;
    }

    if (error) {
        return <div className="error-container">
            <div className="error">Lỗi: {error}</div>
            <button onClick={fetchCategories}>Thử lại</button>
        </div>;
    }

    return (
        <div>
            <Hero />
            
            {/* Thêm thanh tìm kiếm */}
            <div className="search-section">
                <h2 className="search-title">Tìm kiếm sản phẩm</h2>
                <SearchBar onSearch={handleSearch} />
            </div>
            
            {/* Hiển thị kết quả tìm kiếm nếu đang tìm kiếm */}
            {searchActive && (
                <div className="search-results">
                    <h2>Kết quả tìm kiếm ({filteredProducts.length} sản phẩm)</h2>
                    <div className="search-results-grid">
                        {filteredProducts.length > 0 ? (
                            <NewCollections products={filteredProducts} />
                        ) : (
                            <div className="no-results">
                                <p>Không tìm thấy sản phẩm nào.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
            {/* Hiển thị danh mục nếu không đang tìm kiếm */}
            {!searchActive && (
                <>
                    {popularCategories.map((category, index) => (
                        <Popular key={index} data={category} />
                    ))}
                    <Offers />
                    {newCollection.length > 0 && (
                        <NewCollections products={newCollection} />
                    )}
                </>
            )}
            
            <NewsLetter />
        </div>
    )
}

export default Shop
