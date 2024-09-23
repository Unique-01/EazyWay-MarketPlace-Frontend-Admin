import { RiCoinsLine } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { TbCubeSend } from "react-icons/tb";
import { PiUsersThreeBold } from "react-icons/pi";
import "./Totals.css";

const Totals = ({ sales, orders, products, customers }) => {
    return (
        <div className="row totals row-gap-3">
            <div className="col-lg-3 col-md-6 ">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-end h-100 justify-content-between">
                        <div>
                            <p className="title mb-2">Total Sales</p>

                            <span className="value">{sales}</span>
                        </div>
                        <div>
                            <RiCoinsLine className="total-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 ">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-end h-100 justify-content-between">
                        <div>
                            <p className="title mb-2">Total Orders</p>

                            <span className="value">{orders}</span>
                        </div>
                        <div>
                            <GoChecklist className="total-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 ">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-end h-100 justify-content-between">
                        <div>
                            <p className="title mb-2">Total Products</p>

                            <span className="value">{products}</span>
                        </div>
                        <div>
                            <TbCubeSend className="total-icon" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-3 col-md-6 ">
                <div className="card border-0 shadow-sm">
                    <div className="card-body d-flex align-items-end h-100 justify-content-between">
                        <div>
                            <p className="title mb-2">Total Customers</p>

                            <span className="value">{customers}</span>
                        </div>
                        <div>
                            <PiUsersThreeBold className="total-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Totals;
