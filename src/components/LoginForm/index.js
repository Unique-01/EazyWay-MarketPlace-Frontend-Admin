import registrationBanner from "assets/images/registrationImg.svg";
// import { Link } from "react-router-dom";
import "./LoginForm.css";
import { useState } from "react";
import PasswordInput from "components/PasswordInput";
import ButtonLoading from "components/ButtonLoading";
const LoginForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="">
            <div className="row w-100 align-items-center">
                <div className="col-lg-6 d-none d-lg-block ">
                    <img
                        src={registrationBanner}
                        alt="Banner"
                        className="w-100"
                    />
                </div>
                <div className="col-lg-6">
                    <div className="signInForm text-center">
                        <div>
                            <h2 className="signIn-heading text-primary">
                                Sign In
                            </h2>
                            <form
                                className="row row-gap-4 mt-4"
                                method="post"
                                onSubmit={handleSubmit}>
                                {error && (
                                    <p className="text-danger">{error}</p>
                                )}
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="form-control input"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <PasswordInput
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                />
                                <div className="d-flex justify-content-between px-0">
                                    <div className="">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="remember"
                                        />
                                        <label
                                            className="form-check-label ps-2"
                                            htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary text-white login-btn  w-100 rounded-pill"
                                    type="submit"
                                    disabled={loading}>
                                    Login {loading && <ButtonLoading />}
                                </button>
                            </form>
                        </div>
                    </div>
                    <p className="text-primary fw-semibold">
                        &copy; 2024 EazyWay Marketplace
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
