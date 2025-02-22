import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';

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

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#FF8C42" />
            </View>
        );
    }

    return (
        <LinearGradient colors={["#001f3f", "#1c2833"]} style={styles.gradient}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Profile</Text>

                <View style={styles.profileSection}>
                    <FontAwesome5 name="user" size={40} color="#FF8C42" style={styles.profileIcon} />
                    <Image source={{ uri: 'https://via.placeholder.com/80' }} style={styles.avatar} />
                    <View>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.info}>{user?.age} years | {user?.height} cm | {user?.weight} kg</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <StatCard icon="walking" label="Steps" value={user?.steps} />
                    <StatCard icon="fire" label="Calories" value={user?.calories} />
                    <StatCard icon="dumbbell" label="Workouts" value={user?.workouts} />
                </View>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Weekly Steps</Text>
                    <LineChart
                        data={{
                            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                            datasets: [{ data: [8000, 9500, 9000, 10000, 10500, 11000, 12000] }],
                        }}
                        width={screenWidth * 0.9}
                        height={250}
                        chartConfig={chartConfig}
                        bezier
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const StatCard = ({ icon, label, value }: { icon: string; label: string; value?: number }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <TouchableOpacity
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            style={[styles.statCard, isPressed && styles.statCardActive]}
        >
            <FontAwesome5 name={icon} size={26} color="#FF8C42" />
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </TouchableOpacity>
    );
};

const chartConfig = {
    backgroundGradientFrom: '#232323',
    backgroundGradientTo: '#3A3A3A',
    color: (opacity = 1) => `rgba(255, 140, 66, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    profileIcon: {
        marginRight: 15,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    info: {
        color: '#BBB',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: '#333333',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        width: '30%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        transition: 'all 0.3s ease',
    },
    statCardActive: {
        backgroundColor: '#444',
        transform: [{ scale: 1.05 }],
    },
    statLabel: {
        color: '#FFF',
        fontSize: 14,
        marginTop: 5,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C42',
        marginTop: 5,
    },
    chartContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        alignItems: 'center',
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
});

export default DashboardScreen;
