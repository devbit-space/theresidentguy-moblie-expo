import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions, 
  ScrollView 
} from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

import Icon from "../../../../components/icon";
import ProfileDropdown from "../../../../components/profile-dropdown";
import { useGlobalContext } from "../../../../context";
import ManageAccountModal from "../../../../components/manage-account-modal";

const { width, height } = Dimensions.get("window");

type SideBarProps = {
    smallSideBar: boolean;
    isMobile: boolean;
    onSideBar: () => void;
    showArrowButton: boolean;
    onShowArrowButton: () => void;
    onSmallSideBar: () => void;
};

const SideBar = ({
    smallSideBar,
    isMobile,
    onSideBar,
    showArrowButton,
    onShowArrowButton,
    onSmallSideBar
}: SideBarProps) => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const [state] = useGlobalContext();

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showManageAccountModal, setShowManageAccountModal] = useState(false);
    
    // No need for refs or document event listeners in React Native
    // Instead, we'll handle everything with state and component structure

    // Function to navigate to a screen
    const navigateTo = (screenName: string) => {
        navigation.navigate(screenName as never);
    };

    // If mobile and sidebar should be hidden, don't render anything
    if (isMobile && !showArrowButton && smallSideBar) {
        return null;
    }

    return (
        <View style={[
            styles.container,
            smallSideBar ? styles.smallSidebar : styles.largeSidebar,
            isMobile && styles.mobileContainer
        ]}>
            <View style={styles.sidebarContent}>
                {!smallSideBar && (
                    <TouchableOpacity 
                        style={styles.closeButton}
                        onPress={onSideBar}
                    >
                        <Icon icon="ArrowLeft" />
                    </TouchableOpacity>
                )}

                {/* {!smallSideBar ? (
                    <TouchableOpacity 
                        style={styles.logoContainer}
                        onPress={() => navigateTo("Home")}
                    >
                        <Text style={styles.logoText}>Theresidentguy</Text>
                        <Image 
                            source={require("../../../../assets/image/icons/logo.png")} 
                            style={styles.logoImage} 
                        />
                    </TouchableOpacity>
                ) : (!showArrowButton ? (
                    <TouchableOpacity 
                        style={styles.smallLogoContainer}
                        onPress={() => {
                            // onShowArrowButton()
                            navigateTo("Home")
                        }}
                    >
                        <Image 
                            source={require("../../../../assets/image/icons/logo.png")} 
                            style={styles.logoImage} 
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={styles.arrowButton}
                        onPress={onSmallSideBar}
                        onBlur={onShowArrowButton}
                    >
                        <Icon icon="ChevronRight" />
                    </TouchableOpacity>
                ))} */}

                <TouchableOpacity 
                    style={styles.smallLogoContainer}
                    onPress={() => {
                        // onShowArrowButton()
                        navigateTo("Home")
                    }}
                >
                    <Image 
                        source={require("../../../../assets/image/icons/logo.png")} 
                        style={styles.logoImage} 
                    />
                </TouchableOpacity>

                <ScrollView style={styles.menuContainer}>
                    <View style={styles.menuSection}>
                        {/* {!smallSideBar && (
                            <Text style={styles.sectionTitle}>Interview</Text>
                        )} */}
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("LiveInterview")}
                        >
                            <Icon icon="LiveInterview" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Live Interview</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("MockInterview")}
                        >
                            <Icon icon="MockInterview" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Mock Interview</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("Role")}
                        >
                            <Icon icon="PreparationHub" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Preparation Hub</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("Resume")}
                        >
                            <Icon icon="DocumentCenter" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Document Center</Text>
                            )} */}
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.menuSection}>
                        {/* {!smallSideBar && (
                            <Text style={styles.sectionTitle}>Tools</Text>
                        )} */}
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("AiGenerator")}
                        >
                            <Icon icon="AiGenerator" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>AI Material Generator</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("InterviewCoach")}
                        >
                            <Icon icon="AiMagic" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>AI Career Coach</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("ChatWithRecruiters")}
                        >
                            <Icon icon="Chat" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Speak with Recruiters</Text>
                            )} */}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.menuItem}
                            onPress={() => navigateTo("Question")}
                        >
                            <Icon icon="Question" />
                            {/* {!smallSideBar && (
                                <Text style={styles.menuItemText}>Interview Question Bank</Text>
                            )} */}
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.menuSection}>
                        {/* {!smallSideBar && (
                            <Text style={styles.sectionTitle}>Education</Text>
                        )} */}
                        
                        <TouchableOpacity 
                            style={[styles.menuItem, styles.activeMenuItem]}
                            onPress={() => navigateTo("Started")}
                        >
                            <Icon icon="Rocket" />
                            {/* {!smallSideBar && (
                                <Text style={styles.activeMenuItemText}>Get Started</Text>
                            )} */}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                {/* {!smallSideBar ? (
                    <View style={styles.profileContainer}>
                        <TouchableOpacity 
                            style={styles.profileButton}
                            onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                        >
                            <View style={styles.profileInfo}>
                                {state.user?.pfp ? (
                                    <Image
                                        source={{ uri: state.user.pfp }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <View style={styles.profileImagePlaceholder}>
                                        <Image 
                                            source={require("../../../../assets/image/icons/user-bg.png")} 
                                            style={styles.profileBackground} 
                                        />
                                        <Text style={styles.profileInitial}>
                                            {state.user?.fullName?.charAt(0)}
                                        </Text>
                                    </View>
                                )}
                                <Text style={styles.profileName} numberOfLines={1}>
                                    {state.user?.fullName || state.user?.email}
                                </Text>
                            </View>
                            <Icon icon="ChevronRight" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.upgradeButton} 
                            onPress={() => navigateTo("Subscription")}
                        >
                            <Icon icon="Diamond" />
                            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
                        </TouchableOpacity>
                        
                        {showProfileDropdown && (
                            <View style={styles.dropdownContainer}>
                                <ProfileDropdown 
                                    onManageAccount={() => {
                                        setShowManageAccountModal(true);
                                        setShowProfileDropdown(false);
                                    }} 
                                />
                            </View>
                        )}
                    </View>
                ) : (
                    <TouchableOpacity 
                        style={styles.smallProfileButton}
                        onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        {state.user?.pfp ? (
                            <Image
                                source={{ uri: state.user.pfp }}
                                style={styles.smallProfileImage}
                            />
                        ) : (
                            <View style={styles.smallProfileImagePlaceholder}>
                                <Image 
                                    source={require("../../../../assets/image/icons/user-bg.png")} 
                                    style={styles.smallProfileBackground} 
                                />
                                <Text style={styles.smallProfileInitial}>
                                    {state.user?.fullName?.charAt(0)}
                                </Text>
                            </View>
                        )}
                        
                        {showProfileDropdown && (
                            <View style={styles.smallDropdownContainer}>
                                <ProfileDropdown 
                                    onManageAccount={() => {
                                        setShowManageAccountModal(true);
                                        setShowProfileDropdown(false);
                                    }} 
                                />
                            </View>
                        )}
                    </TouchableOpacity>
                )} */}
                
                <TouchableOpacity 
                        style={styles.smallProfileButton}
                        onPress={() => setShowProfileDropdown(!showProfileDropdown)}
                    >
                        {state.user?.pfp ? (
                            <Image
                                source={{ uri: state.user.pfp }}
                                style={styles.smallProfileImage}
                            />
                        ) : (
                            <View style={styles.smallProfileImagePlaceholder}>
                                <Image 
                                    source={require("../../../../assets/image/icons/user-bg.png")} 
                                    style={styles.smallProfileBackground} 
                                />
                                <Text style={styles.smallProfileInitial}>
                                    {state.user?.fullName?.charAt(0)}
                                </Text>
                            </View>
                        )}
                        
                        {showProfileDropdown && (
                            <View style={styles.smallDropdownContainer}>
                                <ProfileDropdown 
                                    onManageAccount={() => {
                                        setShowManageAccountModal(true);
                                        setShowProfileDropdown(false);
                                    }} 
                                />
                            </View>
                        )}
                    </TouchableOpacity>
            </View>
            
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
        height: '100%',
        backgroundColor: '#E0F2FE', // sky-100
        zIndex: 999,
    },
    smallSidebar: {
        width: 55,
    },
    largeSidebar: {
        width: 260,
    },
    mobileContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: '100%',
    },
    sidebarContent: {
        flex: 1,
        paddingVertical: 20,
        backgroundColor: '#E0F2FE', // sky-100
        width: '100%',
        maxWidth: 260,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#7DD3FC', // sky-300
        borderRadius: 6,
        backgroundColor: 'white',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 12,
        gap: 8,
    },
    logoText: {
        fontSize: 18,
        color: '#0EA5E9', // primary/sky-500
    },
    logoImage: {
        width: 22,
        height: 22,
    },
    smallLogoContainer: {
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 8,
    },
    arrowButton: {
        alignSelf: 'flex-start',
        marginHorizontal: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#7DD3FC', // sky-300
        borderRadius: 6,
        padding: 6,
        paddingLeft: 8,
        backgroundColor: 'white',
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
    sectionTitle: {
        paddingLeft: 12,
        marginBottom: 12,
        fontWeight: '500',
        color: '#94A3B8', // slate-400
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        minHeight: 40,
        gap: 12,
        justifyContent: 'center'
    },
    menuItemText: {
        fontWeight: '500',
    },
    activeMenuItem: {
        backgroundColor: '#0284c7', // slate-900
    },
    activeMenuItemText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    profileContainer: {
        marginTop: 'auto',
        margin: 8,
        padding: 12,
        backgroundColor: '#F8FAFC', // slate-50
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0', // slate-200
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    profileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E2E8F0', // slate-200
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    profileImagePlaceholder: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    profileInitial: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    profileName: {
        fontWeight: '600',
        maxWidth: 120,
    },
    upgradeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 12,
        backgroundColor: '#0EA5E9', // primary/sky-500
        borderRadius: 6,
        paddingVertical: 10,
    },
    upgradeButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    dropdownContainer: {
        position: 'absolute',
        top: -220,
        left: 12,
    },
    smallProfileButton: {
        alignSelf: 'center',
        marginTop: 'auto',
        marginBottom: 16,
    },
    smallProfileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    smallProfileImagePlaceholder: {
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallProfileBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    smallProfileInitial: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },
    smallDropdownContainer: {
        position: 'absolute',
        top: -220,
        left: 12,
    },
});

export default SideBar;