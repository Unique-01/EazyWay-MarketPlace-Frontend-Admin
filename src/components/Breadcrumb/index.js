import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const formatBreadcrumb = (str) => {
    return str.split("_").join(" ");
};

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className=" mt-4">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Dashboard</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    const breadcrumbLabel = formatBreadcrumb(value);
                    return (
                        <li
                            key={to}
                            className={`breadcrumb-item text-capitalize ${
                                isLast ? "active" : ""
                            }`}
                            aria-current={isLast ? "page" : undefined}>
                            {isLast ? (
                                breadcrumbLabel
                            ) : (
                                <Link to={to}>{breadcrumbLabel}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
