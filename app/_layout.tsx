import {Stack} from "expo-router";
import {store} from "../store/Store";
import {Provider} from "react-redux";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Stack>
                <Stack.Screen name='index' options={{headerShown: false}} />
                <Stack.Screen name='dashboard' options={{headerShown: false}}/>
            </Stack>
        </Provider>
        // <Stack>
        //     <Stack.Screen name='index' options={{headerShown: false}} />
        //     <Stack.Screen name='dashboard' options={{headerShown: false}}/>
        // </Stack>
    );
}