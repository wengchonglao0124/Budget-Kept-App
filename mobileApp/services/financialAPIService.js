import useServerURL from "../configurations/serverAddressConfig";
import {useState} from "react";


let API_URL = useServerURL();

const useCurrentBalance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCurrentBalance = async (token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/balance`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during getting balance'];
            }
            return [true, responseData["current_balance"], responseData.username];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { getCurrentBalance, loading, error };
};


const useAddTransactionRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addTransactionRecord = async (token, transaction) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/add-transaction`, {
                method: "POST",
                body: JSON.stringify(transaction),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during add transaction record'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { addTransactionRecord, loading, error };
};


const useTransactions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTransactionRecords = async (token) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/transactions`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during fetching transaction records'];
            }
            return [true, responseData["transactions"]];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { getTransactionRecords, loading, error };
};


const useUpdateTransactionRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTransactionRecord = async (token, transaction) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/update-transaction`, {
                method: "PUT",
                body: JSON.stringify(transaction),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during update transaction record'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { updateTransactionRecord, loading, error };
};


const useRemoveTransactionRecord = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeTransactionRecord = async (token, transactionId) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/remove-transaction`, {
                method: "DELETE",
                body: JSON.stringify({
                    "transactionId": transactionId
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            })
            const responseData = await response.json();
            if (!response.ok) {
                return [false, responseData.message || 'An error occurred during delete transaction record'];
            }
            return [true, responseData.message];
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
            return [false, err.response ? err.response.data : err.message];
        } finally {
            setLoading(false);
        }
    };

    return { removeTransactionRecord, loading, error };
};


export { useCurrentBalance, useAddTransactionRecord, useTransactions, useUpdateTransactionRecord, useRemoveTransactionRecord };