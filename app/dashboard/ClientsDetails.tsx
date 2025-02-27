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
import { useNavigation } from "@react-navigation/native";


const ClientDetailsForm = () => {
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState<any>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation();

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
        navigation.navigate("workout");
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
        backgroundColor: "#121212",
        alignItems: "center",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00FFA3",
        marginBottom: 25,
        textAlign: "center",
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    card: {
        width: "100%",
        backgroundColor: "#1F1F1F",
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#00FFA3",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 1,
        borderColor: "#00FFA3",
    },
    input: {
        fontSize: 18,
        color: "#FFF",
        paddingVertical: 12,
        borderBottomWidth: 2,
        borderBottomColor: "#00FFA3",
        fontWeight: "600",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    imageButton: {
        backgroundColor: "#FF3D00",
        paddingVertical: 16,
        paddingHorizontal: 35,
        borderRadius: 12,
        shadowColor: "#FF3D00",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        elevation: 5,
    },
    imageButtonText: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    imagePreview: {
        width: 140,
        height: 140,
        borderRadius: 20,
        marginTop: 15,
        borderWidth: 3,
        borderColor: "#00FFA3",
    },
    saveButton: {
        backgroundColor: "#6200EA",
        paddingVertical: 18,
        paddingHorizontal: 50,
        borderRadius: 14,
        marginTop: 30,
        shadowColor: "#6200EA",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        elevation: 7,
    },
    saveButtonText: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
});

export default ClientDetailsForm;
