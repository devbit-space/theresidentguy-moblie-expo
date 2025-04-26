import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal as RNModal, TextInput, Linking, Dimensions } from "react-native";
import { BlurView } from 'expo-blur';
import Icon from "../../../components/icon";

const LinkedinProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
    const [status, setStatus] = useState({
        documentType: "Resume",
        fileName: ""
    });
    
    const [linkedinUrl, setLinkedinUrl] = useState("");
    
    const handleVisitLinkedIn = () => {
        const url = "https://www.linkedin.com/in/";
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open this URL: " + url);
            }
        });
    };

    return (
        <RNModal
            visible={isOpen}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <BlurView intensity={70} style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>LinkedIn profile</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Icon icon="Close" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>LinkedIn Profile</Text>
                        <TextInput 
                            style={styles.input}
                            placeholder="input your LinkedIn profile url"
                            value={linkedinUrl}
                            onChangeText={setLinkedinUrl}
                        />
                    </View>
                    
                    <TouchableOpacity onPress={handleVisitLinkedIn}>
                        <Text style={styles.linkText}>Visit my LinkedIn Profile</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.cancelButton} 
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Upload</Text>
                        </TouchableOpacity>
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
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        paddingTop: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    closeButton: {
        position: 'absolute',
        top: -8,
        right: 0,
        padding: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 4,
    },
    formGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12.5,
        fontWeight: '500',
        marginBottom: 4,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 12.5,
    },
    linkText: {
        fontSize: 12,
        color: '#0ea5e9',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
        gap: 8,
    },
    cancelButton: {
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 12.5,
        fontWeight: '600',
    },
    uploadButton: {
        height: 40,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: '#0ea5e9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadButtonText: {
        fontSize: 12.5,
        fontWeight: '600',
        color: 'white',
    },
});

export default LinkedinProfileModal;