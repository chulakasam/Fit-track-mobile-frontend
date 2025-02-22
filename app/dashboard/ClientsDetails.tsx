import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {useDispatch} from "react-redux";
import {savingClient} from "../../reducers/ClientSlice";
import {AppDispatch} from "../../store/Store";
import Client from "../../models/Client";

const ClientDetailsForm = () => {
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState<any>(null);
    const dispatch = useDispatch<AppDispatch>();




    const handleSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 0.5,
                maxWidth: 800,
                maxHeight: 800,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('Image selection was canceled');
                } else if (response.errorMessage) {
                    console.error('ImagePicker Error: ', response.errorMessage);
                } else {
                    setImage(response.assets[0]);
                }
            }
        );
    };

    const handleSubmit = () => {
        if (!name || !height || !weight || !age || !dob || !gender) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const client = new Client(name,Number(height),Number(weight),Number(age),dob,gender,image);
        dispatch(savingClient(client));

        console.log('Client Details:', client);
        Alert.alert('Success', 'Client details saved locally!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create profile</Text>

            {/* Card for Name Input */}
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                />
            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Height (in cm)"
                    value={height}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                />
            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Weight (in kg)"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                />
            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />
            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Date of Birth (YYYY-MM-DD)"
                    value={dob}
                    onChangeText={setDob}
                />
            </View>


            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Gender"
                    value={gender}
                    onChangeText={setGender}
                />
            </View>


            <View style={styles.card}>
                <Button title="Select Image" onPress={handleSelectImage} />
                {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}
            </View>

            <Button title="Save Client" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    card: {
        padding: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#f9f9f9',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 8,
    },
});

export default ClientDetailsForm;
