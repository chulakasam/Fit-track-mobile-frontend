import {Drawer} from "expo-router/drawer";

export default function Dashboard() {
    return (
        <Drawer>
            <Drawer.Screen name="customer" options={{title : "Customers"}}/>
            <Drawer.Screen name="item" options={{title : "Item"}}/>
            <Drawer.Screen name="placeOrder" options={{title : "Place Order"}}/>
        </Drawer>
    );
}