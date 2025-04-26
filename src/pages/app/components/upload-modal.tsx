import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import Icon from "../../../components/icon";
import Modal from "../../../components/modal";
import { Radio } from "../../../components/radio";
import { MaterialIcons, Feather } from '@expo/vector-icons';

const UploadModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: VoidFunction }) => {
    const modalRef = useRef(null);

    const documentTypes = ["Resume", "Cover Letter", "Other"];
    const [status, setStatus] = useState({
        documentType: "Resume",
        fileName: ""
    });

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setStatus({ ...status, fileName: result.assets[0].name });
            }
        } catch (error) {
            console.log("Error picking document:", error);
        }
    };

    return (
        <Modal
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>
                            Select your document type and then upload
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Icon icon="Close" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Document Type</Text>
                    <View style={styles.radioContainer}>
                        {documentTypes.map((item, key) => (
                            <Radio 
                                key={key} 
                                value={item} 
                                isChecked={item === status.documentType} 
                                onChangeRadio={(value) => setStatus({ ...status, documentType: value })} 
                            />
                        ))}
                    </View>

                    {/* <Text style={styles.sectionTitle}>File</Text> */}
                    {/* <TouchableOpacity 
                        style={styles.fileInput}
                        onPress={pickDocument}
                    >
                        <Text style={styles.fileInputText}>
                            {!status.fileName ? "Choose file" : status.fileName}
                        </Text>
                        {!status.fileName && (
                            <Text style={styles.noFileText}>
                                No file chosen
                            </Text>
                        )}
                    </TouchableOpacity> */}
                    
                    <View style={styles.modalBody}>
                    <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
                        <Feather name="upload-cloud" size={36} color="#0EA5E9" />
                        <Text style={styles.uploadText}>Tap to select a file</Text>
                        <Text style={styles.uploadHint}>PDF, DOCX, or DOC (Max 10MB)</Text>
                    </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.fileNote}>
                        Only PDF, DOC, or DOCX files up to 10 MB
                    </Text> */}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.uploadButton}>
                            <Text style={styles.uploadButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '90%',
        // maxWidth: 500,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        flex: 1,
        paddingRight: 10,
    },
    closeButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 4,
    },
    sectionTitle: {
        fontWeight: '600',
        color: '#475569',
        marginTop: 10,
        marginBottom: 8,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 300,
        marginBottom: 12,
    },
    fileInput: {
        borderWidth: 1,
        borderColor: '#CBD5E1',
        borderRadius: 6,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileInputText: {
        color: '#000',
    },
    noFileText: {
        marginLeft: 8,
        color: '#64748b',
    },
    fileNote: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 4,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#CBD5E1',
        marginRight: 8,
    },
    cancelButtonText: {
        fontWeight: '600',
        color: '#000',
    },
    uploadButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: '#0090FF',
    },
    uploadButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    modalBody: {
      padding: 16,
    },
    uploadArea: {
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderStyle: 'dashed',
      borderRadius: 8,
      padding: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#0F172A',
      marginTop: 12,
    },
    uploadHint: {
      fontSize: 12,
      color: '#64748B',
      marginTop: 4,
    },
});

export default UploadModal;