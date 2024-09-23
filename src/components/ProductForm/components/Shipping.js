import React from 'react';

const Shipping = ({ formData, handleInputChange, loading }) => (
    <div className="bg-white shadow-sm p-4 rounded mb-4">
        <h6 className="mb-3">Shipping</h6>
        <div>
            <input
                type="checkbox"
                className="form-check-input me-2 shadow-none"
            />
            <label className="form-check-label form-label text-primary">
                This is a physical product
            </label>
        </div>
        <div className="row">
            <div className="mb-3 col-md-3">
                <label htmlFor="weight" className="form-label">Weight</label>
                <input
                    name="weight"
                    id="weight"
                    type="text"
                    className="form-control"
                    placeholder="Product weight . . ."
                    value={formData.measurement.weight}
                    onChange={handleInputChange}
                    disabled={loading}
                />
            </div>
            <div className="mb-3 col-md-3">
                <label htmlFor="height" className="form-label">Height</label>
                <input
                    name="height"
                    id="height"
                    type="text"
                    className="form-control"
                    placeholder="Product height(cm) . . ."
                    value={formData.measurement.height}
                    onChange={handleInputChange}
                    disabled={loading}
                />
            </div>
            <div className="mb-3 col-md-3">
                <label htmlFor="length" className="form-label">Length</label>
                <input
                    name="length"
                    id="length"
                    type="text"
                    className="form-control"
                    placeholder="Product length(cm) . . ."
                    value={formData.measurement.length}
                    onChange={handleInputChange}
                    disabled={loading}
                />
            </div>
            <div className="mb-3 col-md-3">
                <label htmlFor="width" className="form-label">Width</label>
                <input
                    name="width"
                    id="width"
                    type="text"
                    className="form-control"
                    placeholder="Product width(cm) . . ."
                    value={formData.measurement.width}
                    onChange={handleInputChange}
                    disabled={loading}
                />
            </div>
        </div>
    </div>
);

export default Shipping;
