import React, { useEffect, useState, useRef } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions, 
  StatusBar,
  Modal,
  ScrollView,
  TextStyle
} from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import Icon from "../../../../components/icon";
import { useGlobalContext } from "../../../../context";
import ManageAccountModal from "../../../../components/manage-account-modal";

const { width, height } = Dimensions.get("window");

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [showUserOption, setShowUserOption] = useState(false);
    const [showManageAccountModal, setShowManageAccountModal] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const [state, { dispatch }] = useGlobalContext();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    // No need for refs or document event listeners in React Native
    // Instead, we'll handle everything with state and component structure

    const onLogout = async () => {
        dispatch({ type: "access_token", payload: "" });
        await AsyncStorage.removeItem("access_token");
        navigation.navigate("Home" as never);
    };

    // Function to navigate to a screen
    const navigateTo = (screenName: string) => {
        setShowNav(false);
        navigation.navigate(screenName as never);
    };

    return (
        <View style={styles.container}>
            {showNav ? (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showNav}
                    onRequestClose={() => setShowNav(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.sidebar}>
                            <TouchableOpacity 
                                style={styles.logoContainer}
                                onPress={() => navigateTo("Home")}
                            >
                                <Text style={styles.logoText}>Theresidentguy</Text>
                                <Image 
                                    source={require("../../../../../public/image/icons/logo.png")} 
                                    style={styles.logoImage} 
                                />
                            </TouchableOpacity>
                            
                            <ScrollView style={styles.menuContainer}>
                                <View style={styles.menuSection}>
                                    <Text style={styles.menuSectionTitle}>Interview</Text>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("LiveInterview")}
                                    >
                                        <Icon icon="LiveInterview" />
                                        <Text style={styles.menuItemText}>Live Interview</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("MockInterview")}
                                    >
                                        <Icon icon="MockInterview" />
                                        <Text style={styles.menuItemText}>Mock Interview</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("Role")}
                                    >
                                        <Icon icon="PreparationHub" />
                                        <Text style={styles.menuItemText}>Preparation Hub</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("Resume")}
                                    >
                                        <Icon icon="DocumentCenter" />
                                        <Text style={styles.menuItemText}>Document Center</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.menuSection}>
                                    <Text style={styles.menuSectionTitle}>Tools</Text>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("AiGenerator")}
                                    >
                                        <Icon icon="AiGenerator" />
                                        <Text style={styles.menuItemText}>AI Material Generator</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("InterviewCoach")}
                                    >
                                        <Icon icon="AiMagic" />
                                        <Text style={styles.menuItemText}>AI Career Coach</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("ChatWithRecruiters")}
                                    >
                                        <Icon icon="Chat" />
                                        <Text style={styles.menuItemText}>Speak with Recruiters</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={styles.menuItem}
                                        onPress={() => navigateTo("Question")}
                                    >
                                        <Icon icon="Question" />
                                        <Text style={styles.menuItemText}>Interview Question Bank</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={styles.menuSection}>
                                    <Text style={styles.menuSectionTitle}>Education</Text>
                                    
                                    <TouchableOpacity 
                                        style={[styles.menuItem, styles.activeMenuItem]}
                                        onPress={() => navigateTo("Started")}
                                    >
                                        <Icon icon="Rocket" />
                                        <Text style={styles.activeMenuItemText}>Get Started</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setShowNav(false)}
                        >
                            <Icon icon="Cancel" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            ) : (
                <View style={styles.headerBar}>
                    <TouchableOpacity onPress={() => setShowNav(true)}>
                        <Icon icon="Menu" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.headerLogo}
                        onPress={() => navigateTo("Home")}
                    >
                        <Text style={styles.headerLogoText}>Theresidentguy</Text>
                        <Image 
                            source={require("../../../../../public/image/icons/logo.png")} 
                            style={styles.headerLogoImage} 
                        />
                    </TouchableOpacity>
                    
                    <View style={styles.userContainer}>
                        <TouchableOpacity onPress={() => setShowUserOption(!showUserOption)}>
                            {state.user?.pfp ? (
                                <Image
                                    source={{ uri: state.user.pfp }}
                                    style={styles.userAvatar}
                                />
                            ) : (
                                <View style={styles.userAvatarPlaceholder}>
                                    <Image 
                                        source={require("../../../../../public/image/icons/user-bg.png")} 
                                        style={styles.userAvatarBackground} 
                                    />
                                    <Text style={styles.userAvatarInitial}>
                                        {state.user?.fullName?.charAt(0)}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        
                        {showUserOption && (
                            <View style={styles.userDropdown}>
                                <TouchableOpacity 
                                    style={styles.userDropdownHeader}
                                    onPress={() => setShowProfileDropdown(true)}
                                >
                                    <View style={styles.userInfoContainer}>
                                        {state.user?.pfp ? (
                                            <Image
                                                source={{ uri: state.user.pfp }}
                                                style={styles.userDropdownAvatar}
                                            />
                                        ) : (
                                            <View style={styles.userDropdownAvatarPlaceholder}>
                                                <Image 
                                                    source={require("../../../../../public/image/icons/user-bg.png")} 
                                                    style={styles.userDropdownAvatarBackground} 
                                                />
                                                <Text style={styles.userDropdownAvatarInitial}>
                                                    {state.user?.fullName?.charAt(0)}
                                                </Text>
                                            </View>
                                        )}
                                        <View style={styles.userInfo}>
                                            <Text style={styles.userName}>{state.user?.fullName}</Text>
                                            <Text style={styles.userEmail}>{state.user?.email}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.dropdownMenuItem}
                                    onPress={() => { 
                                        setShowUserOption(false);
                                        navigateTo("LiveInterview");
                                    }}
                                >
                                    <View style={styles.dropdownMenuContent}>
                                        <Text style={styles.dropdownMenuText}>Live Interview</Text>
                                        <Text style={styles.freeTrialText}>Free Trial</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.dropdownMenuItem}
                                    onPress={() => {
                                        setShowUserOption(false);
                                        navigateTo("MockInterview");
                                    }}
                                >
                                    <View style={styles.dropdownMenuContent}>
                                        <Text style={styles.dropdownMenuText}>Mock Interview</Text>
                                        <Text style={styles.freeTrialText}>Free Trial</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={styles.upgradeButton}
                                    onPress={() => {
                                        setShowUserOption(false);
                                        navigateTo("Subscription");
                                    }}
                                >
                                    <LinearGradient
                                        colors={['#0090FF', '#00F7FF']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                        style={styles.gradientButton}
                                    >
                                        <Icon icon="Diamond" />
                                        <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                
                                <View style={styles.menuFooter}>
                                    <TouchableOpacity style={styles.footerMenuItem}>
                                        <Icon icon="Download" />
                                        <Text style={styles.footerMenuItemText}>Download Center</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.footerMenuItem}>
                                        <Icon icon="SettingOutLine" />
                                        <Text style={styles.footerMenuItemText}>Settings</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity style={styles.footerMenuItem}>
                                        <Icon icon="HelpCenter" />
                                        <Text style={styles.footerMenuItemText}>Help Center</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        
                        {showProfileDropdown && (
                            <View style={styles.profileDropdown}>
                                <View style={styles.profileDropdownHeader}>
                                    {state.user?.pfp ? (
                                        <Image
                                            source={{ uri: state.user.pfp }}
                                            style={styles.profileDropdownAvatar}
                                        />
                                    ) : (
                                        <View style={styles.profileDropdownAvatarPlaceholder}>
                                            <Image 
                                                source={require("../../../../../public/image/icons/user-bg.png")} 
                                                style={styles.profileDropdownAvatarBackground} 
                                            />
                                            <Text style={styles.profileDropdownAvatarInitial}>
                                                {state.user?.fullName?.charAt(0)}
                                            </Text>
                                        </View>
                                    )}
                                    <View style={styles.profileInfo}>
                                        <Text style={styles.profileEmail}>{state.user.email}</Text>
                                        <Text style={styles.profileName}>{state.user.fullName}</Text>
                                    </View>
                                </View>
                                
                                <TouchableOpacity 
                                    style={styles.manageAccountButton}
                                    onPress={() => {
                                        setShowProfileDropdown(false);
                                        setShowManageAccountModal(true);
                                    }}
                                >
                                    <Icon icon="Setting" />
                                    <Text style={styles.manageAccountText}>Manage Account</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.logoutButton}
                                    onPress={onLogout}
                                >
                                    <Icon icon="Logout" />
                                    <Text style={styles.logoutText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        paddingTop: StatusBar.currentHeight || 0,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    sidebar: {
        width: 250,
        height: '100%',
        backgroundColor: '#E0F2FE', // sky-100
        paddingVertical: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 20,
        paddingBottom: 16,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 18,
        color: '#0EA5E9', // primary/sky-500
    },
    logoImage: {
        width: 25,
        height: 25,
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 8,
    },
    menuContainer: {
        flex: 1,
    },
    menuSection: {
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9', // slate-100
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    menuSectionTitle: {
        paddingLeft: 12,
        marginBottom: 12,
        fontWeight: '500',
        color: '#94A3B8', // slate-400
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    menuItemText: {
        fontWeight: '500',
    },
    activeMenuItem: {
        backgroundColor: '#0F172A', // slate-900
    },
    activeMenuItemText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
    },
    headerLogo: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    headerLogoText: {
        fontSize: 20,
        color: '#0EA5E9', // primary
    },
    headerLogoImage: {
        width: 25,
        height: 25,
    },
    userContainer: {
        position: 'relative',
        zIndex: 1,
    },
    userAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userAvatarPlaceholder: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAvatarBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    userAvatarInitial: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    userDropdown: {
        position: 'absolute',
        top: 60,
        right: 0,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    userDropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 12,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    userDropdownAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userDropdownAvatarPlaceholder: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userDropdownAvatarBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    userDropdownAvatarInitial: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    userInfo: {
        marginLeft: 8,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
    },
    userEmail: {
        fontSize: 14,
        color: '#64748B', // slate-500
    },
    dropdownMenuItem: {
        paddingHorizontal: 8,
        paddingVertical: 7,
    },
    dropdownMenuContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    dropdownMenuText: {
        fontSize: 14,
        fontWeight: '500',
    },
    freeTrialText: {
        color: '#007CEE',
        fontSize: 14,
        fontWeight: '500',
    },
    upgradeButton: {
        width: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        marginTop: 8,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
    upgradeButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    menuFooter: {
        marginTop: 8,
        width: '100%',
        backgroundColor: '#F8FAFC',
        paddingVertical: 4,
    },
    footerMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    footerMenuItemText: {
        marginLeft: 12,
        fontSize: 14,
    },
    profileDropdown: {
        position: 'absolute',
        top: 56,
        right: 0,
        width: 330,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    profileDropdownHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0',
        paddingBottom: 12,
    },
    profileDropdownAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    profileDropdownAvatarPlaceholder: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileDropdownAvatarBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    profileDropdownAvatarInitial: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    profileInfo: {
        flexDirection: 'column',
    },
    profileEmail: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0F172A', // slate-900
    },
    profileName: {
        fontSize: 16,
        color: '#475569', // slate-600
    },
    manageAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    manageAccountText: {
        fontSize: 16,
        color: '#475569', // slate-600
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
        width: '100%',
    },
    logoutText: {
        fontSize: 16,
        color: '#475569', // slate-600
    },
});

export default Header;