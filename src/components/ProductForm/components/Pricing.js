import React from 'react';

const Pricing = ({ formData, handleInputChange, loading }) => (
    <div className="bg-white shadow-sm p-4 rounded mb-4">
        <h6 className="mb-3">Pricing</h6>
        <div className="row">
            <div className="mb-3 col-12">
                <label htmlFor="basePrice" className="form-label">
                    Base Price
                </label>
                <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                        name="amount"
                        id="basePrice"
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Type base price here . . ."
                        value={formData.amount}
                        disabled={loading}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <label className="form-label">Discount Type</label>
                <select className="form-select w-100">
                    <option>Hello</option>
                </select>
            </div>
            <div className="mb-3 col-md-6">
                <label htmlFor="discountPercentage" className="form-label">
                    Discount Percentage (%)
                </label>
                <input
                    name="discountPercentage"
                    id="discountPercentage"
                    type="text"
                    className="form-control"
                    placeholder="Type discount percentage . . ."
                    disabled={loading}
                />
            </div>
            <div className="col-md-6">
                <label className="form-label">Tax Class</label>
                <select className="form-select w-100">
                    <option>Hello</option>
                </select>
            </div>
            <div className="mb-3 col-md-6">
                <label htmlFor="VATAmount" className="form-label">
                    VAT Amount(%)
                </label>
                <input
                    name="VATAmount"
                    id="VATAmount"
                    type="text"
                    className="form-control"
                    placeholder="Type VAT Amount . . ."
                    disabled={loading}
                />
            </div>
        </div>
    </div>
);

export default Pricing;
