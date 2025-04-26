import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal, Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

// Import equivalent components for React Native
// Note: You'll need to implement or import equivalent Icon component for React Native
import Icon from "../../../components/icon"; // You may need to create a React Native version of this
import { w } from "../../../theme/services";

const EndSessionModal = ({ isOpen, onClose, setEndInterview }: { isOpen: boolean; onClose: VoidFunction, setEndInterview: Function }) => {
    // No need for ref and mousedown event in React Native
    
    return (
        <RNModal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <BlurView intensity={70} style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close-outline" size={24} color="black" />
                        </TouchableOpacity> */}
                        
                        <View style={styles.contentWrapper}>
                            <Text style={styles.title}>End Session</Text>
                            <Text style={styles.description}>Are you sure you want to end this interview session?</Text>
                            
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    onPress={() => {
                                        onClose();
                                        setEndInterview(true);
                                    }} 
                                    style={styles.endButton}
                                >
                                    <Text style={styles.endButtonText}>Yes, End it</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    onPress={onClose} 
                                    style={styles.continueButton}
                                >
                                    <Text style={styles.continueButtonText}>No, Continue this session</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </BlurView>
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
        maxWidth: 500,
        maxHeight: height - 48,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 24,
        // paddingHorizontal: 10,
    },
    modalContent: {
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: -8,
        right: 0,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
    },
    contentWrapper: {
        gap: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: w(3.5),
        color: '#6b7280',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
        marginTop: 16,
    },
    endButton: {
        borderWidth: 1,
        borderColor: '#64748b',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    endButtonText: {
        color: 'black',
        fontWeight: '600',
    },
    continueButton: {
        backgroundColor: '#0ea5e9',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default EndSessionModal;
