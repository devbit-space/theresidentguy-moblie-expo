import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal, ScrollView, Switch, TextInput, Dimensions, Linking, Platform } from "react-native";
import { BlurView } from 'expo-blur';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as WebBrowser from 'expo-web-browser';
import Icon from "../../../components/icon";
import { languages } from "./data.d";
import PermissionSetting from "../permission-setting";
import { h } from "../../../theme/services";

const SettingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
    const [status, setStatus] = useState({
        language: "English (United States)"
    });
    const [pageIdx, setPageIdx] = useState(0);
    const [tabIdxes, setTabIdxes] = useState({
        verbosity: 0,
        copilotTemperature: 0,
        perdivancePreference: 0,
        modePreference: 0
    });

    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [permissions, setPermissions] = useState({
        audio: false,
        video: false
    });
    const [permissionErrors, setPermissionErrors] = useState({
        audio: '',
        video: ''
    });
    const [dataSharing, setDataSharing] = useState(true);

    // Request audio permission for mobile
    const requestAudioPermission = async () => {
        try {
            const { status } = await Camera.requestMicrophonePermissionsAsync();
            if (status === 'granted') {
                setPermissions(prev => ({ ...prev, audio: true }));
                setPermissionErrors(prev => ({ ...prev, audio: '' }));
            } else {
                setPermissionErrors(prev => ({
                    ...prev,
                    audio: 'Permission denied. Please enable microphone access in your device settings.'
                }));
            }
        } catch (err) {
            console.error("Error requesting audio permission:", err);
            setPermissionErrors(prev => ({
                ...prev,
                audio: 'An error occurred while requesting microphone permission.'
            }));
        }
    };

    // Request video permission for mobile
    const requestVideoPermission = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                setPermissions(prev => ({ ...prev, video: true }));
                setPermissionErrors(prev => ({ ...prev, video: '' }));
            } else {
                setPermissionErrors(prev => ({
                    ...prev,
                    video: 'Permission denied. Please enable camera access in your device settings.'
                }));
            }
        } catch (err) {
            console.error("Error requesting video permission:", err);
            setPermissionErrors(prev => ({
                ...prev,
                video: 'An error occurred while requesting camera permission.'
            }));
        }
    };

    const openWebLink = (url: string) => {
        WebBrowser.openBrowserAsync(url);
    };

    const renderLanguageDropdown = () => {
        if (!showLanguageDropdown) return null;
        
        return (
            <View style={styles.dropdown}>
                <ScrollView style={styles.dropdownScroll}>
                    {languages.map((lang: { value: string, label: string }, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.languageItem}
                            onPress={() => {
                                setStatus({ ...status, language: lang.label });
                                setShowLanguageDropdown(false);
                            }}
                        >
                            <View style={styles.checkIconContainer}>
                                {status.language === lang.label && <Icon icon="Check" />}
                            </View>
                            <Text>{lang.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );
    };

    // Render permissions page
    const renderPermissionsPage = () => (
        <View style={styles.pageContainer}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    The following settings will affect all interviews, while the settings
                    within each interview will only affect that specific interview.
                </Text>
            </View>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mandatory</Text>
                
                {/* Audio Permission */}
                <View style={styles.permissionCard}>
                    <View style={styles.permissionContent}>
                        <View style={styles.permissionInfo}>
                            <View style={styles.permissionHeader}>
                                <Icon icon="Audio" />
                                <Text style={styles.permissionTitle}>Audio</Text>
                            </View>
                            <Text style={styles.permissionDescription}>
                                Enable Interview Copilot™ to provide real-time guidance based on
                                your input. You'll need to turn this on to generate interview
                                reports.
                            </Text>
                        </View>
                        
                        <TouchableOpacity 
                            style={[
                                styles.permissionButton,
                                permissions.audio ? styles.permissionGranted : null
                            ]}
                            onPress={requestAudioPermission}
                        >
                            <Text style={permissions.audio ? styles.permissionGrantedText : styles.permissionButtonText}>
                                {permissions.audio ? "Granted" : "Request"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {permissionErrors.audio ? (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>{permissionErrors.audio}</Text>
                        </View>
                    ) : null}
                </View>
                
                {/* Video Permission */}
                <View style={styles.permissionCard}>
                    <View style={styles.permissionContent}>
                        <View style={styles.permissionInfo}>
                            <View style={styles.permissionHeader}>
                                <Icon icon="Compatibility" />
                                <Text style={styles.permissionTitle}>Video</Text>
                            </View>
                            <Text style={styles.permissionDescription}>
                                Enhance your mock interview experience.
                            </Text>
                        </View>
                        
                        <TouchableOpacity 
                            style={[
                                styles.permissionButton,
                                permissions.video ? styles.permissionGranted : null
                            ]}
                            onPress={requestVideoPermission}
                        >
                            <Text style={permissions.video ? styles.permissionGrantedText : styles.permissionButtonText}>
                                {permissions.video ? "Granted" : "Request"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {permissionErrors.video ? (
                        <View style={styles.errorBox}>
                            <Text style={styles.errorText}>{permissionErrors.video}</Text>
                        </View>
                    ) : null}
                </View>
                
                {/* Coding Copilot Extension */}
                <View style={styles.permissionCard}>
                    <View style={styles.permissionInfo}>
                        <View style={styles.permissionHeader}>
                            <Icon icon="Compatibility" />
                            <Text style={styles.permissionTitle}>Coding Copilot Extension</Text>
                        </View>
                        <Text style={styles.permissionDescription}>
                            A special app extension to work with Interview Copilot™ and
                            help you crush coding interviews.
                        </Text>
                    </View>
                    
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
                            You need to install the Theresidentguy app extension to
                            receive program advice from our Coding Copilot.
                        </Text>
                        <TouchableOpacity 
                            onPress={() => openWebLink("https://chromewebstore.google.com/detail/final-round-ai/lfbbdphejjjanjiohlmkdbapdmfoaeem")}
                        >
                            <Text style={styles.linkText}>Download from App Store</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Optional</Text>
                
                {/* Notifications */}
                <View style={styles.permissionCard}>
                    <View style={styles.permissionInfo}>
                        <View style={styles.permissionHeader}>
                            <Icon icon="Notification" />
                            <Text style={styles.permissionTitle}>App Notifications</Text>
                        </View>
                        <Text style={styles.permissionDescription}>
                            Get timely updates on interview report progress and special offers.
                        </Text>
                    </View>
                    
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
                            You have disabled notification permissions in your device settings.
                        </Text>
                        <TouchableOpacity 
                            onPress={() => openWebLink("https://www.finalroundai.com/v2/guide#windows")}
                        >
                            <Text style={styles.linkText}>View Tutorial</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    // Render copilot settings page
    const renderCopilotPage = () => (
        <View style={styles.pageContainer}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                    The following settings will affect all interviews, while the settings
                    within each interview will only affect that specific interview.
                </Text>
            </View>
            
            <ScrollView style={styles.scrollContainer}>
                {/* Verbosity */}
                <View style={styles.settingGroup}>
                    <Text style={styles.settingLabel}>Verbosity</Text>
                    <Text style={styles.settingDescription}>
                        The length and complexity of your Copilot responses
                    </Text>
                    
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.verbosity === 0 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 0 })}
                        >
                            <Text style={styles.segmentText}>Concise</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.verbosity === 1 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 1 })}
                        >
                            <Text style={styles.segmentText}>Default</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.verbosity === 2 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 2 })}
                        >
                            <Text style={styles.segmentText}>Lengthy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Language */}
                <View style={styles.settingGroup}>
                    <Text style={styles.settingLabel}>Language for Copilot responses</Text>
                    
                    <TouchableOpacity 
                        style={styles.languageSelector}
                        onPress={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    >
                        <Text style={styles.languageText}>{status.language}</Text>
                        <Icon icon="ChevronDown" />
                    </TouchableOpacity>
                    
                    {renderLanguageDropdown()}
                </View>
                
                {/* Copilot Temperature */}
                <View style={styles.settingGroup}>
                    <Text style={styles.settingLabel}>Copilot Temperature</Text>
                    
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.copilotTemperature === 0 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 0 })}
                        >
                            <Text style={styles.segmentText}>Low</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.copilotTemperature === 1 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 1 })}
                        >
                            <Text style={styles.segmentText}>Default</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.copilotTemperature === 2 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 2 })}
                        >
                            <Text style={styles.segmentText}>High</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Perdivance Preference */}
                <View style={styles.settingGroup}>
                    <Text style={styles.settingLabel}>Perdivance Preference</Text>
                    
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.perdivancePreference === 0 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 0 })}
                        >
                            <Text style={styles.segmentText}>Speed</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.perdivancePreference === 1 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 1 })}
                        >
                            <Text style={styles.segmentText}>Quality</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Mode Preference */}
                <View style={styles.settingGroup}>
                    <Text style={styles.settingLabel}>Mode Preference</Text>
                    
                    <View style={styles.segmentedControl}>
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.modePreference === 0 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 0 })}
                        >
                            <Text style={styles.segmentText}>Default</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.modePreference === 1 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 1 })}
                        >
                            <Text style={styles.segmentText}>STAR</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[
                                styles.segmentButton,
                                tabIdxes.modePreference === 2 ? styles.activeSegment : null
                            ]}
                            onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 2 })}
                        >
                            <Text style={styles.segmentText}>SOAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Privacy Option */}
                <View style={styles.privacyOption}>
                    <View style={styles.checkboxContainer}>
                        <Switch
                            value={!dataSharing}
                            onValueChange={(val) => setDataSharing(!val)}
                            trackColor={{ false: '#e2e8f0', true: '#0ea5e9' }}
                            thumbColor={'#ffffff'}
                        />
                        <View style={styles.checkboxText}>
                            <Text style={styles.checkboxLabel}>
                                I would like to opt out of having Theresidentguy share my personal information.
                            </Text>
                            <Text style={styles.checkboxHint}>
                                Notice: If you choose to opt out, you may miss out on some of the benefits of having your data used as described in our policy. You can enable or disable it anytime.
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={onClose}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

    return (
        <RNModal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
        <ScrollView>
            <BlurView intensity={70} style={styles.container}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Icon icon="Close" />
                    </TouchableOpacity>
                    
                    <View style={styles.tabBar}>
                        <TouchableOpacity 
                            style={[styles.tab, pageIdx === 0 ? styles.activeTab : styles.inactiveTab]} 
                            onPress={() => setPageIdx(0)}
                        >
                            <Text style={pageIdx === 0 ? styles.activeTabText : styles.inactiveTabText}>
                                Permission
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.tab, pageIdx === 1 ? styles.activeTab : styles.inactiveTab]} 
                            onPress={() => setPageIdx(1)}
                        >
                            <Text style={pageIdx === 1 ? styles.activeTabText : styles.inactiveTabText}>
                                Copilot
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                    {pageIdx === 0 ? renderPermissionsPage() : renderCopilotPage()}
                </View>
            </BlurView>
        </ScrollView>
        </RNModal>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: width * 0.95,
        // maxWidth: 500,
        // maxHeight: height * 0.9,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 10,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        zIndex: 10,
    },
    tabBar: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 8,
    },
    activeTab: {
        backgroundColor: '#0ea5e9',
    },
    inactiveTab: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    activeTabText: {
        color: 'white',
        fontWeight: '500',
    },
    inactiveTabText: {
        color: 'black',
        fontWeight: '500',
    },
    pageContainer: {
        flex: 1,
    },
    infoBox: {
        backgroundColor: '#bae6fd',
        borderRadius: 6,
        padding: 12,
        marginBottom: 16,
    },
    infoText: {
        color: '#0c4a6e',
        fontSize: 14,
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    permissionCard: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    permissionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    permissionInfo: {
        flex: 1,
        marginRight: 16,
    },
    permissionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    permissionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    permissionDescription: {
        fontSize: 14,
        color: '#64748b',
        marginLeft: 24,
    },
    permissionButton: {
        width: 96,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        backgroundColor: 'white',
    },
    permissionGranted: {
        backgroundColor: '#dcfce7',
        borderColor: '#86efac',
    },
    permissionButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    permissionGrantedText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#15803d',
    },
    errorBox: {
        backgroundColor: '#fee2e2',
        borderRadius: 6,
        padding: 12,
        marginTop: 8,
        marginLeft: 24,
    },
    errorText: {
        color: '#991b1b',
        fontSize: 14,
    },
    linkText: {
        color: '#0ea5e9',
        textDecorationLine: 'underline',
        marginTop: 4,
    },
    scrollContainer: {
        flex: 1,
    },
    settingGroup: {
        marginBottom: 24,
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 8,
    },
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: '#e0f2fe',
        borderRadius: 6,
        padding: 4,
        height: 48,
    },
    segmentButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    activeSegment: {
        backgroundColor: 'white',
    },
    segmentText: {
        fontSize: 13,
        fontWeight: '500',
    },
    languageSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
    },
    languageText: {
        fontSize: 14,
        color: '#0f172a',
    },
    dropdown: {
        position: 'absolute',
        top: 120,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        zIndex: 10,
        maxHeight: 300,
    },
    dropdownScroll: {
        maxHeight: 300,
    },
    languageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    checkIconContainer: {
        width: 24,
        marginRight: 8,
    },
    privacyOption: {
        marginVertical: 16,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkboxText: {
        marginLeft: 12,
        flex: 1,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#1e293b',
    },
    checkboxHint: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 4,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 24,
        marginBottom: 16,
    },
    saveButton: {
        backgroundColor: '#0f172a',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        width: 112,
        alignItems: 'center',
        marginRight: 12,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 6,
        width: 112,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#0f172a',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SettingModal;
