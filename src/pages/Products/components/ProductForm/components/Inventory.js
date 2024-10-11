import React from "react";

const Inventory = ({ formData, handleInputChange, loading, errors }) => (
    <div className="bg-white shadow-sm p-4 rounded mb-4">
        <h6 className="mb-3">Inventory</h6>
        <div className="row">
            <div className="mb-3 col-md-4">
                <label htmlFor="sku" className="form-label">
                    SKU
                </label>
                <input
                    name="sku"
                    id="sku"
                    type="text"
                    className={`form-control ${errors?.sku && "border-danger"}`}
                    placeholder="Type product SKU here . . ."
                    value={formData.sku}
                    onChange={handleInputChange}
                    disabled={loading}
                />
                {errors?.sku && (
                    <p className="text-danger small">{errors.sku}</p>
                )}
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="barcode" className="form-label">
                    Barcode
                </label>
                <input
                    name="barcode"
                    id="barcode"
                    type="text"
                    className={`form-control ${
                        errors?.barcode && "border-danger"
                    }`}
                    placeholder="Product Barcode . . ."
                    value={formData.barcode}
                    onChange={handleInputChange}
                    disabled={loading}
                />
                {errors?.barcode && (
                    <p className="text-danger small">{errors.barcode}</p>
                )}
            </div>
            <div className="mb-3 col-md-4">
                <label htmlFor="quantity" className="form-label">
                    Quantity
                </label>
                <input
                    name="quantity"
                    id="quantity"
                    type="text"
                    className={`form-control ${
                        errors?.quantity && "border-danger"
                    }`}
                    placeholder="Type product quantity here . . ."
                    value={formData.quantity}
                    onChange={handleInputChange}
                    disabled={loading}
                />
                {errors?.quantity && (
                    <p className="text-danger small">{errors.quantity}</p>
                )}
            </div>
        </div>
    </div>
);

export default Inventory;
