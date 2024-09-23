import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import "./Products.css";
import ProductTable from "components/ProductTable";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useContext, useEffect, useState } from "react";
import ProductContext from "context/ProductContext";

const ProductList = () => {
    const { products, loading } = useContext(ProductContext);
    const [productList, setProductList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    useEffect(() => {
        if (!loading) {
            setProductList(products);
        }
    }, [loading, products]);

    // Function to handle search input change
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
        setSearchQuery(query);
    };

    // Filter the product list based on search query
    const filteredProducts = productList.filter(
        (product) => product.title.toLowerCase().includes(searchQuery.trim()) // Adjust this to match your product's name or any other property
    );

    return (
        <div className="merchant-product-list py-4 mb-5 inter">
            <div>
                <div className="d-flex justify-content-between">
                    <h5>Product</h5>
                    <div className="d-inline-flex gap-3">
                        <button className="btn export-btn">
                            <PiExport /> Export
                        </button>
                        <Link
                            to="/products/add"
                            className="btn btn-primary text-white">
                            <IoMdAdd /> Add Product
                        </Link>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <form>
                        <div className="d-flex align-items-center border px-2 bg-white rounded">
                            <CgSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-input form-control shadow-none border-0 bg-transparent"
                                placeholder="Search product . . ."
                                value={searchQuery}
                                onChange={handleSearch} // Trigger search on input change
                            />
                        </div>
                    </form>
                    <div className="d-flex gap-3">
                        <input type="date" className="form-control" />
                        <button className="btn btn-white bg-white border filter-btn ">
                            <HiOutlineAdjustmentsHorizontal />
                            Filters
                        </button>
                    </div>
                </div>
                <div className="mt-4">
                    <ProductTable
                        productList={filteredProducts} // Use filtered products
                        itemsPerPage={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductList;
