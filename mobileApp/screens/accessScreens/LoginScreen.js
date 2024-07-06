import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles/login';
import {useLogin} from "../../services/authenticationAPIService";
import {useAuthentication} from "../../context/authentication";


export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const passwordInputRef = useRef(null); // Reference to the password input field
    const [buttonDisable, setButtonDisable] = useState(true);
    const { login, loading, error } = useLogin();
    const { setIsSignedIn } = useAuthentication();

    const handleSignIn = async () => {
        Keyboard.dismiss();
        setErrorMessage("");
        const errResult = await login(username, password);
        if (errResult) {
            setErrorMessage(errResult);
        }
        else {
            setIsSignedIn(true);
        }
    };

    useEffect(() => {
        setButtonDisable(username.length === 0 || password.length === 0);
    }, [username, password]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

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

                { errorMessage && <Text style={styles.error}>{errorMessage}</Text> }

                <Button
                    mode="contained"
                    onPress={handleSignIn}
                    style={buttonDisable ? styles.buttonDisable : styles.button}
                    disabled={buttonDisable}
                >
                    Sign In
                </Button>

                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.link}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.link}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}