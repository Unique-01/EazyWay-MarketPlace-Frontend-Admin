import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

// Function to detect and replace an ID-like value with "details"
const formatBreadcrumb = (str) => {
    // A basic check: If the string looks like an ID (alphanumeric and long), return "details"
    const idPattern = /^[a-f0-9]{24}$/i; // This is a typical MongoDB ObjectId pattern
    return idPattern.test(str) ? "details" : str.split("_").join(" ");
};

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="container mt-4">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
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