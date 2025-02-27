import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Image,
    TouchableOpacity,
    Switch,
    Alert,
    Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface User {
    name: string;
    age: number;
    height: number;
    weight: number;
    steps: number;
    calories: number;
    workouts: number;
}

const DashboardScreen: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [cardScale] = useState(new Animated.Value(1));

    useEffect(() => {
        const fetchUserData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUser({
                name: 'Jane Doe',
                age: 28,
                height: 165,
                weight: 60,
                steps: 9500,
                calories: 2200,
                workouts: 5,
            });
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleEditProfile = () => {
        Alert.alert('Edit Profile', 'Functionality to edit profile will go here!');
    };

    const handleLogout = () => {
        Alert.alert('Logout', 'You have logged out successfully!');
    };

    const handleCardPressIn = () => {
        Animated.spring(cardScale, { toValue: 1.05, friction: 5, useNativeDriver: true }).start();
    };

    const handleCardPressOut = () => {
        Animated.spring(cardScale, { toValue: 1, friction: 5, useNativeDriver: true }).start();
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FF8C42" />
            </View>
        );
    }

    return (
        <LinearGradient
            colors={darkMode ? ["#2a2a2a", "#1e1e1e"] : ["#f3f3f3", "#ffffff"]}
            style={styles.gradient}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Dashboard</Text>

                <View style={styles.profileSection}>
                    <FontAwesome5 name="user" size={40} color="#FF8C42" style={styles.profileIcon} />
                    <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.info}>{user?.age} years | {user?.height} cm | {user?.weight} kg</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.statsContainer}>
                    <StatCard icon="walking" label="Steps" value={user?.steps} scale={cardScale} />
                    <StatCard icon="fire" label="Calories" value={user?.calories} scale={cardScale} />
                    <StatCard icon="dumbbell" label="Workouts" value={user?.workouts} scale={cardScale} />
                </View>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Step Progress</Text>
                    <LineChart
                        data={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [
                                {
                                    data: [5000, 6000, 7000, 8000, 9000, 9500, 10000],
                                },
                            ],
                        }}
                        width={screenWidth - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: 'transparent',
                            backgroundGradientFrom: darkMode ? '#1e1e1e' : '#f3f3f3',
                            backgroundGradientTo: darkMode ? '#1e1e1e' : '#ffffff',
                            color: (opacity = 1) => `rgba(255, 140, 66, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        bezier
                    />
                </View>

                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Dark Mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={() => setDarkMode(!darkMode)}
                        value={darkMode}
                    />
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View More Details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const StatCard = ({ icon, label, value, scale }: { icon: string; label: string; value?: number; scale: Animated.Value }) => {
    return (
        <Animated.View
            style={[styles.statCard, { transform: [{ scale }] }]}
        >
            <FontAwesome5 name={icon} size={30} color="#FF8C42" />
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 8,
    },
    profileIcon: {
        marginRight: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 3,
        borderColor: '#FF8C42',
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    info: {
        color: '#BBB',
        fontSize: 14,
    },
    editButton: {
        backgroundColor: '#00FFA3',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    editText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        width: '30%',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        backdropFilter: 'blur(10px)',
    },
    statLabel: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 5,
    },
    statValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00FFA3',
        marginTop: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    toggleLabel: {
        color: '#FFF',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FF8C42',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    chartContainer: {
        marginBottom: 20,
    },
    chartTitle: {
        color: '#FFF',
        fontSize: 18,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#00FFA3',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DashboardScreen;
