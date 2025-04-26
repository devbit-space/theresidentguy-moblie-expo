import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from "../../context";
import Hamburger from "./hamburger";
import ProfileDropdown from "../profile-dropdown";
import ManageAccountModal from "../manage-account-modal";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { w } from '../../theme/services';

const { width } = Dimensions.get('window');

const Header = () => {
    const [state, { dispatch }] = useGlobalContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showManageAccountModal, setShowManageAccountModal] = useState(false);
    const profileDropdownRef = useRef(null);

    const menuItems = [
        { title: 'Interview Copilot™', route: '/interview-copilot' },
        { title: 'AI Mock Interview', route: '/ai-mock-interview' },
        { title: 'Pricing', route: '/app/subscription' },
        { title: 'Guides', route: '/guide' },
        { title: 'Blog', route: '/blog' },
        { title: 'Question Bank', route: '' },
    ];

    type RootStackParamList = {
        Home: undefined;
        InterviewCopilot: undefined;
        AiMockInterview: undefined;
        AiTools: { screen?: string } | undefined;
        Guide: undefined;
        Blog: undefined;
        SignUp: undefined;
        SignIn: undefined;
    };

    type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<NavigationProp>();

    const renderMenuItem = (item: { title: string, route: string }) => (
        <TouchableOpacity
            key={item.title}
            style={styles.menuItem}
            onPress={() => {
                const screenName = item.route.replace('/', '');
                if(screenName === 'interview-copilot') {
                    navigation.navigate('InterviewCopilot');
                } else if(screenName === 'ai-mock-interview') {
                    navigation.navigate('AiMockInterview');
                } else if(screenName === 'guide') {
                    navigation.navigate('Guide');
                } else if(screenName === 'blog') {
                    navigation.navigate('Blog');
                } else {
                    console.log('Screen not found:', screenName);
                }
                setShowDropdown(false);
            }}
        >
            <Text style={styles.menuItemText}>{item.title}</Text>
        </TouchableOpacity>
    );   

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.logoContainer}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.logoText}>Theresidentguy</Text>
                    <Image 
                        source={require('../../assets/image/icons/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </TouchableOpacity>

                <View style={styles.rightSection}>
                    {!state.access_token ? (
                        <View style={styles.authButtons}>
                            {/* <TouchableOpacity 
                                style={styles.signInButton}
                                onPress={() => navigation.navigate('SignIn')}
                            >
                                <Text style={styles.signInText}>Sign In</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity 
                                style={styles.signUpButton}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.userSection}>
                            <TouchableOpacity 
                                style={styles.dashboardButton}
                                onPress={() => navigation.navigate('Started')}
                            >
                                <Text style={styles.dashboardText}>Dashboard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.profileButton}
                                onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                            >
                                {state.user?.pfp ? (
                                    <Image
                                        source={{ uri: state.user.pfp }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <View style={styles.profileInitial}>
                                        <Text style={styles.profileInitialText}>
                                            {state.user?.fullName?.charAt(0)}
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                    <TouchableOpacity 
                        style={styles.hamburgerButton}
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Hamburger onHandle={() => setShowDropdown(!showDropdown)} />
                    </TouchableOpacity>
                </View>
            </View>

            <Animated.View 
                style={[
                    styles.dropdown,
                    {
                        transform: [{
                            translateY: showDropdown ? 0 : -1000
                        }],
                        opacity: showDropdown ? 1 : 0
                    }
                ]}
            >
                <ScrollView style={styles.dropdownContent}>
                    {menuItems.map(renderMenuItem)}
                </ScrollView>
            </Animated.View>

            {showProfileDropdown && (
                <View style={styles.profileDropdownContainer}>
                    <ProfileDropdown onManageAccount={() => setShowManageAccountModal(true)} />
                </View>
            )}

            {showManageAccountModal && (
                <ManageAccountModal 
                    isVisible={showManageAccountModal} 
                    onClose={() => setShowManageAccountModal(false)} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        zIndex: 999,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: w(2.5),
        paddingTop: w(5),
        paddingBottom: w(3),
        // borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: w(5),
        // color: '#0284c7',
        color: '#1c9dff',
        marginRight: w(2),
    },
    logo: {
        width: w(8),
        height: w(8),
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    authButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    signInButton: {
        padding: 8,
    },
    signInText: {
        color: '#1c9dff',
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#1c9dff',
        padding: 8,
        borderRadius: 6,
    },
    signUpText: {
        color: 'white',
        fontSize: 16,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dashboardButton: {
        backgroundColor: '#1c9dff',
        padding: 8,
        borderRadius: 6,
    },
    dashboardText: {
        color: 'white',
        fontSize: 16,
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileInitial: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0284c7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileInitialText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    hamburgerButton: {
        // padding: 8,
        gap: 12,
    },
    dropdown: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        zIndex: 1000,
    },
    dropdownContent: {
        padding: 20,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuItemText: {
        fontSize: 16,
        color: '#333',
    },
    profileDropdownContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 1001,
    },
});

export default Header;
