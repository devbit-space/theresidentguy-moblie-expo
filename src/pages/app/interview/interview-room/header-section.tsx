import { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";

import Icon from "../../../../components/icon";
import SettingModal from "../../components/setting-modal";
import { useGlobalContext } from "../../../../context";
import EndSessionModal from "../../components/end-sesion-modal";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface AudioDevice {
    deviceId: string;
    label: string;
}

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  InterviewRoom: { callId: string };
};

const HeaderSection = ({ setEndInterview }: { setEndInterview: Function }) => {
    const [state, { dispatch }] = useGlobalContext();
    
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const audioDevicesDropdownRef = useRef(null);
    const leaveDropdownRef = useRef(null);

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
        if (state.isSharedScreen) {
            const interval = setInterval(handleTimer, 1000);
            return () => clearInterval(interval);
        }
    }, [timer, state.isSharedScreen]);

    const onLeaveRoom = () => {
        setShowLeaveDropdown(false);
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: true,
                link: route.name
            }
        });
        navigation.navigate("Home");
    };

    const getAudioDevices = async () => {
        try {
            // Request audio recording permission
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('Audio recording permission not granted');
                return;
            }

            // In Expo, we can't enumerate devices like in web
            // Instead, we'll create a mock device for the active microphone
            const mockDevice = {
                deviceId: 'default',
                label: 'Default Microphone'
            };
            
            setAudioDevices([mockDevice]);
            setSelectedDevice(mockDevice);
        } catch (err) {
            console.error('Error getting audio devices:', err);
        }
    };

    useEffect(() => {
        getAudioDevices();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.leftSection}>
                <Text style={styles.title}>
                    Live Interview
                </Text>
                <View style={styles.subtitleContainer}>
                    <LinearGradient
                        colors={['#0090FF', '#00F7FF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.premiumBadge}
                    >
                        <Text style={styles.premiumText}>Premium</Text>
                    </LinearGradient>
                    <Ionicons name="timer-outline" size={24} color="black" />
                    <Text style={styles.timerText}>{formatTime(timer)}</Text>
                </View>
            </View>
            
            <View style={styles.rightSection}>
                <TouchableOpacity 
                    onPress={() => setIsShowSettingModal(true)} 
                    style={styles.settingButton}
                >
                    <Ionicons name="settings-sharp" size={24} color="black" />
                </TouchableOpacity>
                
                <View style={styles.audioDeviceContainer} ref={audioDevicesDropdownRef}>
                    <TouchableOpacity
                        style={styles.audioDeviceButton}
                        onPress={() => setShowAudioDevices(!showAudioDevices)}
                    >
                        <View style={styles.microphoneCircle}>
                            <Icon icon="Microphone" />
                        </View>
                        <View style={showAudioDevices ? styles.chevronRotated : styles.chevronContainer}>
                            <Ionicons name="chevron-down-sharp" size={24} color="black" />
                        </View>
                    </TouchableOpacity>

                    {showAudioDevices && (
                        <View style={styles.dropdown}>
                            <Text style={styles.dropdownLabel}>Select Microphone Source</Text>
                            {audioDevices.map((device) => (
                                <TouchableOpacity
                                    key={device.deviceId}
                                    style={[
                                        styles.dropdownItem,
                                        selectedDevice?.deviceId === device.deviceId && styles.dropdownItemSelected
                                    ]}
                                    onPress={() => {
                                        setSelectedDevice(device);
                                        setShowAudioDevices(false);
                                    }}
                                >
                                    <View style={styles.deviceRow}>
                                        {device.label === selectedDevice?.label && (
                                            <Icon icon="Check" />
                                        )}
                                        <Text 
                                            style={[
                                                styles.deviceLabel,
                                                device.label === selectedDevice?.label ? styles.selectedDeviceLabel : styles.deviceLabelWithPadding
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
                
                <View style={styles.leaveContainer} ref={leaveDropdownRef}>
                    <TouchableOpacity
                        style={styles.leaveButton}
                        onPress={() => setShowLeaveDropdown(!showLeaveDropdown)}
                    >
                        <MaterialIcons name="call-end" size={24} color="white" />
                        <Text style={styles.leaveText}>Leave</Text>
                        <Ionicons name="chevron-down-sharp" size={24} color="white" />
                    </TouchableOpacity>

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
            
            {isShowSettingModal && <SettingModal isOpen={isShowSettingModal} onClose={() => setIsShowSettingModal(false)} />}
            {isEndSession && <EndSessionModal isOpen={isEndSession} setEndInterview={setEndInterview} onClose={() => setIsEndSession(false)} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8FAFC', // slate-50
        padding: 16,
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
        width: '100%',
        fontSize: 20,
        fontWeight: '600',
        color: '#0F172A', // slate-900
        overflow: 'hidden',
    },
    subtitleContainer: {
        flexDirection: 'row',
        height: 28,
        alignItems: 'center',
    },
    premiumBadge: {
        marginRight: 8,
        borderRadius: 15,
        paddingHorizontal: 12,
        justifyContent: 'center',
        height: 26,
    },
    premiumText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    timerIcon: {
        width: 20,
        height: 20,
    },
    timerText: {
        marginLeft: 4,
        fontWeight: '400',
        color: '#334155', // slate-700
    },
    rightSection: {
        zIndex: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: '#F8FAFC', // slate-50
    },
    settingButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#CBD5E1', // slate-300
        backgroundColor: '#F8FAFC', // slate-50
    },
    audioDeviceContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
    },
    audioDeviceButton: {
        flexDirection: 'row',
        gap: 4,
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
    microphoneCircle: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#38BDF8', // sky-400
    },
    chevronContainer: {
        // backgroundColor: '#F8FAFC', // slate-50
    },
    chevronRotated: {
        // backgroundColor: '#F8FAFC', // slate-50
        transform: [{ rotate: '180deg' }],
    },
    dropdown: {
        position: 'absolute',
        top: 45,
        width: 320,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0', // slate-200
        paddingVertical: 8,
        zIndex: 10,
    },
    dropdownLabel: {
        padding: 8,
        paddingLeft: 32,
        fontSize: 14,
        color: '#64748B', // slate-500
    },
    dropdownItem: {
        width: '100%',
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    dropdownItemSelected: {
        backgroundColor: '#F1F5F9', // slate-100
    },
    deviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    deviceLabel: {
        fontSize: 14,
    },
    selectedDeviceLabel: {
        color: '#0EA5E9', // sky-500
    },
    deviceLabelWithPadding: {
        paddingLeft: 24,
    },
    leaveContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        marginRight: 0,
    },
    leaveButton: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#DC2626', // red-600
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginLeft: 8,
    },
    leaveIcon: {
        color: '#FFFFFF',
    },
    leaveText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    leaveChevron: {
        width: 20,
        height: 20,
        color: '#FFFFFF',
    },
    leaveChevronRotated: {
        width: 20,
        height: 20,
        color: '#FFFFFF',
        transform: [{ rotate: '180deg' }],
    },
    leaveDropdown: {
        position: 'absolute',
        top: 45,
        right: 0,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E2E8F0', // slate-200
        paddingVertical: 4,
        zIndex: 50,
    },
    leaveOption: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    leaveRoomText: {
        color: '#334155', // slate-700
    },
    endInterviewText: {
        color: '#DC2626', // red-600
    },
});

export default HeaderSection;
