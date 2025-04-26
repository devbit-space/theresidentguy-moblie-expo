import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";

import SettingModal from "../../components/setting-modal";
import EndSessionModal from "../../components/end-sesion-modal";
import { useGlobalContext } from "../../../../context";

// Custom Icon component
interface IconProps {
  icon: string;
  style?: any;
  size?: number;
  color?: string;
}

const Icon = ({ icon, style, size = 24, color = "#000" }: IconProps) => {
  switch (icon) {
    case "Timer":
      return <MaterialIcons name="timer" size={size} color={color} style={style} />;
    case "CameraOn":
      return <MaterialIcons name="videocam" size={size} color={color} style={style} />;
    case "CameraOff":
      return <MaterialIcons name="videocam-off" size={size} color={color} style={style} />;
    case "Setting":
      return <Ionicons name="settings-sharp" size={30} color={color} style={style} />;
    case "Microphone":
      return <FontAwesome name="microphone" size={size} color={color} style={style} />;
    case "ChevronDown":
      return <MaterialIcons name="keyboard-arrow-down" size={size} color={color} style={style} />;
    case "Check":
      return <Ionicons name="checkmark" size={size} color={color} style={style} />;
    case "Leave":
      return <MaterialIcons name="exit-to-app" size={size} color={color} style={style} />;
    default:
      return <MaterialIcons name="error" size={size} color={color} style={style} />;
  }
};

interface AudioDevice {
  deviceId: string;
  label: string;
}

// Define navigation type
type RootStackParamList = {
  MockInterview: undefined;
};

