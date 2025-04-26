import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";
import { Video } from "expo-av";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ScreenCapture from "expo-screen-capture";

import Icon from "../../../../components/icon";
import { useGlobalContext } from "../../../../context";

const InterviewerSection = () => {
    const [_, { dispatch }] = useGlobalContext();

    const [isRecording, setIsRecording] = useState(false);
    const [recordingURI, setRecordingURI] = useState<string | null>(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    // Start the pulse animation
    React.useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, []);

    const handleScreenShare = async () => {
        try {
            if (isRecording) {
                // Stop recording
                setIsRecording(false);
                dispatch({ type: 'isSharedScreen', payload: false });

                // In a real implementation, you would stop recording here
                // For example: await videoRef.current.stopAsync();
                
                // Mock for demo - pretend we have a recording
                // In a real app, you would have the actual recording URI
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Ask for permissions to save/share recording
                const { status } = await MediaLibrary.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need media library permissions to save recordings');
                    return;
                }
                
                // In a real implementation: Save the recording
                // Here we're just simulating the behavior
                alert("Recording would be saved to device or shared");
            } else {
                // Start recording
                
                // Request permissions
                const { status } = await ScreenCapture.requestPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need screen recording permissions to proceed');
                    return;
                }
                
                // In a real implementation, this would start the recording
                // For example: await videoRef.current.recordAsync();
                
                setIsRecording(true);
                dispatch({ type: 'isSharedScreen', payload: true });
                
                // Prevent screenshots during recording (if supported)
                await ScreenCapture.preventScreenCaptureAsync();
            }
        } catch (err) {
            console.error("Error with screen recording:", err);
            alert(`Error: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.headerSection}>
                    <View style={styles.headerContent}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Interviewer says:</Text>
                        </View>
                        <View style={styles.statusContainer}>
                            <View style={styles.statusIndicatorContainer}>
                                <Animated.View 
                                    style={[
                                        styles.pingCircle,
                                        { transform: [{ scale: pulseAnim }] }
                                    ]} 
                                />
                                <View style={styles.statusDot} />
                            </View>
                            <Text style={styles.statusText}>Ready</Text>
                        </View>
                    </View>
                </View>
                
                <View style={styles.videoSection}>
                    {isRecording ? (
                        <View style={styles.videoContainer}>
                            <Text style={styles.recordingText}>Recording in progress...</Text>
                            {/* In a real implementation, you might show preview here */}
                        </View>
                    ) : (
                        <View style={styles.connectContainer}>
                            <Text style={styles.connectText}>
                                Connect to your interview meeting room
                            </Text>
                            <TouchableOpacity
                                style={styles.shareButton}
                                onPress={handleScreenShare}
                            >
                                <Icon icon={isRecording ? "Close" : "Cursor"} />
                                <Text style={styles.shareButtonText}>
                                    {isRecording ? 'Stop Recording' : 'Select'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                
                <View style={styles.transcriptSection}>
                    <View style={styles.transcriptContent}>
                        <View>
                            <Text style={styles.transcriptText}>
                                Once you have selected the interview meeting room
                            </Text>
                            <Text style={styles.transcriptText}>
                                the transcript will be displayed here.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minWidth: 150,
        width: '20%',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#F1F5F9', // bg-slate-100
    },
    headerSection: {
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        borderColor: '#F1F5F9', // border-slate-100
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
    },
    headerContent: {
        minHeight: 28,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        marginRight: 8,
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A', // text-slate-900
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: '#F1F5F9', // border-slate-100
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    statusIndicatorContainer: {
        position: 'relative',
        marginRight: 8,
        height: 8,
        width: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pingCircle: {
        position: 'absolute',
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E', // bg-green-500
        opacity: 0.75,
    },
    statusDot: {
        position: 'relative',
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#22C55E', // bg-green-500
    },
    statusText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#334155', // text-slate-700
    },
    videoSection: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        height: 176, // approximate for lg:h-44
        minHeight: 128, // min-h-32
    },
    videoContainer: {
        maxHeight: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 176,
    },
    recordingText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    connectContainer: {
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    connectText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#F8FAFC', // text-slate-50
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#0284C7', // bg-sky-600
    },
    shareButtonText: {
        color: '#F8FAFC', // text-white
        fontSize: 14,
        fontWeight: '500',
    },
    transcriptSection: {
        minHeight: 208, // min-h-52
        height: '100%',
        flexDirection: 'column',
        maxHeight: '100%',
        borderWidth: 1,
        borderColor: '#F1F5F9', // border-slate-100
        backgroundColor: '#FFFFFF',
        flex: 2,
    },
    transcriptContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8,
    },
    transcriptText: {
        paddingHorizontal: 24,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B', // text-slate-500
    },
});

export default InterviewerSection;
