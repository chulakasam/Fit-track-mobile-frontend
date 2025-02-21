import React, { useState, useRef, useEffect } from "react";
import {
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    View,
    Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Index() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    function handleLogin() {
        if (email === "user" && password === "1234") {
            router.replace("/dashboard");
        }
    }

    return (
        <LinearGradient
            colors={["#001B51", "#0D100C"]}
            style={styles.gradientBackground}
        >

            <View style={styles.topContainer}>
                <Text style={styles.greetingText}>Hello</Text>
                <Text style={styles.signInText}>Sign In</Text>
            </View>


            <Animated.View
                style={[
                    styles.formContainer,
                    { transform: [{ translateY: slideAnim }] },
                ]}
            >
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="john@email.com"
                    placeholderTextColor="#999"
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="******"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={setPassword}
                />

                <Pressable onPress={() => { /*I use To Handle forgot password */ }}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.signInButton,
                        pressed && styles.signInButtonPressed,
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </Pressable>
            </Animated.View>


            <View style={styles.bottomContainer}>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpPrompt}>Don’t have an account?</Text>
                    <Pressable onPress={() => { /* Navigate to sign-up screen */ }}>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        flex: 1,
    },
    topContainer: {
        flex: 2,
        justifyContent: "flex-end",
        paddingHorizontal: 30,
    },
    greetingText: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "600",
        marginBottom: 8,
    },
    signInText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "300",
        marginBottom: 30,
    },
    formContainer: {
        flex: 2,
        backgroundColor: "#fff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 30,
        paddingVertical: 60,
    },
    bottomContainer: {
        backgroundColor: "#fff",
        paddingVertical: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    signUpPrompt: {
        color: "#000",
        fontSize: 14,
        marginRight: 5,
    },
    signUpText: {
        color: "#007BFF",
        fontSize: 14,
        fontWeight: "600",
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 6,
        fontWeight: "500",
    },
    inputField: {
        backgroundColor: "#F1F1F1",
        paddingHorizontal: 15,
        paddingVertical: 18,
        borderRadius: 10,
        fontSize: 16,
        color: "#333",
        marginBottom: 25,
    },
    forgotPasswordText: {
        alignSelf: "flex-end",
        color: "#007BFF",
        marginBottom: 30,
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 25,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: "20%",
    },
    signInButtonPressed: {
        backgroundColor: "#0056b3",
    },
    signInButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});

