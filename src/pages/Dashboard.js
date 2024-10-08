import MerchantSales from "../components/MerchantSales";
import TopSellingProduct from "../components/TopSellingProduct";
import Totals from "../components/Totals";
import OrderTable from "../components/OrderTable";
import { VscSettings } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import DashboardStatContext from "context/DashboardStatContext";
import { useOrder } from "context/OrderContext";

const Dashboard = () => {
    const [totals, setTotals] = useState({});
    const [merchants, setMerchants] = useState([]);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [recentOrders, setRecentOrders] = useState([]);
    const { orders, loading: ordersLoading } = useOrder();
    const {
        card,
        topSelling,
        salesUsers,
        loading: statLoading,
    } = useContext(DashboardStatContext);

    useEffect(() => {
        if (!statLoading) {
            setTotals(card);
            setMerchants(salesUsers);
            setTopSellingProducts(topSelling);
        }
    }, [statLoading, card, salesUsers, topSelling]);

    useEffect(() => {
        if (!ordersLoading) {
            setRecentOrders(orders.slice(0, 5));
        }
    }, [ordersLoading, orders]);
    return (
        <div className="py-5">
            <div style={{ minHeight: "100vh" }}>
                <Totals
                    sales={totals.sales}
                    orders={totals.orders}
                    products={totals.products}
                    customers={totals.customers}
                />
                <div className="row mt-4">
                    <div className="col-lg-8">
                        <TopSellingProduct
                            productList={topSellingProducts}
                            itemsPerPage={5}
                        />
                    </div>
                    <div className="col-lg-4">
                        <MerchantSales merchants={merchants} />
                    </div>
                </div>
                <div className="mt-4">
                    <div className="d-flex bg-white justify-content-between align-items-center p-3">
                        <h5 className=" m-0 heading text-capitalize">
                            Recent Orders
                        </h5>
                        <div className="d-inline-flex gap-3">
                            <button className="btn btn-white border filter-btn">
                                <VscSettings
                                    className="me-1"
                                    style={{ fontSize: "16px" }}
                                />
                                Filters
                            </button>
                            <button className="btn btn-primary text-white filter-btn fw-semibold">
                                See More
                            </button>
                        </div>
                    </div>
                    <OrderTable orderList={recentOrders} itemsPerPage={5} full={false} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
