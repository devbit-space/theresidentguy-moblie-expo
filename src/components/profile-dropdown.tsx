import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { useGlobalContext } from "../context";
import Icon from "./icon"; // Assuming you've already converted the Icon component to React Native

type ProfileDropdownProps = {
  onManageAccount: () => void;
};

const ProfileDropdown = ({ onManageAccount }: ProfileDropdownProps) => {
    const navigation = useNavigation();
    const [state, { dispatch }]: any = useGlobalContext();

    const onLogout = async () => {
        dispatch({ type: "access_token", payload: "" });
        try {
            await AsyncStorage.removeItem("access_token");
            navigation.navigate('Home' as never);
        } catch (error) {
            console.error("Error removing token:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    {state.user?.pfp ? (
                        <Image
                            source={{ uri: state.user.pfp }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.profilePlaceholder}>
                            <Image 
                                source={require('../assets/image/icons/user-bg.png')} 
                                style={styles.profilePlaceholderImage} 
                            />
                            <Text style={styles.profilePlaceholderText}>
                                {state.user?.fullName?.charAt(0)}
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.userInfoContainer}>
                    <Text style={styles.userEmail}>{state.user.email}</Text>
                    <Text style={styles.userName}>{state.user.fullName}</Text>
                </View>
            </View>
            
            <TouchableOpacity 
                style={styles.optionButton} 
                onPress={onManageAccount}
            >
                <Icon 
                    style={styles.optionIcon} 
                    icon="Setting" 
                />
                <Text style={styles.optionText}>Manage Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.optionButton, styles.logoutButton]} 
                onPress={onLogout}
            >
                <Icon 
                    style={styles.optionIcon} 
                    icon="Logout" 
                />
                <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 330,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 12,
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    profilePlaceholder: {
        position: 'relative',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePlaceholderImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    profilePlaceholderText: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    userInfoContainer: {
        flexDirection: 'column',
    },
    userEmail: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    userName: {
        fontSize: 16,
        color: '#64748B',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        height: 48,
    },
    optionIcon: {
        width: 48,
        height: 48,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 16,
        color: '#64748B',
    },
    logoutButton: {
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        width: '100%',
    },
});

export default ProfileDropdown;