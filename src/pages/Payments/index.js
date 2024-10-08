// import "./CustomerPayment.css";
import { useEffect, useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Payments.css";
import { usePayment } from "context/PaymentContext";
import AdminPagination from "components/AdminPagination";
import ButtonLoading from "components/ButtonLoading";

const CustomerPayment = () => {
    const [customers, setCustomers] = useState([]);
    const {
        payments,
        loading: paymentLoading,
        moreLoading,
        hasNextPage,
        loadMore,
    } = usePayment();
    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = customers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Calculate the current start and end indices for the items
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, totalItems);

    // Get the orders for the current page
    const currentPayment = customers.slice(startIdx - 1, endIdx);

    useEffect(() => {
        if (!paymentLoading) {
            setCustomers(payments);
        }
    }, [paymentLoading, payments]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="py-4">
            <div className=" customer-payment-table inter">
                <div className="bg-white rounded shadow-sm">
                    <div className="d-flex justify-content-between p-4">
                        <h5>Customer's Payment</h5>
                        <div className="d-flex gap-3">
                            <select className="form-select">
                                <option>All Data</option>
                            </select>
                            <select className="form-select">
                                <option>2024</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="table-head mb-5">
                                <tr className="text-capitalize">
                                    <th
                                        scope="col"
                                        className="ps-4 order-column ">
                                        Name
                                    </th>
                                    <th scope="col" className="order-column">
                                        Email
                                    </th>
                                    <th scope="col" className="order-column ">
                                        Payment Type
                                    </th>
                                    <th scope="col" className="order-column ">
                                        Paid Date
                                    </th>
                                    <th scope="col" className="order-column ">
                                        Paid Amount
                                    </th>
                                    <th scope="col" className="order-column ">
                                        status
                                    </th>
                                    <th scope="col" className="order-column">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="body mt-5 pt-5">
                                {currentPayment.map((customer, index) => (
                                    <tr
                                        className="align-middle px-0"
                                        key={index}>
                                        <td className="ps-4 order-column">
                                            <div className="d-inline-flex align-items-center gap-1 ">
                                                <img
                                                    src={
                                                        customer.user.image &&
                                                        customer.user.image.url
                                                    }
                                                    alt={
                                                        customer.user.firstName
                                                    }
                                                    className="img-fluid rounded"
                                                    style={{ maxWidth: "50px" }}
                                                />
                                                <div className="order-text fw-normal">
                                                    {customer.user.firstName}
                                                    &nbsp;
                                                    {customer.user.lastName}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="order-column fade-color">
                                            {customer.user.email}
                                        </td>
                                        <td className="order-text order-column fade-color text-capitalize">
                                            {customer.paymentMethod}
                                        </td>
                                        <td className="order-text order-column fade-color">
                                            <div>
                                                <span>
                                                    {new Date(
                                                        customer.createdAt
                                                    ).toLocaleDateString(
                                                        "de-DE"
                                                    )}
                                                </span>
                                                <br />
                                                <span className="small text-end">
                                                    {new Date(
                                                        customer.createdAt
                                                    ).toLocaleTimeString(
                                                        "en-GB",
                                                        { hour12: true }
                                                    )}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="order-text order-column fade-color">
                                            ${customer.amount}
                                        </td>
                                        <td className="order-column order-text ">
                                            {customer.statusText}
                                            {/* <div className="status">
                                                {customer.isAvailable ? (
                                                    <span className="low-stock rounded-pill">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="in-stock rounded-pill">
                                                        Processing
                                                    </span>
                                                )}
                                            </div> */}
                                        </td>

                                        <td>
                                            <div className="action d-flex gap-2">
                                                <Link>
                                                    <BsEye />
                                                </Link>
                                                <Link>
                                                    <FiEdit />
                                                </Link>
                                            </div>
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
        </div>
    );
};

export default CustomerPayment;
