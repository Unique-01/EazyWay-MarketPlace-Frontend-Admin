import React from 'react';

const CategorySelect = ({ categories, selectedCategory, handleChange, loading }) => (
    <div className="mb-3">
        <label className="form-label">Product Category</label>
        <select
            className="form-select w-100"
            name="category"
            value={selectedCategory}
            onChange={handleChange}
            disabled={loading}
        >
            <option value="">Select Category . . .</option>
            {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.title}
                </option>
            ))}
        </select>
    </div>
);

export default CategorySelect;
