import { useState } from "react";
import AdminPagination from "components/AdminPagination";
import FormattedDate from "components/FormattedDate";
import ButtonLoading from "components/ButtonLoading";
import { useOrder } from "context/OrderContext";

const TransactionHistory = ({ orderList, itemsPerPage }) => {
    const { moreLoading, hasNextPage, loadMore } = useOrder();
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
                <div className="p-3">
                    <h6>Transaction History</h6>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-head mb-5">
                            <tr className="text-capitalize">
                                <th scope="col" className="ps-4 order-column">
                                    Order ID
                                </th>
                                <th scope="col" className="order-column">
                                    product
                                </th>

                                <th scope="col" className="order-column">
                                    Total
                                </th>

                                <th scope="col" className="order-column">
                                    Status
                                </th>
                                <th scope="col" className="order-column">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body mt-5 pt-5">
                            {currentOrders.map((order, index) => (
                                <tr className="align-middle px-0" key={index}>
                                    <td className="ps-4 order-column text-primary">
                                        {order.itemId}
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
                                        ${order.amount}
                                    </td>
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
                                    <td className="order-text order-column fade-color">
                                        <FormattedDate date={order.createdAt} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <AdminPagination
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

export default TransactionHistory;
