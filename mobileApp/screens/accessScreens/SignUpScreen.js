import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../styles/login';
import Icon from "react-native-vector-icons/MaterialIcons";
import {useRegister} from "../../services/authenticationAPIService";


const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordInputRef = useRef(null); // Reference to the password input field
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const confirmPasswordInputRef = useRef(null); // Reference to the confirmation password input field
    const [buttonDisable, setButtonDisable] = useState(true);
    const { register, loading, error } = useRegister();

    const handleSignUp = async () => {
        Keyboard.dismiss();
        setSuccessMessage("");
        setErrorMessage('');
        if (password !== confirmPassword) {
            setErrorMessage("Please make sure your passwords match.");
            return;
        }
        const result = await register(username, password);
        if (!result[0]) {
            setErrorMessage(result[1]);
        }
        else {
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setSuccessMessage(result[1] + "\nPlease login to get started!");
        }
    };

    useEffect(() => {
        setButtonDisable(username.length === 0 || password.length === 0 || confirmPassword.length === 0);
    }, [username, password, confirmPassword]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current.focus()} // Focus on password input when return key is pressed
                    blurOnSubmit={false} // Prevents keyboard from dismissing
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        ref={passwordInputRef} // Set the reference to the password input field
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!passwordVisible}
                        returnKeyType="next"
                        onSubmitEditing={() => confirmPasswordInputRef.current.focus()} // Focus on confirm password input when return key is pressed
                        blurOnSubmit={false} // Prevents keyboard from dismissing
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

                <View style={styles.passwordContainer}>
                    <TextInput
                        ref={confirmPasswordInputRef} // Set the reference to the confirmation password input field
                        style={styles.input}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!confirmPasswordVisible}
                        returnKeyType="done"
                    />
                    <TouchableOpacity
                        onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        style={styles.icon}
                    >
                        <Icon
                            name={confirmPasswordVisible ? 'visibility' : 'visibility-off'}
                            size={24}
                            color={confirmPasswordVisible ? 'gold' : 'grey'}
                        />
                    </TouchableOpacity>
                </View>

                { successMessage && <Text style={styles.success}>{successMessage}</Text> }
                { errorMessage && <Text style={styles.error}>{errorMessage}</Text> }

                <Button
                    mode="contained"
                    onPress={handleSignUp}
                    style={buttonDisable ? styles.buttonDisable : styles.button}
                    disabled={buttonDisable}
                >
                    Sign Up
                </Button>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.link}>Back to Login</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;