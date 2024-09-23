import React from "react";

const StatusSelect = ({ selectedStatus, handleChange, loading }) => (
    <div className="mb-3">
        <label className="form-label">Product Status</label>
        <select
            className="form-select w-100"
            name="availType"
            value={selectedStatus}
            onChange={handleChange}
            disabled={loading}>
            <option value="draft">Draft</option>
            <option value="in-review">Publish for review</option>
        </select>
    </div>
);

export default StatusSelect;
