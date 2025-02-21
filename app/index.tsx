import { Text, StyleSheet, TextInput, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image } from "react-native";


export default function Index() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFocused, setIsFocused] = useState({ username: false, password: false });

    function handleLogin() {
        if (username === "user" && password === "1234") {
            router.replace("/dashboard");
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/pngegg.png")} style={styles.logo} />
            <Text style={styles.loginText}>Login</Text>
            <TextInput
                style={[styles.textFields, isFocused.username && styles.textFieldFocused]}
                placeholder="Username"
                onChangeText={setUsername}
                onFocus={() => setIsFocused({ ...isFocused, username: true })}
                onBlur={() => setIsFocused({ ...isFocused, username: false })}
            />
            <TextInput
                style={[styles.textFields, isFocused.password && styles.textFieldFocused]}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
            />
            <Pressable style={({ pressed }) => [styles.loginButton, pressed && styles.loginButtonPressed]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#1e293b",
        },

    loginText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
    },
    logo: {
        width: 120, // Adjust width
        height: 120, // Adjust height
        marginBottom: 20,
    },
    textFields: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#fff",
        marginBottom: 10,
    },
    textFieldFocused: {
        borderColor: "#007bff",
        backgroundColor: "#eef5ff",
    },
    loginButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
    },
    loginButtonPressed: {
        backgroundColor: "#0056b3",
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
