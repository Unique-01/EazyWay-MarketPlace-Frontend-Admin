import { useState } from "react";
import Pagination from "components/AdminPagination";
import { BsEye } from "react-icons/bs";
import { RiPencilLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormattedDate from "components/FormattedDate";

const CategoryTable = ({ categoryList, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = categoryList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the current start and end indices for the items
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

    // Get the orders for the current page
    const currentCategories = categoryList.slice(startIdx - 1, endIdx);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="merchant-order-table inter">
            <div className="bg-white rounded shadow-sm">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-head mb-5">
                            <tr className="text-capitalize">
                                <th scope="col" className="ps-4 order-column">
                                    <span className="d-flex  gap-2 align-items-center">
                                        <input
                                            type="checkbox"
                                            className="form-check-input shadow-none"
                                            id="select"
                                        />
                                        <span
                                            htmlFor="select"
                                            className="form-check-label">
                                            Category
                                        </span>
                                    </span>
                                </th>
                                <th scope="col" className="order-column">
                                    Sales
                                </th>
                                <th scope="col" className="order-column">
                                    stock
                                </th>
                                <th scope="col" className="order-column">
                                    Added
                                </th>
                                <th scope="col" className="order-column">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body mt-5 pt-5">
                            {currentCategories.map((category, index) => (
                                <tr className="align-middle px-0" key={index}>
                                    <td className="ps-4 order-column">
                                        <span className="d-flex  gap-2 align-items-center">
                                            <input
                                                type="checkbox"
                                                className="form-check-input shadow-none"
                                                id="select"
                                            />
                                            <div className="d-inline-flex align-items-center gap-1 ">
                                                {category.image && (
                                                    <img
                                                        src={category.image.url}
                                                        alt={category.title}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            maxWidth: "50px",
                                                        }}
                                                    />
                                                )}
                                                <div className="order-text fw-normal">
                                                    <span className="item-name text-capitalize" >
                                                        {category.title}
                                                    </span>
                                                    <br />
                                                    <span className="small fade-color">
                                                        {category.description}
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                    </td>
                                    <td className="order-column fade-color">
                                        15000
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        120
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        <FormattedDate
                                            date={category.createdAt}
                                        />
                                    </td>

                                    <td>
                                        <div className="action d-flex gap-2">
                                            <Link
                                                to={`/categories/${category._id}`}>
                                                <BsEye />
                                            </Link>
                                            <Link
                                                to={`/categories/${category._id}/edit`}>
                                                <RiPencilLine />
                                            </Link>
                                            <Link>
                                                <FaRegTrashAlt />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    startIdx={startIdx}
                    endIdx={endIdx}
                    totalItems={totalItems}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default CategoryTable;
