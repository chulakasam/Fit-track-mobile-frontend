import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/Store";
import WorkOut from "../../models/WorkOut";
import { savingWorkOut } from "../../reducers/WorkOutSlice";
import { useNavigation } from "@react-navigation/native";

const FitnessDashboard = () => {
    const [workoutType, setWorkoutType] = useState("Running");
    const [duration, setDuration] = useState("");
    const [goal, setGoal] = useState("");
    const [progress, setProgress] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

    const handleSubmit = () => {
        console.log("Workout Type:", workoutType);
        console.log("Duration:", duration);
        console.log("Goal:", goal);
        console.log("Progress:", progress);

        const workOut = new WorkOut(workoutType, duration, goal, progress);

        dispatch(savingWorkOut(workOut));
        navigation.navigate("customer");
    };

    return (
        <LinearGradient colors={["#2c3e50", "#7f8c8d"]} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Fitness Dashboard</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Workout Type</Text>
                    <Picker
                        selectedValue={workoutType}
                        onValueChange={(itemValue) => setWorkoutType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Running" value="Running" />
                        <Picker.Item label="Cycling" value="Cycling" />
                        <Picker.Item label="Swimming" value="Swimming" />
                        <Picker.Item label="Gym" value="Gym" />
                    </Picker>
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Duration (minutes)</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter duration"
                        placeholderTextColor="#888"
                        value={duration}
                        onChangeText={setDuration}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Fitness Goal</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your goal"
                        placeholderTextColor="#888"
                        value={goal}
                        onChangeText={setGoal}
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.label}>Progress Notes</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter progress notes"
                        placeholderTextColor="#888"
                        value={progress}
                        onChangeText={setProgress}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit Workout</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    scrollContainer: {
        padding: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 10,
        color: "#fff",
        textAlign: "center",
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    card: {
        padding: 20,
        backgroundColor: "#2f3640",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 16,
        overflow: "hidden",
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 8,
    },
    picker: {
        marginTop: 8,
        height: 50,
        borderWidth: 1,
        borderColor: "#7f8c8d",
        borderRadius: 8,
        color: "grey",
    },
    input: {
        borderWidth: 1,
        borderColor: "#16a085",
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
        fontSize: 16,
        color: "#fff",
        backgroundColor: "#34495e",
        shadowOpacity: 0.1,
    },
    button: {
        backgroundColor: "#16a085",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 20,
        shadowOpacity: 0.2,
        elevation: 6,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#fff",
    },
});

export default FitnessDashboard;
