import Breadcrumb from "components/Breadcrumb";
import { PiExport } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const CustomerDetails = () => {
    const { customerId } = useParams();
    return (
        <div>
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h5>Customer</h5>
                    <Breadcrumb />
                </div>
                <div className="d-inline-flex gap-3">
                    <button className="btn export-btn">
                        <PiExport /> Export
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
