import { Modal, Button } from "react-bootstrap";
import ButtonLoading from "./ButtonLoading";

const ConfirmDeleteModal = ({
    show,
    handleClose,
    handleConfirm,
    item,
    loading,
}) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <strong>{item?.title && item.title}</strong>?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    disabled={loading}
                    onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    disabled={loading}
                    onClick={handleConfirm}>
                    Delete {loading && <ButtonLoading />}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
