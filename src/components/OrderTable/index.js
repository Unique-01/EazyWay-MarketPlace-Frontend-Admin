import "./OrderTable.css";
import { useState } from "react";
import MerchantPagination from "../AdminPagination";
import { BsEye } from "react-icons/bs";
import { RiPencilLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import FormattedDate from "components/FormattedDate";

const OrderTable = ({ orderList, itemsPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = orderList.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the current start and end indices for the items
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

    // Get the orders for the current page
    const currentOrders = orderList.slice(startIdx - 1, endIdx);

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
                                            Order ID
                                        </span>
                                    </span>
                                </th>
                                <th scope="col" className="order-column">
                                    product
                                </th>
                                <th scope="col" className="order-column">
                                    Date
                                </th>
                                <th scope="col" className="order-column">
                                    Customer
                                </th>
                                <th scope="col" className="order-column">
                                    Total
                                </th>
                                <th scope="col" className="order-column">
                                    Payment
                                </th>
                                <th scope="col" className="order-column">
                                    Status
                                </th>
                                <th scope="col" className="order-column">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body mt-5 pt-5">
                            {currentOrders.map((order, index) => (
                                <tr className="align-middle px-0" key={index}>
                                    <td className="ps-4 order-column">
                                        <span className="d-flex  gap-2 align-items-center">
                                            <input
                                                type="checkbox"
                                                className="form-check-input shadow-none"
                                                id="select"
                                            />
                                            <span
                                                htmlFor="select"
                                                className="form-check-label order-id">
                                                {order.itemId}
                                            </span>
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-inline-flex align-items-center gap-1 ">
                                            {order?.carts[0]?.product ? (
                                                <>
                                                    <img
                                                        src={
                                                            order.carts[0]
                                                                .product
                                                                .image &&
                                                            order.carts[0]
                                                                .product.image
                                                                .url
                                                        }
                                                        alt="product"
                                                        className="img-fluid rounded"
                                                        style={{
                                                            maxWidth: "50px",
                                                        }}
                                                    />
                                                    <div className="order-text fw-normal">
                                                        <span className="item-name">
                                                            {
                                                                order.carts[0]
                                                                    .product
                                                                    .title
                                                            }
                                                        </span>
                                                        <br />
                                                        <span className="other-product fade-color">
                                                            {order.carts
                                                                .length > 1
                                                                ? `+ ${order.carts.length} other products`
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        <FormattedDate date={order.createdAt} />
                                    </td>
                                    <td className="order-text order-column">
                                        <div>
                                            <div>
                                                {order.user.firstName +
                                                    " " +
                                                    order.user.lastName}
                                            </div>
                                            <div className="customer-mail fade-color">
                                                {order.user.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        ${order.amount}
                                    </td>
                                    <td className="fade-color">Mastercard</td>
                                    <td className="order-column">
                                        {order.statusText}
                                        {/* <div className="merchant-product-status">
                                            {order.Completed ? (
                                                <span className="low-stock rounded-pill">
                                                    In Stock
                                                </span>
                                            ) : (
                                                <span className="in-stock rounded-pill">
                                                    Low Stock
                                                </span>
                                            )}
                                        </div> */}
                                    </td>
                                    <td>
                                        <div className="action d-flex gap-2">
                                            <Link to={`/orders/${order._id}`}>
                                                <BsEye />
                                            </Link>
                                            <Link>
                                                <RiPencilLine />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <MerchantPagination
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

export default OrderTable;
