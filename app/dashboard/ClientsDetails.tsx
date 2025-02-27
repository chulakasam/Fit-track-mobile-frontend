import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    StyleSheet,
    ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { savingClient } from "../../reducers/ClientSlice";
import { AppDispatch } from "../../store/Store";
import Client from "../../models/Client";

const ClientDetailsForm = () => {
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState<any>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 0.7,
                maxWidth: 800,
                maxHeight: 800,
            },
            (response) => {
                if (response.didCancel) {
                    console.log("Image selection was canceled");
                } else if (response.errorMessage) {
                    console.error("ImagePicker Error: ", response.errorMessage);
                } else {
                    setImage(response.assets?.[0]);
                }
            }
        );
    };

    const handleSubmit = () => {
        if (!name || !height || !weight || !age || !dob || !gender) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        const client = new Client(
            name,
            Number(height),
            Number(weight),
            Number(age),
            dob,
            gender,
            image
        );
        dispatch(savingClient(client));

        console.log("Client Details:", client);
        Alert.alert("Success", "Client details saved locally!");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Create Profile</Text>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Height (in cm)"
                    placeholderTextColor="#aaa"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Weight (in kg)"
                    placeholderTextColor="#aaa"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor="#aaa"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    placeholderTextColor="#aaa"
                    value={dob}
                    onChangeText={setDob}
                />
            </View>

            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    placeholderTextColor="#aaa"
                    value={gender}
                    onChangeText={setGender}
                />
            </View>


            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                    <Text style={styles.imageButtonText}>Select Image</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
            </View>


            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save Client</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
        alignItems: "center",
    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        fontSize: 16,
        color: "#333",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 15,
    },
    imageButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    imageButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: "#FF5722",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        elevation: 3,
    },
    saveButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ClientDetailsForm;
