import React, {useEffect, useRef, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../styles/login';
import {useForgotPassword, useResetPassword} from "../../services/authenticationAPIService";
import Icon from "react-native-vector-icons/MaterialIcons";


const ForgotPasswordScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true);
    const [isSentPin, setIsSentPin] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [resetButtonDisable, setResetButtonDisable] = useState(true);

    const { forgotPassword, forgot_loading, forgot_error } = useForgotPassword();
    const { resetPassword, reset_loading, reset_error } = useResetPassword();

    const handleForgotPassword = async () => {
        Keyboard.dismiss();
        setErrorMessage('');
        const result = await forgotPassword(username);
        if (!result[0]) {
            setErrorMessage(result[1]);
        }
        else {
            setSuccessMessage(result[1]);
            setIsSentPin(true);
        }
    };

    const handlePasswordReset = async () => {
        Keyboard.dismiss();
        setErrorMessage('');
        const result = await resetPassword(username, pin.join(""), password);
        if (!result[0]) {
            setErrorMessage(result[1]);
        }
        else {
            setSuccessMessage(result[1] + "\nPlease login to get started!");
            setUsername("");
            resetEnvironment();
        }
    };

    const resetEnvironment = () => {
        setIsSentPin(false);
        setTimeLeft(300);
        setPin(['', '', '', '', '', '']);
        setPassword("");
        setPasswordVisible(false);
    }

    useEffect(() => {
        setButtonDisable(username.length === 0);
    }, [username]);

    const handlePinChange = (index, value) => {
        if (isNaN(value)) return; // Ensure only numbers are entered
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Automatically move to the next input field or disable focus if PIN is full
        if (value && index < pin.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        if (newPin.every(digit => digit !== '')) {
            inputRefs.current[index].blur();
        }
    };

    const handleKeyPress = (index, key) => {
        if (key === 'Backspace' && pin[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].focus();
                const newPin = [...pin];
                newPin[index - 1] = '';
                setPin(newPin);
            }
        }
    };

    const focusLastInput = () => {
        const lastEmptyIndex = pin.findIndex(digit => digit === '');
        const indexToFocus = lastEmptyIndex === -1 ? pin.length - 1 : lastEmptyIndex;
        inputRefs.current[indexToFocus].focus();
    };

    useEffect(() => {
        setResetButtonDisable(!pin.every(digit => digit !== '') || password.length === 0);
    }, [pin, password]);

    useEffect(() => {
        if (isSentPin) {
            const timer = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        handleTimeExpire();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isSentPin]);

    const handleTimeExpire = () => {
        setErrorMessage("Time Expired, Please request a new PIN.");
        setSuccessMessage("");
        resetEnvironment();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                { isSentPin ? (
                    <Text style={styles.title}>Reset Password</Text>
                ) : (
                    <Text style={styles.title}>Forgot Password</Text>
                )}

                { successMessage && <Text style={styles.success}>{successMessage}</Text> }
                { isSentPin ? <Text style={styles.timer}>Time Remaining: {formatTime(timeLeft)}</Text> : null}

                { isSentPin ? (
                    <View style={styles.pinContainer}>
                        {pin.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={styles.pinInput}
                                value={digit}
                                onChangeText={(value) => handlePinChange(index, value)}
                                onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
                                keyboardType="numeric"
                                maxLength={1}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onFocus={focusLastInput}
                            />
                        ))}
                    </View>
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                )}

                { isSentPin ? (
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="New Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                            returnKeyType="done"
                        />
                        <TouchableOpacity
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            style={styles.icon}
                        >
                            <Icon
                                name={passwordVisible ? 'visibility' : 'visibility-off'}
                                size={24}
                                color={passwordVisible ? 'gold' : 'grey'}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}

                { errorMessage && <Text style={styles.error}>{errorMessage}</Text> }

                { isSentPin ? (
                    <Button
                        mode="contained"
                        onPress={handlePasswordReset}
                        style={resetButtonDisable ? styles.buttonDisable : styles.button}
                        disabled={resetButtonDisable}
                    >
                        Reset Password
                    </Button>
                ) : (
                    <Button
                        mode="contained"
                        onPress={handleForgotPassword}
                        style={buttonDisable ? styles.buttonDisable : styles.button}
                        disabled={buttonDisable}
                    >
                        Send Verification Code
                    </Button>
                )}

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ForgotPasswordScreen;