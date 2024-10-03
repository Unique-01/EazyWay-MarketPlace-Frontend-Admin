
// import "./OrderProduct.css";

const OrderProduct = ({ order }) => {
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
                            {order.carts &&
                                order.carts.map((item, index) => (
                                    <tr
                                        className="align-middle px-0"
                                        key={index}>
                                        <td className="ps-4">
                                            <div className="d-inline-flex align-items-center gap-1 ">
                                                <img
                                                    src={
                                                        item?.product?.image[0]?.url &&
                                                        item.product.image[0]
                                                            .url
                                                    }
                                                    alt="product"
                                                    className="img-fluid rounded"
                                                    style={{ maxWidth: "50px" }}
                                                />
                                                <div className="order-text fw-normal">
                                                    <span className="item-name">
                                                        {item.product.title}
                                                    </span>
                                                    <br />
                                                    {/* <span className="other-product fade-color">
                                                        Back
                                                    </span> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="order-text order-column text-primary">
                                            {item.product.sku}
                                        </td>
                                        <td className="order-text order-column fade-color">
                                            {item.quantity} pcs
                                        </td>
                                        <td className="order-text order-column fade-color">
                                            ${item.price}
                                        </td>
                                        <td className="fade-color">
                                            $
                                            {Number(item.price) *
                                                Number(item.quantity)}
                                        </td>
                                    </tr>
                                ))}
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">Subtotal</td>
                                <td className="fade-color">${order.amount}</td>
                            </tr>
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">VAT (%)</td>
                                <td className="fade-color">$0</td>
                            </tr>
                            {/* <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">
                                    Shopping Rate
                                </td>
                                <td className="fade-color">$5</td>
                            </tr> */}
                            <tr className="align-middle">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="fade-color py-3">Grand Total</td>
                                <td>${order.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderProduct;
