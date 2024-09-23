import LoginForm from "components/LoginForm";
import { AuthContext } from "context/AuthContext";
import { NotificationContext } from "context/NotificationContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "config";
import { useContext } from "react";
import axios from "axios";
import HandleApiError from "components/HandleApiError";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { showNotification } = useContext(NotificationContext);

    const handleLogin = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${config.API_BASE_URL}/user/login`,
                formData,
                {
                    headers: {
                        "frontend-source": "webadmin",
                    },
                }
            );
            const { token: authToken, data: userData } = response.data;
            await login(userData, authToken);
            showNotification("Login Successful");
            console.log(response.data)

            navigate("/");
        } catch (err) {
            HandleApiError(err, setError);
        } finally {
            setLoading(false);
        }
    };

    return <LoginForm onSubmit={handleLogin} loading={loading} error={error} />;
};

export default Login;
