import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";

import { useGlobalContext } from "../../context";
import Icon from "../icon";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const EmailAddress = () => {
    const [isAddEmail, setIsAddEmail] = useState(false);
    const [isRemoveEmailDropdown, setIsRemoveEmailDropdown] = useState(false);
    const [isRemoveEmail, setIsRemoveEmail] = useState(false);

    const [state]: any = useGlobalContext();

    // Close dropdown when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup function
        };
    }, []);

    const handleRemoveEmail = () => {
        setIsRemoveEmail(true);
        setIsRemoveEmailDropdown(false);
        setIsAddEmail(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Email Address</Text>
            </View>
            
            <View style={[
                styles.contentContainer,
                !isAddEmail && styles.contentWithMargin
            ]}>
                <View style={styles.content}>
                    <View style={styles.emailRow}>
                        <View style={styles.emailInfo}>
                            <Text style={styles.emailText}>{state.user?.email}</Text>
                            <View style={styles.primaryBadge}>
                                <Text style={styles.primaryText}>primary</Text>
                            </View>
                        </View>
                        
                        {/* Dropdown for remove email - commented out in original code
                        <View>
                            <TouchableOpacity 
                                onPress={() => setIsRemoveEmailDropdown(!isRemoveEmailDropdown)}
                                style={styles.moreButton}
                            >
                                <Icon icon="MoreHorizontal" />
                            </TouchableOpacity>
                            
                            {isRemoveEmailDropdown && (
                                <TouchableOpacity 
                                    onPress={handleRemoveEmail}
                                    style={styles.removeDropdown}
                                >
                                    <Text style={styles.removeText}>Remove email</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        */}
                    </View>
                    
                    {!isAddEmail ? (
                        <View>
                            {/* Add email button - commented out in original code
                            {!isRemoveEmail && (
                                <TouchableOpacity 
                                    onPress={() => { setIsAddEmail(true); setIsRemoveEmail(false) }}
                                    style={styles.addEmailButton}
                                >
                                    <Icon icon="New" />
                                    <Text style={styles.addEmailText}>Add email address</Text>
                                </TouchableOpacity>
                            )}
                            */}
                        </View>
                    ) : (
                        <View style={styles.formContainer}>
                            <View style={styles.formContent}>
                                <View style={styles.formHeader}>
                                    <Text style={styles.formTitle}>Add email address</Text>
                                    <Text style={styles.formDescription}>
                                        An email containing a verification link will be sent to this email address.
                                    </Text>
                                </View>
                                
                                <View style={styles.inputRow}>
                                    <TextInput
                                        placeholder="Enter email address"
                                        style={styles.input}
                                        keyboardType="email-address"
                                    />
                                </View>
                                
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        onPress={() => setIsAddEmail(false)}
                                        style={styles.cancelButton}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.saveButton}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    
                    {isRemoveEmail && (
                        <View style={styles.confirmationContainer}>
                            <View style={styles.confirmationContent}>
                                <View style={styles.confirmationHeader}>
                                    <Text style={styles.confirmationTitle}>Remove email address</Text>
                                    <Text style={styles.confirmationDescription}>
                                        {state.user?.email} will be removed from this account.
                                    </Text>
                                    <Text style={styles.confirmationDescription}>
                                        You will no longer be able to sign in using this email address.
                                    </Text>
                                </View>
                                
                                <View style={styles.buttonRow}>
                                    <TouchableOpacity 
                                        onPress={() => setIsRemoveEmail(false)}
                                        style={styles.cancelButton}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.removeButton}>
                                        <Text style={styles.removeButtonText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        width: '100%',
        marginBottom: 8,
    },
    titleContainer: {
        width: isLargeScreen ? '33%' : '100%',
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
    contentWithMargin: {
        marginLeft: isLargeScreen ? 24 : 0,
    },
    content: {
        width: '100%',
    },
    emailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    emailInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emailText: {
        fontSize: 13,
        color: '#64748B',
    },
    primaryBadge: {
        backgroundColor: '#E2E8F0',
        padding: 4,
        borderRadius: 6,
        marginLeft: 4,
    },
    primaryText: {
        fontSize: 12,
        color: '#64748B',
    },
    moreButton: {
        marginRight: 8,
        borderRadius: 6,
        padding: 4,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    removeDropdown: {
        position: 'absolute',
        top: 24,
        right: 0,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 8,
        borderRadius: 6,
        zIndex: 1,
    },
    removeText: {
        fontSize: 14,
        color: '#DC2626',
    },
    addEmailButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
        marginTop: 4,
    },
    addEmailText: {
        fontSize: 14,
        marginLeft: 4,
    },
    formContainer: {
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
        marginTop: 8,
        backgroundColor: 'white',
    },
    formContent: {
        flexDirection: 'column',
    },
    formHeader: {
        marginBottom: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },
    formDescription: {
        fontSize: 14,
        color: '#64748B',
    },
    inputRow: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        fontSize: 14,
    },
    buttonRow: {
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
    saveButton: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    saveButtonText: {
        color: 'white',
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
    confirmationHeader: {
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
    removeButton: {
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
    },
});

export default EmailAddress;