import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  FlatList,
  SafeAreaView,
  Platform
} from 'react-native';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { languages } from "../components/data.d";

// Simplified layout component for mobile
const Layout = ({ children }) => (
  <SafeAreaView style={styles.layoutContainer}>
    {children}
  </SafeAreaView>
);

const PermissionSetting = () => {
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
    video: false,
    notifications: false
  });

  const [permissionErrors, setPermissionErrors] = useState({
    audio: '',
    video: '',
    notifications: ''
  });

  const [optOut, setOptOut] = useState(false);

  // Request audio permission using Expo
  const requestAudioPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
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
        audio: 'Failed to request microphone permission.'
      }));
    }
  };

  // Request video permission using Expo
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
        video: 'Failed to request camera permission.'
      }));
    }
  };

  // Request notification permission using Expo
  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setPermissions(prev => ({ ...prev, notifications: true }));
        setPermissionErrors(prev => ({ ...prev, notifications: '' }));
      } else {
        setPermissionErrors(prev => ({
          ...prev,
          notifications: 'Notification permissions denied. Please enable in your device settings.'
        }));
      }
    } catch (err) {
      console.error("Error requesting notification permission:", err);
      setPermissionErrors(prev => ({
        ...prev,
        notifications: 'Failed to request notification permission.'
      }));
    }
  };

  // Check existing permissions on component mount
  useEffect(() => {
    const checkPermissions = async () => {
      // Check audio permission
      const audioPermission = await Audio.getPermissionsAsync();
      setPermissions(prev => ({ ...prev, audio: audioPermission.status === 'granted' }));

      // Check camera permission
      const cameraPermission = await Camera.getCameraPermissionsAsync();
      setPermissions(prev => ({ ...prev, video: cameraPermission.status === 'granted' }));

      // Check notification permission
      const notificationPermission = await Notifications.getPermissionsAsync();
      setPermissions(prev => ({ 
        ...prev, 
        notifications: notificationPermission.status === 'granted' 
      }));
    };

    checkPermissions();
  }, []);

  const renderPermissionsTab = () => (
    <View style={styles.tabContent}>
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
            <View style={styles.permissionHeader}>
              <MaterialIcons name="mic" size={24} color="#0F172A" style={styles.permissionIcon} />
              <Text style={styles.permissionTitle}>Audio</Text>
            </View>
            <Text style={styles.permissionDescription}>
              Enable Interview Copilot™ to provide real-time guidance based on
              your input. You'll need to turn this on to generate interview
              reports.
            </Text>
            {permissionErrors.audio ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{permissionErrors.audio}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.audio ? styles.permissionGrantedButton : {}
            ]}
            onPress={requestAudioPermission}
          >
            <Text style={permissions.audio ? styles.permissionGrantedText : styles.permissionButtonText}>
              {permissions.audio ? "Granted" : "Request"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Video Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionContent}>
            <View style={styles.permissionHeader}>
              <MaterialIcons name="videocam" size={24} color="#0F172A" style={styles.permissionIcon} />
              <Text style={styles.permissionTitle}>Video</Text>
            </View>
            <Text style={styles.permissionDescription}>
              Enhance your mock interview experience.
            </Text>
            {permissionErrors.video ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{permissionErrors.video}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.video ? styles.permissionGrantedButton : {}
            ]}
            onPress={requestVideoPermission}
          >
            <Text style={permissions.video ? styles.permissionGrantedText : styles.permissionButtonText}>
              {permissions.video ? "Granted" : "Request"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Extension Card */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionContent}>
            <View style={styles.permissionHeader}>
              <MaterialIcons name="extension" size={24} color="#0F172A" style={styles.permissionIcon} />
              <Text style={styles.permissionTitle}>Coding Copilot Extension</Text>
            </View>
            <Text style={styles.permissionDescription}>
              A special mobile extension to work with Interview Copilot™ and
              help you crush coding interviews.
            </Text>
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                The Coding Copilot feature is not yet available on mobile devices.
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Optional</Text>
        
        {/* Notifications Permission */}
        <View style={styles.permissionCard}>
          <View style={styles.permissionContent}>
            <View style={styles.permissionHeader}>
              <MaterialIcons name="notifications" size={24} color="#0F172A" style={styles.permissionIcon} />
              <Text style={styles.permissionTitle}>Device Notifications</Text>
            </View>
            <Text style={styles.permissionDescription}>
              Get timely updates on interview report progress and special offers.
            </Text>
            {permissionErrors.notifications ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{permissionErrors.notifications}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.notifications ? styles.permissionGrantedButton : {}
            ]}
            onPress={requestNotificationPermission}
          >
            <Text style={permissions.notifications ? styles.permissionGrantedText : styles.permissionButtonText}>
              {permissions.notifications ? "Granted" : "Request"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCopilotTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          The following settings will affect all interviews, while the settings
          within each interview will only affect that specific interview.
        </Text>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* Verbosity Settings */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Verbosity</Text>
          <Text style={styles.settingDescription}>
            The length and complexity of your Copilot responses
          </Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.verbosity === 0 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 0 })}
            >
              <Text style={tabIdxes.verbosity === 0 ? styles.activeSegmentText : styles.segmentText}>
                Concise
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.verbosity === 1 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 1 })}
            >
              <Text style={tabIdxes.verbosity === 1 ? styles.activeSegmentText : styles.segmentText}>
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.verbosity === 2 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, verbosity: 2 })}
            >
              <Text style={tabIdxes.verbosity === 2 ? styles.activeSegmentText : styles.segmentText}>
                Lengthy
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Language Settings */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Language for Copilot responses</Text>
          <TouchableOpacity
            style={styles.languageSelector}
            onPress={() => setShowLanguageDropdown(true)}
          >
            <Text style={styles.languageText}>{status.language}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* Temperature Settings */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Copilot Temperature</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.copilotTemperature === 0 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 0 })}
            >
              <Text style={tabIdxes.copilotTemperature === 0 ? styles.activeSegmentText : styles.segmentText}>
                Low
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.copilotTemperature === 1 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 1 })}
            >
              <Text style={tabIdxes.copilotTemperature === 1 ? styles.activeSegmentText : styles.segmentText}>
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.copilotTemperature === 2 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, copilotTemperature: 2 })}
            >
              <Text style={tabIdxes.copilotTemperature === 2 ? styles.activeSegmentText : styles.segmentText}>
                High
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Perdivance Preference */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Perdivance Preference</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.perdivancePreference === 0 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 0 })}
            >
              <Text style={tabIdxes.perdivancePreference === 0 ? styles.activeSegmentText : styles.segmentText}>
                Speed
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.perdivancePreference === 1 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, perdivancePreference: 1 })}
            >
              <Text style={tabIdxes.perdivancePreference === 1 ? styles.activeSegmentText : styles.segmentText}>
                Quality
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Mode Preference */}
        <View style={styles.settingSection}>
          <Text style={styles.settingLabel}>Mode Preference</Text>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.modePreference === 0 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 0 })}
            >
              <Text style={tabIdxes.modePreference === 0 ? styles.activeSegmentText : styles.segmentText}>
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.modePreference === 1 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 1 })}
            >
              <Text style={tabIdxes.modePreference === 1 ? styles.activeSegmentText : styles.segmentText}>
                STAR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentButton,
                tabIdxes.modePreference === 2 ? styles.activeSegment : {}
              ]}
              onPress={() => setTabIdxes({ ...tabIdxes, modePreference: 2 })}
            >
              <Text style={tabIdxes.modePreference === 2 ? styles.activeSegmentText : styles.segmentText}>
                SOAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Opt Out Checkbox */}
        <View style={styles.optOutContainer}>
          <Switch
            value={optOut}
            onValueChange={setOptOut}
            trackColor={{ false: "#E2E8F0", true: "#0EA5E9" }}
            thumbColor={optOut ? "#FFFFFF" : "#FFFFFF"}
          />
          <View style={styles.optOutTextContainer}>
            <Text style={styles.optOutTitle}>
              I would like to opt out of having Theresidentguy share my personal information.
            </Text>
            <Text style={styles.optOutDescription}>
              Notice: If you choose to opt out, you may miss out on some of the
              benefits of having your data used as described in our policy. You can
              enable or disable it anytime.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Language dropdown modal
  const renderLanguageModal = () => (
    <Modal
      visible={showLanguageDropdown}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLanguageDropdown(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity 
              onPress={() => setShowLanguageDropdown(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={languages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.languageItem}
                onPress={() => {
                  setStatus({ ...status, language: item.label });
                  setShowLanguageDropdown(false);
                }}
              >
                <View style={styles.languageCheckContainer}>
                  {status.language === item.label && (
                    <MaterialIcons name="check" size={20} color="#0EA5E9" />
                  )}
                </View>
                <Text style={styles.languageItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>Settings</Text>
        
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, pageIdx === 0 ? styles.activeTabButton : {}]}
            onPress={() => setPageIdx(0)}
          >
            <Text style={pageIdx === 0 ? styles.activeTabText : styles.tabText}>
              Permission
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, pageIdx === 1 ? styles.activeTabButton : {}]}
            onPress={() => setPageIdx(1)}
          >
            <Text style={pageIdx === 1 ? styles.activeTabText : styles.tabText}>
              Copilot
            </Text>
          </TouchableOpacity>
        </View>
        
        {pageIdx === 0 ? renderPermissionsTab() : renderCopilotTab()}
        {renderLanguageModal()}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeTabButton: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
  },
  infoBox: {
    backgroundColor: '#BAE6FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#0C4A6E',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  permissionCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  permissionContent: {
    flex: 1,
    marginRight: 12,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  permissionIcon: {
    marginRight: 8,
  },
  permissionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  permissionDescription: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 32,
  },
  errorContainer: {
    backgroundColor: '#FECACA',
    padding: 12,
    borderRadius: 6,
    marginTop: 8,
    marginLeft: 32,
  },
  errorText: {
    fontSize: 14,
    color: '#9B1C1C',
  },
  permissionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: 100,
    alignItems: 'center',
  },
  permissionGrantedButton: {
    backgroundColor: '#D1FAE5',
    borderColor: '#6EE7B7',
  },
  permissionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
  },
  permissionGrantedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#047857',
  },
  settingsContainer: {
    flex: 1,
  },
  settingSection: {
    marginBottom: 24,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#BAE6FD',
    borderRadius: 8,
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
    fontSize: 14,
    color: '#0F172A',
  },
  activeSegmentText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '500',
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  languageText: {
    fontSize: 14,
    color: '#0F172A',
  },
  optOutContainer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  optOutTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  optOutTitle: {
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 4,
  },
  optOutDescription: {
    fontSize: 12,
    color: '#64748B',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 40,
  },
  saveButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#0F172A',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  closeButton: {
    padding: 4,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  languageCheckContainer: {
    width: 24,
  },
  languageItemText: {
    fontSize: 16,
    color: '#0F172A',
  },
});

export default PermissionSetting;