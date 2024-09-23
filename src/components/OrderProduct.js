import CartItems from "components/products.json";
import picture from "assets/images/category/bakery.png";

// import "./OrderProduct.css";

const OrderProduct = () => {
    return (
        <div className="merchant-order-table inter">
            <div className="bg-white shadow-sm rounded">
                <h6 className="p-3 pb-2">Order List</h6>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-head mb-5">
                            <tr className="text-capitalize">
                                <th scope="col" className="order-column ps-4">
                                    product
                                </th>
                                <th scope="col" className="order-column">
                                    SKU
                                </th>
                                <th scope="col" className="order-column">
                                    QTY
                                </th>
                                <th scope="col" className="order-column">
                                    Price
                                </th>
                                <th scope="col" className="order-column">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="body mt-5 pt-5">
                            {CartItems.slice(0, 3).map((product, index) => (
                                <tr className="align-middle px-0" key={index}>
                                    <td className="ps-4">
                                        <div className="d-inline-flex align-items-center gap-1 ">
                                            <img
                                                src={picture}
                                                alt={product.name}
                                                className="img-fluid rounded"
                                                style={{ maxWidth: "50px" }}
                                            />
                                            <div className="order-text fw-normal">
                                                <span className="item-name">
                                                    Handmade pouch
                                                </span>
                                                <br />
                                                <span className="other-product fade-color">
                                                    Back
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="order-text order-column text-primary">
                                        30203
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        1 pcs
                                    </td>
                                    <td className="order-text order-column fade-color">
                                        {product.price}
                                    </td>
                                    <td className="fade-color">
                                        {product.price}
                                    </td>
                                </tr>
                            ))}
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">Subtotal</td>
                                <td className="fade-color">$385</td>
                            </tr>
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">VAT (%)</td>
                                <td className="fade-color">$0</td>
                            </tr>
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">Shopping Rate</td>
                                <td className="fade-color">$5</td>
                            </tr>
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">Grand Total</td>
                                <td>$590</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
