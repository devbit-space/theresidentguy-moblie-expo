import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { useGlobalContext } from "../../context";
import { restApi } from "../../context/restApi";
import { showToast } from "../../context/helper";
import Loader from "../loader";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const ProfileContent = () => {
    const [isUpdateProfile, setIsUpdateProfile] = useState(false);
    const [state, { dispatch }]: any = useGlobalContext();
    const [uploadedFile, setUploadedFile] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        // Request permission to access the photo library
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            showToast('Sorry, we need camera roll permissions to make this work!', 'error');
            return;
        }
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            setPreviewUrl(selectedAsset.uri);
            
            // Get file info
            const fileInfo = await getFileInfo(selectedAsset.uri);
            setUploadedFile(fileInfo);
        }
    };
    
    const getFileInfo = async (uri: string) => {
        // Extract filename from the URI
        const filename = uri.split('/').pop() || 'photo.jpg';
        
        // Get the file extension
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';
        
        return {
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            name: filename,
            type
        };
    };

    const fetchUser = async () => {
        const resp = await restApi.postRequest("get-user");
        if (resp.status === 200) {
            const data = resp.data.data;
            dispatch({ 
                type: "user", 
                payload: {
                id: data._id,
                email: data.email,
                fullName: data.full_name,
                pfp: data.pfp,
                isPasswordSet: data.is_password_set
                } 
            });
        }
    };

    const onSaveProfile = async () => {
        if (isLoading) return;
        
        if (!uploadedFile) {
            showToast("Please select an image first.", "error");
            return;
        }
        
        // Check file size (approximate calculation)
        const fileInfo = await fetch(uploadedFile.uri).then(res => {
            const contentLength = res.headers.get('Content-Length');
            return { size: contentLength ? parseInt(contentLength) : 0 };
        }).catch(() => ({ size: 0 }));
        
        if (fileInfo.size > 10 * 1024 * 1024) {
            showToast("File size must be less than 10MB.", "error");
            return;
        }

        setIsLoading(true);
        
        // Create FormData for the upload
        const formData = new FormData();
        formData.append('file', uploadedFile);
        
        const res = await restApi.postRequest("upload-profile-picture", formData);
        
        if (res === undefined) {
            showToast("An error has occurred during communication with backend.", "error");
        } else if (res.status === 200) {
            showToast("Profile picture updated successfully.", "success");
            setIsUpdateProfile(false);
            await fetchUser();
        } else {
            console.log(res);
            showToast(res.msg, "error");
        }
        
        setIsLoading(false);
    };

    const onRemoveProfile = async () => {
        const res = await restApi.postRequest("remove-profile-picture");
        if (res.status === 200) {
            showToast("Profile picture removed successfully.", "success");
            setIsUpdateProfile(false);
            await fetchUser();
        }
    };

    const renderProfileImage = () => {
        if (previewUrl) {
            return (
                <Image
                    source={{ uri: previewUrl }}
                    style={styles.profileImage}
                />
            );
        } else if (state.user?.pfp) {
            return (
                <Image
                    source={{ uri: state.user.pfp }}
                    style={styles.profileImage}
                />
            );
        } else {
            return (
                <View style={styles.defaultProfileContainer}>
                    <Image
                        source={require('../../assets/image/icons/user-bg.png')}
                        style={styles.defaultProfileBackground}
                    />
                    <Text style={styles.defaultProfileLetter}>
                        {state.user?.fullName?.charAt(0) || ''}
                    </Text>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Profile</Text>
            </View>
            
            {!isUpdateProfile ? (
                <View style={styles.profileViewContainer}>
                    <View style={styles.profileImageContainer}>
                        {renderProfileImage()}
                    </View>
                    
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => setIsUpdateProfile(true)}
                    >
                        <Text style={styles.updateButtonText}>Update profile</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.updateProfileContainer}>
                    <View style={styles.updateProfileContent}>
                        <Text style={styles.updateProfileTitle}>Update Profile</Text>
                        
                        <View style={styles.profileEditRow}>
                            <View style={styles.profileImageContainer}>
                                {renderProfileImage()}
                            </View>
                            
                            <View style={styles.uploadOptions}>
                                <View style={styles.buttonGroup}>
                                    <TouchableOpacity
                                        style={styles.uploadButton}
                                        onPress={pickImage}
                                    >
                                        <Text style={styles.uploadButtonText}>Upload</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={onRemoveProfile}
                                    >
                                        <Text style={styles.removeButtonText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                                
                                <Text style={styles.uploadTip}>
                                    Recommended size 1:1, up to 10MB
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.actionButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setIsUpdateProfile(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.saveButton}
                                onPress={onSaveProfile}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <Text style={styles.saveButtonText}>Save</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        width: '100%',
        marginBottom: 8,
    },
    titleContainer: {
        width: isLargeScreen ? '33%' : '100%',
        marginBottom: isLargeScreen ? 0 : 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    profileViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: isLargeScreen ? '67%' : '100%',
        marginLeft: isLargeScreen ? 24 : 0,
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    defaultProfileContainer: {
        position: 'relative',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultProfileBackground: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    defaultProfileLetter: {
        color: 'white',
        fontSize: 24,
    },
    updateButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginRight: isLargeScreen ? 0 : 12,
    },
    updateButtonText: {
        fontSize: 14,
        color: '#1E293B',
    },
    updateProfileContainer: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        width: isLargeScreen ? '67%' : '100%',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 24,
        backgroundColor: 'white',
    },
    updateProfileContent: {
        width: '100%',
    },
    updateProfileTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 16,
    },
    profileEditRow: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        alignItems: isLargeScreen ? 'center' : 'flex-start',
        marginBottom: 16,
    },
    uploadOptions: {
        marginTop: isLargeScreen ? 0 : 16,
        marginLeft: isLargeScreen ? 20 : 0,
    },
    buttonGroup: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    uploadButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        marginRight: 8,
    },
    uploadButtonText: {
        fontSize: 14,
        color: '#1E293B',
    },
    removeButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    removeButtonText: {
        fontSize: 14,
        color: '#DC2626',
    },
    uploadTip: {
        fontSize: 12,
        color: '#64748B',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    cancelButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    cancelButtonText: {
        fontSize: 14,
        color: '#64748B',
    },
    saveButton: {
        width: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EA5E9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    saveButtonText: {
        fontSize: 14,
        color: 'white',
    },
});

export default ProfileContent;