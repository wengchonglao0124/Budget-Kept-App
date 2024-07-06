import {useState} from "react";
import useServerURL from "../configurations/serverAddressConfig";
import * as SecureStore from "expo-secure-store";


let API_URL = useServerURL();

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                return responseData.message || 'An error occurred during login';
            }
            await SecureStore.setItem("accessToken", responseData.token);
            return null;
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return err.response ? err.response.data : err.message;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
};


const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const register = async (username, password) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/register`, {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during register'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error };
};


const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const forgotPassword = async (username) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/forgot-password`, {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during forgot-password'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error };
};


const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const resetPassword = async (username, pin, newPassword) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/users/reset-password`, {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "pin": pin,
                    "newPassword": newPassword,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during reset password'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, error };
};


export {useLogin, useRegister, useForgotPassword, useResetPassword};