const HeaderSection = ({ 
  setEndInterview, 
  isCameraOn, 
  setIsCameraOn 
}: { 
  setEndInterview: Function, 
  isCameraOn: boolean, 
  setIsCameraOn: Function 
}) => {
  const [_, { dispatch }] = useGlobalContext();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const [isShowSettingModal, setIsShowSettingModal] = useState(false);
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
  const [showAudioDevices, setShowAudioDevices] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<AudioDevice | null>(null);
  const [timer, setTimer] = useState(0);
  const [showLeaveDropdown, setShowLeaveDropdown] = useState(false);
  const [isEndSession, setIsEndSession] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimer = () => {
    setTimer(timer + 1);
  };

  useEffect(() => {
    const interval = setInterval(handleTimer, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const getAudioDevices = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web implementation (simplified)
        const devices = [
          { deviceId: 'default', label: 'Default Microphone' },
          { deviceId: 'builtin', label: 'Built-in Microphone' }
        ];
        setAudioDevices(devices);
        if (!selectedDevice && devices.length > 0) {
          setSelectedDevice(devices[0]);
        }
      } else {
        // Native implementation
        const { granted } = await Audio.requestPermissionsAsync();
        if (granted) {
          // On native, we can't enumerate devices like on web
          // Instead, just create a placeholder "device"
          const defaultDevice = { deviceId: 'default', label: 'Default Microphone' };
          setAudioDevices([defaultDevice]);
          setSelectedDevice(defaultDevice);
        }
      }
    } catch (err) {
      console.error('Error getting audio devices:', err);
    }
  };

  useEffect(() => {
    getAudioDevices();
  }, []);

  const onLeaveRoom = () => {
    setShowLeaveDropdown(false);
    dispatch({
      type: "isLeaveInterview",
      payload: {
        status: true,
        link: route.name
      }
    });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Left Section: Title and Timer */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>Mock Interview</Text>
        <View style={styles.subtitleContainer}>
          <View style={styles.betaBadge}>
            <Text style={styles.betaText}>Beta</Text>
          </View>
          <Icon icon="Timer" color="#334155" size={20} />
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
      </View>

      {/* Right Section: Controls */}
      <View style={styles.controlsContainer}>
        {/* Camera Toggle Button */}
        <TouchableOpacity 
          style={[
            styles.controlButton, 
            isCameraOn ? styles.activeControlButton : styles.inactiveControlButton
          ]}
          onPress={() => setIsCameraOn(!isCameraOn)}
        >
          <Icon 
            icon={isCameraOn ? "CameraOn" : "CameraOff"} 
            color={isCameraOn ? "#FFFFFF" : "#475569"} 
          />
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity 
          style={styles.inactiveControlButton}
          onPress={() => setIsShowSettingModal(true)}
        >
          <Icon icon="Setting" color="#475569" />
        </TouchableOpacity>

        {/* Microphone Dropdown (for tablets/desktops) */}
        <View style={styles.microphoneContainer}>
          <TouchableOpacity 
            style={styles.microphoneButton}
            onPress={() => setShowAudioDevices(!showAudioDevices)}
          >
            <View style={styles.microphoneIcon}>
              <Icon icon="Microphone" color="#FFFFFF" />
            </View>
            <Icon 
              icon="ChevronDown" 
              color="#475569"
              style={[
                styles.chevronIcon,
                showAudioDevices && styles.chevronIconRotated
              ]}
            />
          </TouchableOpacity>

          {/* Audio Devices Dropdown Menu */}
          {showAudioDevices && (
            <View style={styles.audioDevicesDropdown}>
              <Text style={styles.dropdownLabel}>Select Microphone Source</Text>
              {audioDevices.map((device) => (
                <TouchableOpacity
                  key={device.deviceId}
                  style={[
                    styles.deviceOption,
                    selectedDevice?.deviceId === device.deviceId && styles.selectedDeviceOption
                  ]}
                  onPress={() => {
                    setSelectedDevice(device);
                    setShowAudioDevices(false);
                  }}
                >
                  <View style={styles.deviceOptionContent}>
                    {device.label === selectedDevice?.label && (
                      <Icon icon="Check" size={16} color="#0EA5E9" />
                    )}
                    <Text 
                      style={[
                        styles.deviceLabel,
                        device.label === selectedDevice?.label ? styles.selectedDeviceLabel : null,
                        device.label !== selectedDevice?.label && styles.deviceLabelPadding
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {device.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Leave Button with Dropdown */}
        <View style={styles.leaveContainer}>
          <TouchableOpacity
            style={styles.leaveButton}
            onPress={() => setShowLeaveDropdown(!showLeaveDropdown)}
          >
            <Icon icon="Leave" color="#FFFFFF" />
            <Text style={styles.leaveButtonText}>Leave</Text>
            <Icon 
              icon="ChevronDown" 
              color="#FFFFFF"
              style={[
                styles.chevronIcon,
                showLeaveDropdown && styles.chevronIconRotated
              ]}
            />
          </TouchableOpacity>

          {/* Leave Dropdown Menu */}
          {showLeaveDropdown && (
            <View style={styles.leaveDropdown}>
              <TouchableOpacity
                style={styles.leaveOption}
                onPress={onLeaveRoom}
              >
                <Text style={styles.leaveRoomText}>Leave Room</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.leaveOption}
                onPress={() => {
                  setIsEndSession(true);
                  setShowLeaveDropdown(false);
                }}
              >
                <Text style={styles.endInterviewText}>End Interview</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Modals */}
      {isShowSettingModal && (
        <SettingModal 
          isOpen={isShowSettingModal} 
          onClose={() => setIsShowSettingModal(false)} 
        />
      )}
      {isEndSession && (
        <EndSessionModal 
          isOpen={isEndSession} 
          setEndInterview={setEndInterview} 
          onClose={() => setIsEndSession(false)} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC', // bg-slate-50
    padding: 16,
    paddingVertical: 24,
  },
  leftSection: {
    minWidth: 150,
    flexDirection: 'column',
    gap: 4,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  title: {
    height: 28,
    maxHeight: 28,
    width: '100%',
    overflow: 'hidden',
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A', // text-slate-900
  },
  subtitleContainer: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 14,
    color: '#94A3B8', // text-slate-400
  },
  betaBadge: {
    marginRight: 8,
    backgroundColor: '#38BDF8', // linear gradient approximation
    borderRadius: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  betaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 26,
  },
  timerText: {
    marginLeft: 4,
    fontWeight: '400',
    color: '#334155', // text-slate-700
  },
  controlsContainer: {
    zIndex: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#F8FAFC', // bg-slate-50
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  activeControlButton: {
    backgroundColor: '#38BDF8', // bg-sky-400
  },
  inactiveControlButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1', // border-slate-300
    borderRadius: '50%',
    padding: 5
  },
  microphoneContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  microphoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    paddingRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  microphoneIcon: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#38BDF8', // bg-sky-400
  },
  chevronIcon: {
    // backgroundColor: '#F8FAFC', // bg-slate-50
    transform: [{ rotate: '0deg' }],
  },
  chevronIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  audioDevicesDropdown: {
    position: 'absolute',
    top: 50,
    width: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-slate-200
    padding: 8,
    zIndex: 30,
  },
  dropdownLabel: {
    padding: 8,
    paddingLeft: 32,
    fontSize: 14,
    color: '#64748B', // text-slate-500
  },
  deviceOption: {
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  selectedDeviceOption: {
    backgroundColor: '#F1F5F9', // bg-slate-100
  },
  deviceOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deviceLabel: {
    fontSize: 14,
    color: '#0F172A',
  },
  selectedDeviceLabel: {
    color: '#0EA5E9', // text-sky-500
  },
  deviceLabelPadding: {
    paddingLeft: 24,
  },
  leaveContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 0,
    position: 'relative',
  },
  leaveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: '#DC2626', // bg-red-600
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 8,
  },
  leaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  leaveDropdown: {
    position: 'absolute',
    top: 45,
    right: 0,
    width: '100%',
    minWidth: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E2E8F0', // border-slate-200
    padding: 4,
    zIndex: 50,
  },
  leaveOption: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leaveRoomText: {
    color: '#334155', // text-slate-700
  },
  endInterviewText: {
    color: '#DC2626', // text-red-600
  },
});

export default HeaderSection;
