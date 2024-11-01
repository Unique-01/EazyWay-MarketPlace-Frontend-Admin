import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GoChecklist } from "react-icons/go";
import { FaChartLine } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import {
    AiOutlineNodeCollapse,
    AiOutlineDollar,
    AiOutlineNodeExpand,
    AiFillProduct,
} from "react-icons/ai";
import "./SideNav.css";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

const SideNav = ({ onCollapse, isOpen }) => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };
    const handleCollapse = () => {
        onCollapse();
    };
    return (
        <div className=" merchant-side-nav position-sticky top-0 p-0 ">
            <nav className="h-100 bg-white">
                <div className="d-md-none">
                    <button
                        title="Collapse Side Bar"
                        className="collapse-btn "
                        onClick={handleCollapse}>
                        {isOpen ? (
                            <AiOutlineNodeCollapse />
                        ) : (
                            <AiOutlineNodeExpand />
                        )}
                    </button>
                </div>
                <div
                    className={` d-flex flex-column h-100 bg-white shadow-sm ${
                        isOpen ? "d-block" : "d-none"
                    }`}>
                    <NavLink to="/" end className="nav-link w-100">
                        <MdDashboard className="nav-icon" />
                        <span className="">Dashboard</span>
                    </NavLink>
                    <NavLink to="/orders" className="nav-link w-100">
                        <GoChecklist className="nav-icon" />
                        <span className="">Orders</span>
                    </NavLink>
                    <div className="accordion border-0 " id="accordionExample">
                        <div className="accordion-item border-0">
                            <div className="accordion-header ">
                                <button
                                    className="accordion-button collapsed shadow-none"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne">
                                    <AiFillProduct className="nav-icon" />
                                    <span className="">Products</span>
                                </button>
                            </div>
                            <div
                                id="collapseOne"
                                className="accordion-collapse collapse">
                                <div className="accordion-body">
                                    <div>
                                        <NavLink
                                            to="/products"
                                            className="nav-link w-100">
                                            Product List
                                        </NavLink>
                                    </div>
                                    <div>
                                        <NavLink
                                            to="/categories"
                                            className="nav-link w-100">
                                            Categories
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <NavLink to="/customers" className="nav-link w-100">
                        <ImUsers className="nav-icon" />
                        <span className="">Customers</span>
                    </NavLink>
                    <NavLink to="/merchants" className="nav-link w-100">
                        <ImUsers className="nav-icon" />
                        <span className="">Merchants</span>
                    </NavLink>
                    <NavLink to="/payments" className="nav-link w-100">
                        <AiOutlineDollar className="nav-icon" />
                        <span className="">Payments</span>
                    </NavLink>
                    {/* <NavLink to="/settings" className="nav-link w-100">
                        <IoMdSettings className="nav-icon" />
                        <span className="">Settings</span>
                    </NavLink> */}
                    <button
                        onClick={handleLogout}
                        className="nav-link w-100 mt-auto mb-5">
                        <IoLogOut className="nav-icon" />
                        <span className="">Logout</span>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SideNav;
