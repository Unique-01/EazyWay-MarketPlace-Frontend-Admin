import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./custom-bootstrap.scss";
import Layout from "layout/Layout";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import { AuthProvider } from "context/AuthContext";
import { ProductCategoryProvider } from "context/ProductCategoryContext";
import { ProductProvider } from "context/ProductContext";
import { NotificationProvider } from "context/NotificationContext";
import OrderList from "pages/Orders/OrderList";
import OrderDetails from "pages/Orders/OrderDetails";
import ProductList from "pages/Products/ProductList";
import ProductDetails from "pages/Products/ProductDetails";
import ProductUpdate from "pages/Products/ProductUpdate";
import ProductCreate from "pages/Products/ProductCreate";
import NotFoundPage from "pages/NotFound/NotFoundPage";
import Login from "pages/Auth/Login";
import AxiosSetup from "api/apiClient";
import Notification from "components/Notification";
import CategoryList from "pages/Categories/CategoryList";
import CategoryCreate from "pages/Categories/CategoryCreate";
import CategoryUpdate from "pages/Categories/CategoryUpdate";
import CategoryDetails from "pages/Categories/CategoryDetails";
import { DashboardStatProvider } from "context/DashboardStatContext";
import { OrderProvider } from "context/OrderContext";
import { PaymentProvider } from "context/PaymentContext";
import CustomerPayment from "pages/Payments";
import CustomerList from "pages/Customers/CustomerList";
import { CustomerProvider } from "context/CustomersContext";
import CustomerDetails from "pages/Customers/CustomerDetails";
import MerchantList from "pages/Merchants/MerchantList";
import { MerchantProvider } from "context/MerchantContext";

function App() {
    return (
        <>
            <AuthProvider>
                <ProductCategoryProvider>
                    <ProductProvider>
                        <NotificationProvider>
                            <DashboardStatProvider>
                                <OrderProvider>
                                    <PaymentProvider>
                                        <MerchantProvider>
                                            <CustomerProvider>
                                                <BrowserRouter>
                                                    <AxiosSetup />
                                                    <Notification />
                                                    <Routes>
                                                        <Route
                                                            path="login"
                                                            element={<Login />}
                                                        />
                                                        <Route
                                                            path="*"
                                                            element={
                                                                <NotFoundPage />
                                                            }
                                                        />
                                                        <Route
                                                            path="/"
                                                            element={
                                                                <Layout />
                                                            }>
                                                            <Route
                                                                index
                                                                element={
                                                                    <Dashboard />
                                                                }
                                                            />
                                                            <Route
                                                                path="orders"
                                                                element={
                                                                    <OrderList />
                                                                }
                                                            />
                                                            <Route
                                                                path="orders/:orderId"
                                                                element={
                                                                    <OrderDetails />
                                                                }
                                                            />
                                                            <Route
                                                                path="products"
                                                                element={
                                                                    <ProductList />
                                                                }
                                                            />
                                                            <Route
                                                                path="products/add"
                                                                element={
                                                                    <ProductCreate />
                                                                }
                                                            />
                                                            <Route
                                                                path="products/:productId"
                                                                element={
                                                                    <ProductDetails />
                                                                }
                                                            />
                                                            <Route
                                                                path="products/:productId/edit"
                                                                element={
                                                                    <ProductUpdate />
                                                                }
                                                            />
                                                            <Route
                                                                path="categories"
                                                                element={
                                                                    <CategoryList />
                                                                }
                                                            />
                                                            <Route
                                                                path="categories/add"
                                                                element={
                                                                    <CategoryCreate />
                                                                }
                                                            />
                                                            <Route
                                                                path="categories/:categoryId"
                                                                element={
                                                                    <CategoryDetails />
                                                                }
                                                            />
                                                            <Route
                                                                path="categories/:categoryId/edit"
                                                                element={
                                                                    <CategoryUpdate />
                                                                }
                                                            />
                                                            <Route
                                                                path="payments"
                                                                element={
                                                                    <CustomerPayment />
                                                                }
                                                            />
                                                            <Route
                                                                path="customers"
                                                                element={
                                                                    <CustomerList />
                                                                }
                                                            />
                                                            <Route
                                                                path="customers/:customerId"
                                                                element={
                                                                    <CustomerDetails />
                                                                }
                                                            />
                                                            <Route
                                                                path="merchants"
                                                                element={
                                                                    <MerchantList />
                                                                }
                                                            />
                                                        </Route>
                                                    </Routes>
                                                </BrowserRouter>
                                            </CustomerProvider>
                                        </MerchantProvider>
                                    </PaymentProvider>
                                </OrderProvider>
                            </DashboardStatProvider>
                        </NotificationProvider>
                    </ProductProvider>
                </ProductCategoryProvider>
            </AuthProvider>
        </>
    );
}

export default App;
