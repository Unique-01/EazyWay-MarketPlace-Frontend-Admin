import { Link } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "./TopCustomer.css";
const MerchantSales = ({ customers }) => {
    return (
        <div className="top-customers inter">
            <div className="card border-0 shadow-sm">
                <div className="pt-3 mb-0 card-header bg-white border-0 d-flex justify-content-between align-items-baseline">
                    <div>
                        <h6 className="heading">Sales by Merchant</h6>
                        <span className="small text-muted">Sales performance by merchant</span>
                    </div>
                    <p>
                        <Link className="see-all">
                            <HiOutlineDotsVertical />
                        </Link>
                    </p>
                </div>
                <div className="card-body inter ">
                    {customers.map((customer, index) => (
                        <div
                            key={index}
                            className="d-flex justify-content-between align-items-center mb-3">
                            <div className="d-flex align-items-center gap-2">
                                <img
                                    src={require(`/src/assets/images/products/${customer.image}`)}
                                    alt={customer.name}
                                    width={44}
                                    className="customer-image"
                                />
                                <div className="name-sales">
                                    <span className="customer-name ">
                                        {customer.name}
                                    </span>
                                    <br />
                                    <span className="sales">250 sales</span>
                                </div>
                            </div>
                            <div className="customer-name">$24,000</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MerchantSales;
