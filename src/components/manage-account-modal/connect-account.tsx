import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";

import { useGlobalContext } from "../../context";
import Icon from "../icon";
import { w } from "../../theme/services";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const ConnectedAccount = () => {
    const [isAddAccount, setIsAddAccount] = useState(false)
    const [isRemoveAccountDropdown, setIsRemoveAccountDropdown] = useState(false)
    const [isRemoveAccount, setIsRemoveAccount] = useState(false)

    const [state]: any = useGlobalContext();

    // Close dropdowns when component unmounts
    useEffect(() => {
        return () => {
            // Cleanup function
        };
    }, []);

    const handleRemoveAccount = () => {
        setIsRemoveAccount(true);
        setIsRemoveAccountDropdown(false);
        setIsAddAccount(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Connected account</Text>
            </View>
            
            <View style={styles.contentContainer}>
                <View style={styles.accountContent}>
                    <View style={styles.accountRow}>
                        <View style={styles.accountInfo}>
                            <View style={styles.accountIconContainer}>
                                <Image 
                                    source={require('../../assets/image/icons/google.png')} 
                                    style={styles.accountIcon} 
                                />
                            </View>
                            <Text style={styles.accountEmail}>Google - {state.user?.email}</Text>
                        </View>
                        
                        <View>
                            <TouchableOpacity 
                                onPress={() => setIsRemoveAccountDropdown(!isRemoveAccountDropdown)}
                                style={styles.moreButton}
                            >
                                <Icon icon="MoreHorizontal" />
                            </TouchableOpacity>
                            
                            {isRemoveAccountDropdown && (
                                <TouchableOpacity 
                                    onPress={handleRemoveAccount}
                                    style={styles.removeDropdown}
                                >
                                    <Text style={styles.removeText}>Remove</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    
                    {!isRemoveAccount && (
                        <View style={styles.connectAccountContainer}>
                            <TouchableOpacity 
                                onPress={() => setIsAddAccount(!isAddAccount)}
                                style={styles.connectAccountButton}
                            >
                                <Icon icon="New" />
                                <Text style={styles.connectAccountText}>Connect account</Text>
                            </TouchableOpacity>
                            
                            {isAddAccount && (
                                <View style={styles.accountsDropdown}>
                                    <TouchableOpacity style={styles.accountOption}>
                                        <Image 
                                            source={require('../../assets/image/icons/facebook.png')} 
                                            style={styles.accountIcon} 
                                        />
                                        <Text style={styles.accountOptionText}>Facebook</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.accountOption}>
                                        <Image 
                                            source={require('../../assets/image/icons/linkedin.png')} 
                                            style={styles.accountIcon} 
                                        />
                                        <Text style={styles.accountOptionText}>Linkedin</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.accountOption}>
                                        <Image 
                                            source={require('../../assets/image/icons/microsoft.png')} 
                                            style={styles.accountIcon} 
                                        />
                                        <Text style={styles.accountOptionText}>Microsoft</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                    
                    {isRemoveAccount && (
                        <View style={styles.removeConfirmationContainer}>
                            <View style={styles.removeConfirmationContent}>
                                <Text style={styles.removeTitle}>Remove connected account</Text>
                                <Text style={styles.removeDescription}>
                                    Google will be removed from this account.
                                </Text>
                                <Text style={styles.removeDescription}>
                                    You will no longer be able to use this connected account and any dependent features will no longer work.
                                </Text>
                            </View>
                            
                            <View style={styles.removeButtonsContainer}>
                                <TouchableOpacity 
                                    onPress={() => setIsRemoveAccount(false)}
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={styles.removeButton}>
                                    <Text style={styles.removeButtonText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

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
        marginLeft: isLargeScreen ? 24 : 0,
    },
    accountContent: {
        width: '100%',
    },
    accountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    accountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    accountIconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    accountIcon: {
        width: 14,
        height: 14,
        resizeMode: 'contain',
    },
    accountEmail: {
        padding: 4,
        fontSize: 12,
        borderRadius: 6,
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
        zIndex: 2,
        width: w(15)
    },
    removeText: {
        fontSize: 14,
        color: '#DC2626',
    },
    connectAccountContainer: {
        position: 'relative',
    },
    connectAccountButton: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        padding: 8,
        marginTop: 4,
        marginRight: isLargeScreen ? 8 : 0,
    },
    connectAccountText: {
        fontSize: 14,
        marginLeft: 4,
    },
    accountsDropdown: {
        position: 'absolute',
        top: 36,
        left: 0,
        width: '100%',
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
    accountOption: {
        flexDirection: 'row',
        width: '100%',
        borderRadius: 8,
        alignItems: 'center',
        padding: 8,
        marginTop: 4,
    },
    accountOptionText: {
        fontSize: 14,
        marginLeft: 4,
    },
    removeConfirmationContainer: {
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
    },
    removeConfirmationContent: {
        flexDirection: 'column',
    },
    removeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    removeDescription: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 4,
    },
    removeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#64748B',
        fontSize: 14,
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

export default ConnectedAccount;