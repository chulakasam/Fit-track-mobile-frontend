import {Drawer} from "expo-router/drawer";

export default function Dashboard() {
    return (
        <Drawer>
            <Drawer.Screen name="ClientsDetails" options={{title : "Create Profile"}}/>
            <Drawer.Screen name="customer" options={{title : "Profile"}}/>
            <Drawer.Screen name="workout" options={{title : "Fitness Dashboard"}}/>
        </Drawer>
    );
}