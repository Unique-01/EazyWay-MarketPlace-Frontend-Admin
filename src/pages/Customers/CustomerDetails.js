import Breadcrumb from "components/Breadcrumb";
import { PiExport } from "react-icons/pi";
import {  useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "api/apiClient";
import config from "config";
import Loading from "components/Loading";
import "./Customers.css";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import TransactionHistory from "./TransactionHistory";
import { useOrder } from "context/OrderContext";

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState({});
    const { orders, loading: orderLoading } = useOrder();
    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            try {
                const response = await apiClient.get(
                    `${config.API_BASE_URL}/user/manage-users/${customerId}`
                );
                setCustomer(response.data.data);
                console.log(response.data.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [customerId]);
    useEffect(() => {
        if (!orderLoading) {
            const userHistory = orders.filter(
                (order) => order.user._id === customer._id
            );
            setTransactionHistory(userHistory);
        }
    }, [orderLoading, orders, customer]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="customers inter mt-3">
            <div className="d-flex justify-content-between align-items-end mb-3">
                <div>
                    <h5>Customer Details</h5>
                    <Breadcrumb />
                </div>
                <div className="d-inline-flex gap-3">
                    <button className="btn  btn-primary text-white">
                        <PiExport /> Export
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="card position-relative">
                        <div className="card-header bg-white  px-2">
                            <div
                                style={{ height: "150px" }}
                                className="w-100 bg-primary"></div>
                            <div className="d-flex justify-content-center mt-5">
                                <img
                                    src={
                                        customer?.image?.url &&
                                        customer.image.url
                                    }
                                    alt="Customer"
                                    className=" rounded-circle customer-img"
                                    width={"150px"}
                                    height={"150px"}
                                />
                                <div className="mt-5 pt-2">
                                    <h6 className="position-relative">
                                        {customer.firstName +
                                            " " +
                                            customer.lastName}
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="d-flex gap-2 mb-3 align-items-center order-text">
                                <div className="icon">
                                    <MdOutlineMail />
                                </div>
                                <div className="small">
                                    <span className="text-muted">
                                        Billing Email
                                    </span>
                                    <br />
                                    <span>
                                        {customer?.extras?.email
                                            ? customer.extras.email
                                            : customer.email}
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-3  align-items-center order-text">
                                <div className="icon">
                                    <BsTelephone />
                                </div>
                                <div className="small">
                                    <span className="text-muted">
                                        Phone Number
                                    </span>
                                    <br />
                                    <span>{customer.telephone}</span>
                                </div>
                            </div>
                            <div className="d-flex gap-2 mb-3  align-items-center order-text">
                                <div className="icon">
                                    <IoLocationOutline />
                                </div>
                                <div className="small">
                                    <span className="text-muted">
                                        Delivery Address
                                    </span>
                                    <br />
                                    <span>
                                        {customer?.extras?.streetAddress &&
                                            customer.extras.streetAddress}
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex gap-2  align-items-center order-text">
                                <div className="icon">
                                    <CiShoppingCart />
                                </div>
                                <div className="small">
                                    <span className="text-muted small">
                                        Latest Transaction
                                    </span>
                                    <br />
                                    <span>
                                        {new Date(
                                            customer.lastTransactionDate
                                        ).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className=" col-md-6 ">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-end h-100 justify-content-between">
                                    <div>
                                        <span className="wallet-icon icon">
                                            <FaWallet />
                                        </span>
                                        <p className="title mb-2 small text-muted">
                                            Total Balance
                                        </p>

                                        <h5>${customer.ordersBalance}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" col-md-6 ">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body d-flex align-items-end h-100 justify-content-between">
                                    <div>
                                        <span className="icon cart-icon">
                                            <FiShoppingCart />
                                        </span>
                                        <p className="title mb-2 small text-muted">
                                            Total Orders
                                        </p>

                                        <h5>{customer.ordersTotal}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <TransactionHistory orderList={transactionHistory} itemsPerPage={5} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
