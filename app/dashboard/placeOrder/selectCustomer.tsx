import {StyleSheet,FlatList, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useSelector} from "react-redux";

export default function SelectCustomer() {
    const router = useRouter();

    const customers=[
        {'id':'1','name':'Customer1'},
        {'id':'2','name':'Customer2'},
        {'id':'3','name':'Customer3'},
        {'id':'4','name':'Customer4'},
    ]
    return(
        <View style={styles.container}>
            <Text>Select a customer</Text>
            <FlatList
                data={customers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}
                        onPress={() => router.push(
                            {
                                pathname:'/dashboard/placeOrder/selectItem',
                                params:{customer:item.name}
                            }
                        )
                    }>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent: "center",
        padding: 20
    },
    item : {
        padding : 15,
        backgroundColor : "#ddd",
        marginBottom : 10,
        borderRadius : 5
    },
    itemText: {
        fontSize: 20,
    }

})