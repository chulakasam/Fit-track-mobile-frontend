import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, TextInput, Pressable, View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function Signup() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    function handleSignUp() {
        if (email === "" || password === "") {
            alert("Please fill all the fields");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        console.log("User registered with email:", email);


        router.replace("/placeOrder/ClientDetails");
    }

    return (
        <LinearGradient colors={["#001B51", "#0D100C"]} style={styles.gradientBackground}>
            <View style={styles.topContainer}>
                <Text style={styles.greetingText}>Create Account</Text>
                <Text style={styles.signInText}>Sign Up</Text>
            </View>

            <Animated.View
                style={[styles.formContainer, { transform: [{ translateY: slideAnim }] }]}
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

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="******"
                    placeholderTextColor="#999"
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                />

                <Pressable
                    style={({ pressed }) => [
                        styles.signUpButton,
                        pressed && styles.signUpButtonPressed,
                    ]}
                    onPress={handleSignUp}
                >
                    <Text style={styles.signUpButtonText}>Sign Up</Text>
                </Pressable>
            </Animated.View>

            <View style={styles.bottomContainer}>
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpPrompt}>Already have an account?</Text>
                    <Pressable onPress={() => router.replace("/dashboard")}>
                        <Text style={styles.signUpText}>Login</Text>
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
        marginBottom: 5,
    },
    signUpButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 25,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        height: "20%",
    },
    signUpButtonPressed: {
        backgroundColor: "#0056b3",
    },
    signUpButtonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
});
