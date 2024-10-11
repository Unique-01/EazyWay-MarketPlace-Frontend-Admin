import React from "react";

const GeneralInformation = ({
    formData,
    errors,
    handleInputChange,
    loading,
}) => (
    <div className="bg-white shadow-sm p-4 rounded mb-4">
        <h6 className="mb-3">General Information</h6>
        <div className="mb-3">
            <label htmlFor="productName" className="form-label">
                Product Name
            </label>
            <input
                name="title"
                value={formData.title}
                id="productName"
                type="text"
                className={`form-control ${
                    errors?.title && "border-danger"
                }`}
                placeholder="Type product name here . . ."
                onChange={handleInputChange}
                disabled={loading}
            />
            {errors?.title && (
                <p className="text-danger small">{errors.title}</p>
            )}
        </div>
        <div>
            <label className="form-label">Description</label>
            <textarea
                placeholder="Type product description here . . ."
                rows={5}
                className={`form-control ${
                    errors?.description && "border-danger"
                }`}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}></textarea>
            {errors?.description && (
                <p className="text-danger small">{errors.description}</p>
            )}
        </div>
    </div>
);

export default GeneralInformation;
