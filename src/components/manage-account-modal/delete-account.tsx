import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useGlobalContext } from "../../context";
import { showToast } from "../../context/helper";
import { restApi } from "../../context/restApi";
import Loader from "../loader";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const DeleteAccount = () => {
    const [state, { dispatch }]: any = useGlobalContext();
    const navigation = useNavigation();

    const [isRemoveAccount, setIsRemoveAccount] = useState(false);
    const [deleteAccount, setDeleteAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onDeleteAccount = async () => {
        if (isLoading) return;

        if (deleteAccount !== "Delete account") {
            showToast("Please type 'Delete account' to continue.", "error");
            return;
        }

        setIsLoading(true);

        const res = await restApi.postRequest("delete-account");

        if (res.status === 200) {
            showToast(res.msg, "success");
            setIsRemoveAccount(false);
            dispatch({
                type: "user", payload: {
                    id: "",
                    email: "",
                    fullName: "",
                    pfp: "",
                    isPasswordSet: false
                }
            });
            await AsyncStorage.removeItem("access_token");
            navigation.navigate("Home" as never);
        } else {
            showToast(res.msg, "error");
        }

        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Delete Account</Text>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.content}>
                        {!isRemoveAccount && (
                            <View>
                                <TouchableOpacity 
                                    onPress={() => setIsRemoveAccount(true)} 
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.deleteButtonText}>Delete account</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            
            {isRemoveAccount && (
                <View style={styles.confirmationContainer}>
                    <View style={styles.confirmationContent}>
                        <View style={styles.confirmationTextContainer}>
                            <Text style={styles.confirmationTitle}>Delete account</Text>
                            <Text style={styles.confirmationDescription}>
                                Are you sure you want to delete your account?
                            </Text>
                            <Text style={styles.confirmationDescription}>
                                This action is permanent and irreversible.
                            </Text>
                        </View>
                        
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>
                                Type "Delete account" below to continue.
                            </Text>
                            <TextInput
                                value={deleteAccount}
                                onChangeText={setDeleteAccount}
                                placeholder="Delete account"
                                style={styles.input}
                            />
                        </View>
                        
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity 
                                onPress={() => setIsRemoveAccount(false)} 
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={onDeleteAccount} 
                                style={styles.confirmButton}
                            >
                                {isLoading ? <Loader /> : <Text style={styles.confirmButtonText}>Remove</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        alignItems: 'center',
        marginBottom: 8,
        width: '100%',
    },
    titleContainer: {
        width: isLargeScreen ? '33%' : '100%',
        maxWidth: 200,
        marginBottom: isLargeScreen ? 0 : 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: isLargeScreen ? '67%' : '100%',
    },
    content: {
        width: '100%',
    },
    deleteButton: {
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#DC2626',
        fontSize: 14,
    },
    confirmationContainer: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        width: '100%',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 24,
        paddingBottom: 16,
        marginTop: 8,
        backgroundColor: 'white',
    },
    confirmationContent: {
        flexDirection: 'column',
    },
    confirmationTextContainer: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    confirmationTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    confirmationDescription: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        color: '#DC2626',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#64748B',
        fontSize: 14,
    },
    confirmButton: {
        // width: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default DeleteAccount;