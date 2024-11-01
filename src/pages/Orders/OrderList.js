import { PiExport } from "react-icons/pi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import "./Orders.css";
import OrderTable from "components/OrderTable";
import Breadcrumb from "components/Breadcrumb";
import { useOrder } from "context/OrderContext";
import { useState, useEffect } from "react";
import Loading from "components/Loading";

const OrderList = () => {
    const { orders, loading: ordersLoading } = useOrder();
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        if (!ordersLoading) {
            setOrderList(orders);
            console.log(orders)
        }
    }, [ordersLoading, orders]);

    if (ordersLoading) {
        return <Loading />;
    }

    return (
        <div className="merchant-orders inter py-4">
            <div>
                <div className="d-flex justify-content-between align-items-end">
                    <div>
                        <h5 className="">Orders</h5>
                        <Breadcrumb />
                    </div>
                    {/* <div className="d-inline-flex gap-3">
                        <button className="btn export-btn">
                            <PiExport /> Export
                        </button>
                    </div> */}
                </div>
                {/* <div className="d-flex justify-content-end gap-3 mt-4">
                    <button className="btn btn-white bg-white border filter-btn ">
                        <HiOutlineAdjustmentsHorizontal />
                        Filters
                    </button>
                </div> */}
                <div className="mt-4">
                    <OrderTable orderList={orderList} itemsPerPage={10} />
                </div>
            </div>
        </div>
    );
};

export default OrderList;
