import TopCustomers from "../components/MerchantSales";
import TopSellingProduct from "../components/TopSellingProduct";
import Totals from "../components/Totals";
// import products from "features/Products/products.json";
import Customers from "components/review.json";
import orderList from "components/order.json";
import OrderTable from "../components/OrderTable";
import { VscSettings } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import ProductContext from "context/ProductContext";

const Dashboard = () => {
    const { products, loading } = useContext(ProductContext);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (!loading) {
            setProductList(products);
        }
    }, [loading, products]);
    return (
        <div className="py-5">
            <div style={{ minHeight: "100vh" }}>
                <Totals
                    sales={"10,550"}
                    orders={"1,200"}
                    products={productList.length}
                    customers={500}
                />
                <div className="row mt-4">
                    <div className="col-lg-8">
                        <TopSellingProduct
                            productList={productList}
                            itemsPerPage={5}
                        />
                    </div>
                    <div className="col-lg-4">
                        <TopCustomers customers={Customers} />
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
                    <OrderTable orderList={orderList} itemsPerPage={4} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
