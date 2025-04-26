import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Dimensions, 
  Platform,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Layout from '../../../components/layout';

const Guide = () => {
    const [activeSection, setActiveSection] = useState('');
    const [activeTab, setActiveTab] = useState('windows');
    const scrollViewRef = useRef(null);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
    };

    return (
        <Layout>
            <SafeAreaView style={styles.container}>
                <StatusBar style="auto" />
                
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tutorial</Text>
                <Text style={styles.headerSubTitle}>Last updated: Sep 09, 2024</Text>
            </View>
            
            <View style={styles.content}>
                {/* Tab navigation for Windows/MacOS */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        onPress={() => setActiveTab('windows')}
                        style={[styles.tabButton, activeTab === 'windows' ? styles.activeTab : null]}
                    >
                        <Text style={[styles.tabText, activeTab === 'windows' ? styles.activeTabText : null]}>Windows</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => setActiveTab('macos')}
                        style={[styles.tabButton, activeTab === 'macos' ? styles.activeTab : null]}
                    >
                        <Text style={[styles.tabText, activeTab === 'macos' ? styles.activeTabText : null]}>Mac OS</Text>
                    </TouchableOpacity>
                </View>
                
                <ScrollView ref={scrollViewRef} style={styles.scrollView}>
                    {activeTab === "windows" && (
                        <View style={styles.tabContent}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up audio permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>Windows Privacy & Security Settings</Text>
                                    <Text style={styles.paragraph}>1. Click the Start button on the taskbar</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-start-button.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Go to "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Select "Privacy & security" on the left, then choose "Microphone" under "App permissions"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/choose-mic.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find Google Chrome and toggle the switch to enable it</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/mic-enabled.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on Windows</Text>
                                    <Text style={styles.paragraph}>1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find "Microphone" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/mic-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>5. In the "Not allowed to use your microphone" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-mic.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>6. Find "Microphone" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/allow-mic.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up video permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>Windows Privacy & Security</Text>
                                    <Text style={styles.paragraph}>1. Click the Start button on the taskbar</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-start-button.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Go to "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Select "Privacy & security" on the left, then choose "Camera" under "App permissions"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/choose-camera.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find Google Chrome and toggle the switch to enable it</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/camera-enabled.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on Windows</Text>
                                    <Text style={styles.paragraph}>1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find "Camera" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/camera-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>5. In the "Not allowed to use your camera" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-camera.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>6. Find "Camera" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/allow-camera.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up notification permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>Windows Privacy & Security</Text>
                                    <Text style={styles.paragraph}>1. Click the Start button on the taskbar</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-start-button.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Go to "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Select "Privacy & security" on the left, then choose "Notifications" under "App permissions"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/choose-notifications.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find Google Chrome and toggle the switch to enable it</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/notifications-enabled.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on Windows</Text>
                                    <Text style={styles.paragraph}>1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>4. Find "Notifications" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/notifications-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>5. In the "Not allowed to use your notifications" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-notifications.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>6. Find "Notifications" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/allow-notifications.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                    
                    {activeTab === "macos" && (
                        <View style={styles.tabContent}>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up audio permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>Mac OS Privacy & Security Settings</Text>
                                    <Text style={styles.paragraph}>Step 1. Click the Apple icon in the top-left corner of the screen and then select "System Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-the-apple-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Privacy & Security", find "Microphone" under "Privacy"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-mic-in-privacy-security.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Find Google Chrome and toggle the switch on</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-chrome-toggle-mic-on.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Warning: To apply the new settings, Google Chrome needs to be reopened</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/mic-reopen-warning.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on macOS</Text>
                                    <Text style={styles.paragraph}>Step 1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 4. Find "Microphone" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-mic-to-enter.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 5. In the "Not allowed to use your microphone" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-mic.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 6. Find "Microphone" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-mic-set-allow.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up video permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>macOS Privacy & Security Settings</Text>
                                    <Text style={styles.paragraph}>Step 1. Click the Apple icon in the top-left corner of the screen</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-the-apple-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Privacy & Security", find "Camera" under "Privacy"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-camera-in-privacy-security.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Find Google Chrome and toggle the switch on</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-chrome-toggle-camera-on.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Warning: To apply the new settings, Google Chrome needs to be reopened</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/camera-reopen-warning.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on macOS</Text>
                                    <Text style={styles.paragraph}>Step 1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 4. Find "Camera" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-camera-to-enter.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 5. In the "Not allowed to use your camera" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-camera.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 6. Find "Camera" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-camera-set-allow.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                            
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>How to set up notification permissions</Text>
                                <View style={styles.sectionContent}>
                                    <Text style={styles.subSectionTitle}>macOS Privacy & Security Settings</Text>
                                    <Text style={styles.paragraph}>Step 1. Click the Apple icon in the top-left corner of the screen</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-the-apple-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Notifications", find "Google Chrome" under "Application Notifications"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-notifications.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Click it to open its settings, make sure the following switches are turned on: - Allow notifications - Show notifications on lock screen - Show in Notification Center - Badge application icon - Play sound for notification</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/all-the-notifications-on.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    
                                    <Text style={styles.subSectionTitle}>Chrome on macOS</Text>
                                    <Text style={styles.paragraph}>Step 1. Open Google Chrome, click the menu icon (three vertical dots) in the top-right corner</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/click-menu-icon.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 2. Select "Settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/select-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 3. Go to "Privacy and security" and then "Site settings"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/go-to-site-settings.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 4. Find "Notifications" and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-notifications-to-enter.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 5. In the "Not allowed to use your notifications" section, locate https://theresidentguy.com and click to enter</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/not-allowed-to-use-notifications.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.paragraph}>Step 6. Find "Notifications" and set it to "Allow"</Text>
                                    <Image
                                        source={require('../../../assets/image/tutorial/find-notifications-set-allow.png')}
                                        style={styles.tutorialImage}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
      </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 10,
    },
    headerSubTitle: {
        fontSize: 16,
        color: '#64748b',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#dfe2e4',
        marginBottom: 20,
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#0ea5e9',
    },
    tabText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#64748b',
    },
    activeTabText: {
        color: '#0ea5e9',
    },
    scrollView: {
        flex: 1,
    },
    tabContent: {
        paddingBottom: 30,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 15,
    },
    sectionContent: {
        marginLeft: 10,
    },
    subSectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 16,
        color: '#64748b',
        marginVertical: 10,
        lineHeight: 24,
    },
    tutorialImage: {
        width: '100%',
        height: 200,
        marginVertical: 10,
    },
});

export default Guide;    