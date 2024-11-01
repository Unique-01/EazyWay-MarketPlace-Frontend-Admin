import { Link } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Breadcrumb from "components/Breadcrumb";
import CustomerTable from "./CustomerTable";
import { useCustomer } from "context/CustomersContext";

const CustomerList = () => {
    const { customers, loading } = useCustomer();
    // const { products, loading } = useContext(ProductContext);
    const [customerList, setCustomerList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    useEffect(() => {
        if (!loading) {
            setCustomerList(customers);
            console.log(customers);
        }
    }, [loading, customers]);

    // Function to handle search input change
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
        setSearchQuery(query);
    };

    // Filter the product list based on search query
    const filteredCustomer = customerList.filter(
        (customer) =>
            customer.firstName.toLowerCase().includes(searchQuery.trim()) // Adjust this to match your product's name or any other property
    );

    return (
        <div className="merchant-product-list py-4 mb-5 inter">
            <div>
                <div className="d-flex justify-content-between align-items-end">
                    <div>
                        <h5>Customer</h5>
                        <Breadcrumb />
                    </div>
                    {/* <div className="d-inline-flex gap-3">
                        <button className="btn export-btn">
                            <PiExport /> Export
                        </button>
                        <Link
                            to="/products/add"
                            className="btn btn-primary text-white">
                            <IoMdAdd /> Add Product
                        </Link>
                    </div> */}
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <form>
                        <div className="d-flex align-items-center border px-2 bg-white rounded">
                            <CgSearch className="search-icon" />
                            <input
                                type="text"
                                className="search-input form-control shadow-none border-0 bg-transparent"
                                placeholder="Search customer . . ."
                                value={searchQuery}
                                onChange={handleSearch} // Trigger search on input change
                            />
                        </div>
                    </form>
                    {/* <div className="d-flex gap-3">
                        <input type="date" className="form-control" />
                        <button className="btn btn-white bg-white border filter-btn ">
                            <HiOutlineAdjustmentsHorizontal />
                            Filters
                        </button>
                    </div> */}
                </div>
                <div className="mt-4">
                    <CustomerTable
                        customerList={filteredCustomer}
                        itemsPerPage={10}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerList;
