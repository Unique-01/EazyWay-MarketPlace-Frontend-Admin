import { Pagination } from "react-bootstrap";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const AdminPagination = ({
    startIdx,
    endIdx,
    totalItems,
    currentPage,
    handlePageChange,
    totalPages,
}) => {
    return (
        <div className="d-flex justify-content-between pagination-component  px-4 py-2">
            {/* Pagination Info */}
            <div className="pagination-info ">
                Showing {startIdx}-{endIdx} of {totalItems} products
            </div>

            {/* Pagination Controls */}
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    <MdArrowBackIosNew />
                </Pagination.Prev>

                {Array.from({ length: totalPages }, (_, idx) => (
                    <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === currentPage}
                        onClick={() => handlePageChange(idx + 1)}>
                        {idx + 1}
                    </Pagination.Item>
                ))}

                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    <MdArrowForwardIos />
                </Pagination.Next>
            </Pagination>
        </div>
    );
};

export default AdminPagination;
