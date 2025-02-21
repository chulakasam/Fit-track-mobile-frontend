import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {CustomerModel} from "../../models/CustomerModel";
import {addCustomer, deleteCustomer, updateCustomer} from "../../reducers/CustomerSlice";

function Customer() {
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers);


    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [nic, setNic] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const handleAdd = () => {
        if (!name || !nic || !email || !phone) {
            alert("All fields are required!")
            return
        }
        const newCustomer = new CustomerModel(name, nic, email, phone);
        dispatch(addCustomer(newCustomer));
        alert("customer added successfully!");
        resetForm();

    }

    const handleEdit = (customer: CustomerModel) => {
        // setId(customer.id)
        setName(customer.name)
        setNic(customer.nic)
        setEmail(customer.email)
        setPhone(customer.phone)
        setIsEditing(true)
    }

    const handleUpdate = () => {
        if (!id || !name || !nic || !email || !phone) {
            alert("All fields are required!")
            return
        }
        const updateCust = new CustomerModel(name, nic, email, phone);
        dispatch(updateCustomer(updateCust));
        alert("Successfully Updated");
        resetForm();
    }

    const handleDelete = (customerEmail: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(customerEmail));
        }
    }

    const resetForm = () => {
        setId("")
        setName("")
        setNic("")
        setEmail("")
        setPhone("")
        setIsEditing(false)
    }
    const renderItem = ({ item }: { item: CustomerModel }) => (
        <TouchableOpacity style={styles.row} onPress={() => handleEdit(item)}>
            <Text style={styles.cell}>{"1"}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.nic}</Text>
            <Text style={styles.cell}>{item.email}</Text>
            <Text style={styles.cell}>{item.phone}</Text>
            <View style={styles.actionCell}>
                <TouchableOpacity onPress={() => handleDelete(item.email)} style={styles.deleteButton}>
                    Delete
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            {/*<TextInput placeholder="Id" value={id} onChangeText={setId} />*/}
            {/*<TextInput placeholder="Name" value={name} onChangeText={setName} />*/}
            {/*<TextInput placeholder="NIC" value={nic} onChangeText={setNic} />*/}
            {/*<TextInput placeholder="Email" value={email} onChangeText={setEmail} />*/}
            {/*<TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />*/}

            <Text style={styles.header}>Customer Form</Text>

            <TextInput
                placeholder="Id"
                value={id}
                onChangeText={setId}
                style={styles.input}
            />
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="NIC"
                value={nic}
                onChangeText={setNic}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
            />


            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {isEditing ? (
                    <TouchableOpacity
                        onPress={handleUpdate}
                        style={{
                            backgroundColor: '#3b82f6', // Blue color
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10,
                        }}
                    >
                        <Text style={{ color: 'white' }}>Update</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={handleAdd}
                        style={{
                            backgroundColor: '#10b981', // Green color
                            padding: 10,
                            borderRadius: 5,
                            marginRight: 10,
                        }}
                    >
                        <Text style={{ color: 'white' }}>Add</Text>
                    </TouchableOpacity>
                )}
                {isEditing && (
                    <TouchableOpacity
                        onPress={resetForm}
                        style={{
                            backgroundColor: '#6b7280', // Gray color
                            padding: 10,
                            borderRadius: 5,
                        }}
                    >
                        <Text style={{ color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Customer List */}
            <View style={styles.tableContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerCell}>ID</Text>
                    <Text style={styles.headerCell}>Name</Text>
                    <Text style={styles.headerCell}>NIC</Text>
                    <Text style={styles.headerCell}>Email</Text>
                    <Text style={styles.headerCell}>Phone</Text>
                    <Text style={styles.headerCell}>Actions</Text>
                </View>

                <FlatList data={customers} renderItem={renderItem} keyExtractor={(item) => item.email} />
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    inputContainer: {
        flexDirection: "column",
        gap: 10,
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    addButton: {
        backgroundColor: "#10b981",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    updateButton: {
        backgroundColor: "#3b82f6",
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: "#6b7280",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
    },
    tableContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        backgroundColor: "#e5e7eb",
        paddingVertical: 10,
    },
    headerCell: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingVertical: 10,
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
    actionCell: {
        flex: 0.5,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#ef4444",
        padding: 8,
        borderRadius: 5,
    },

});

export default Customer;