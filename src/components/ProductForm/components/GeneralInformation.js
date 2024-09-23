import React from "react";

const GeneralInformation = ({ formData, handleInputChange, loading }) => (
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
                className="form-control"
                placeholder="Type product name here . . ."
                onChange={handleInputChange}
                disabled={loading}
            />
        </div>
        <div>
            <label className="form-label">Description</label>
            <textarea
                placeholder="Type product description here . . ."
                rows={5}
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={loading}></textarea>
        </div>
    </div>
);

export default GeneralInformation;
