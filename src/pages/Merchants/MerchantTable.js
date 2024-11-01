import { useState } from "react";
import Pagination from "components/AdminPagination";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import FormattedDate from "components/FormattedDate";
import ButtonLoading from "components/ButtonLoading";
import { useMerchants } from "context/MerchantContext";

const MerchantTable = ({ merchantList, itemsPerPage }) => {
    const { moreLoading, hasNextPage, loadMore } = useMerchants();
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = merchantList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the current start and end indices for the items
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

    // Get the orders for the current page
    const currentMerchant = merchantList.slice(startIdx - 1, endIdx);

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
                                            Merchant Name
                                        </span>
                                    </span>
                                </th>
                                <th scope="col" className="order-column">
                                    Phone
                                </th>
                                <th scope="col" className="order-column">
                                    Orders
                                </th>

                                <th scope="col" className="order-column">
                                    status
                                </th>
                                <th scope="col" className="order-column">
                                    Created
                                </th>
                                <th scope="col" className="order-column">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body mt-5 pt-5">
                            {currentMerchant.map((merchant, index) => (
                                <tr className="align-middle px-0" key={index}>
                                    <td className="ps-4 order-column">
                                        <span className="d-flex  gap-2 align-items-center">
                                            <input
                                                type="checkbox"
                                                className="form-check-input shadow-none"
                                                id="select"
                                            />
                                            <div className="d-inline-flex align-items-center gap-1 ">
                                                {merchant.image && (
                                                    <img
                                                        src={merchant.image.url}
                                                        alt={merchant.title}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            maxWidth: "50px",
                                                        }}
                                                    />
                                                )}
                                                <div className="order-text fw-normal">
                                                    <span className="item-name">
                                                        {merchant.firstName +
                                                            " " +
                                                            merchant.lastName}
                                                    </span>
                                                    <br />
                                                    <span className="other-product fade-color">
                                                        {merchant.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </span>
                                    </td>
                                    <td className="order-column">
                                        {merchant.telephone}
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        {merchant.ordersTotal}
                                    </td>

                                    <td className="order-text order-column ">
                                        {/* {merchant.statusText} */}
                                        <div className="merchant-product-status">
                                            {merchant.statusText ===
                                            "activated" ? (
                                                <span className="in-stock rounded-pill">
                                                    {merchant.statusText}
                                                </span>
                                            ) : (
                                                <span className="low-stock rounded-pill">
                                                    {merchant.statusText}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td className="order-column fade-color">
                                        <FormattedDate
                                            date={merchant.createdAt}
                                        />
                                    </td>
                                    <td>
                                        <div className="action d-flex gap-2">
                                            {/* <Link
                                                to={`/customers/${merchant._id}`}>
                                                <BsEye />
                                            </Link> */}
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

                {totalPages === currentPage && (
                    <div className="text-center mb-2">
                        <button
                            className="btn btn-primary text-white"
                            onClick={loadMore}
                            disabled={moreLoading || !hasNextPage}>
                            Load More {moreLoading && <ButtonLoading />}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantTable;
