import { useParams } from "react-router-dom";
import { PiExport } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { BiTask } from "react-icons/bi";
import { AiOutlineCreditCard } from "react-icons/ai";
import { LiaTruckSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import OrderProduct from "components/OrderProduct";
import { useOrder } from "context/OrderContext";
import { useState, useEffect } from "react";
import Loading from "components/Loading";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import FormattedDate from "components/FormattedDate";

const OrderDetails = () => {
    const { orderId } = useParams();
    const { orders, loading: orderLoading } = useOrder();
    const [order, setOrder] = useState({});

    useEffect(() => {
        if (!orderLoading) {
            setOrder(orders.find((order) => order._id === orderId));
        }
    }, [orders, orderLoading, orderId]);

    if (orderLoading) {
        return <Loading />;
    }

    if (!order) {
        return <NotFoundPage />;
    }
    return (
        <div className="merchant-orders inter py-4">
            <div>
                <div className="d-flex justify-content-between">
                    <h5>Order Details</h5>
                    <div className="d-inline-flex gap-3">
                        <button className="btn btn-light bg-white text-muted">
                            {order.statusText}
                        </button>
                        <button className="btn export-btn">
                            <PiExport /> Export
                        </button>
                        <Link
                            to="/merchant/products/add"
                            className="btn btn-primary text-white">
                            <HiOutlineNewspaper />
                            Invoice
                        </Link>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="mb-3">
                                            Order {order.itemId}
                                        </h6>
                                        <div className="d-flex justify-content-between align-items-center order-text mb-3">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <BiTask />
                                                </div>
                                                Added
                                            </span>
                                            <span>
                                                <FormattedDate
                                                    date={order.createdAt}
                                                />
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center order-text mb-3">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <AiOutlineCreditCard />
                                                </div>
                                                Payment Method
                                            </span>
                                            <span className="text-capitalize">{order.paymentMethod}</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center order-text">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <LiaTruckSolid />
                                                </div>
                                                Shipping Method
                                            </span>
                                            <span>{order.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <h6 className="mb-3">Customer</h6>
                                        <div className="d-flex justify-content-between align-items-center order-text mb-3">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <FaRegUser />
                                                </div>
                                                Customer
                                            </span>
                                            <span>
                                                {" "}
                                                {order.user &&
                                                    order.user.firstName +
                                                        " " +
                                                        order.user.lastName}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center order-text mb-3 flex-wrap">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <MdOutlineMail />
                                                </div>
                                                Email
                                            </span>
                                            <span>
                                                {order.user && order.user.email}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center order-text">
                                            <span className="d-inline-flex gap-2 align-items-center">
                                                <div className="icon">
                                                    <IoIosPhonePortrait />
                                                </div>
                                                Phone
                                            </span>
                                            <span>
                                                {order.user &&
                                                    order.user.telephone}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <OrderProduct order={order} />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h6 className="mb-3">Document</h6>
                                <div className="d-flex justify-content-between align-items-center order-text mb-3">
                                    <span className="d-inline-flex gap-2 align-items-center">
                                        <div className="icon">
                                            <HiOutlineNewspaper />
                                        </div>
                                        Invoice
                                    </span>
                                    <span>{order.date}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center order-text mb-3">
                                    <span className="d-inline-flex gap-2 align-items-center">
                                        <div className="icon">
                                            <LiaTruckSolid />
                                        </div>
                                        Shipping
                                    </span>
                                    <span>{order.date}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center order-text">
                                    <span className="d-inline-flex gap-2 align-items-center">
                                        <div className="icon">
                                            <RiVerifiedBadgeLine />
                                        </div>
                                        Rewards
                                    </span>
                                    <span>{order.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0 shadow-sm mt-3">
                            <div className="card-body">
                                <h6 className="mb-3">Address</h6>
                                <div className="d-flex gap-2 align-items-center order-text mb-3">
                                    <div className="icon">
                                        <TfiLocationPin />
                                    </div>

                                    <div>
                                        <span className="small text-muted">
                                            Billing
                                        </span>
                                        <br />
                                        <span>
                                            {order.user?.extras &&
                                                order.user.extras.streetAddress}
                                        </span>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 align-items-center order-text mb-3">
                                    <div className="icon">
                                        <TfiLocationPin />
                                    </div>

                                    <div>
                                        <span className="small text-muted">
                                            Shipping
                                        </span>
                                        <br />
                                        <span>
                                            {order.user?.extras &&
                                                order.user.extras.streetAddress}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
