import Loading from "components/Loading";
import { AuthContext } from "context/AuthContext";
import { NotificationContext } from "context/NotificationContext";
import SideNav from "components/SideNav";
import React, { useContext, useState } from "react";
import { Outlet,Navigate } from "react-router-dom";

const Layout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { isAuthenticated, loading, user } = useContext(AuthContext);
    const { showNotification } = useContext(NotificationContext);

    if (loading) {
        return <Loading />;
    }
    if (!isAuthenticated || user.privilege !== "superadmin") {
        showNotification("You are not authorized to access this page", "danger");
        return (
            <Navigate
                to={`/login`}
            />
        );
    }

    const handleSideBarCollapse = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="bg-light">
            <div className="row w-100">
                <div
                    className={`col-lg-2 col-md-3 ${
                        isOpen ? "col-5" : "col-1"
                    }`}>
                    <SideNav
                        onCollapse={handleSideBarCollapse}
                        isOpen={isOpen}
                    />
                </div>
                <div
                    className={`col-lg-10 col-md-9 ${
                        isOpen ? "col-7" : "col-11"
                    }   `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
