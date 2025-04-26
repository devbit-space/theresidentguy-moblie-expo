import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from "react-native";
import { CheckBox } from "react-native-elements";

import { useGlobalContext } from "../../context";
import { showToast, strongPasswordValidator } from "../../context/helper";
import Icon from "../icon";
import Loader from "../loader";
import { restApi } from "../../context/restApi";

const { width } = Dimensions.get("window");
const isLargeScreen = width >= 768;

const Password = () => {
    const [isUpdatePassword, setIsUpdatePassword] = useState(false);
    const [state, { dispatch }]: any = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [signOutAllDevices, setSignOutAllDevices] = useState(false);

    const [status, setStatus] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        isPasswordMatch: {
            status: false,
            msg: ""
        },
        isStrongPassword: {
            status: false,
            msg: ""
        }
    });

    const [isShowPassword, setIsShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const handleCurrentPasswordChange = (text: string) => {
        setStatus(prevStatus => ({
            ...prevStatus,
            currentPassword: text
        }));
    };

    const handleNewPasswordChange = (text: string) => {
        setStatus(prevStatus => {
            const newStatus = { ...prevStatus, newPassword: text };

                return {
                    ...newStatus,
                isStrongPassword: strongPasswordValidator(text),
                    isPasswordMatch: {
                    status: text === prevStatus.confirmPassword,
                    msg: text === prevStatus.confirmPassword ? "" : "Password does not match"
                }
            };
        });
    };

    const handleConfirmPasswordChange = (text: string) => {
        setStatus(prevStatus => ({
            ...prevStatus,
            confirmPassword: text,
                    isPasswordMatch: {
                status: prevStatus.newPassword === text,
                msg: prevStatus.newPassword === text ? "" : "Password does not match"
            }
        }));
    };

    const togglePasswordVisibility = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
        setIsShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const onSavePassword = async () => {
        if (isLoading) return;
        
        if (state.user.isPasswordSet && status.currentPassword === "") {
            showToast("Current password is required", "error");
            return;
        } else if (status.newPassword === "") {
            showToast("New password is required", "error");
            return;
        } else if (status.confirmPassword === "") {
            showToast("Confirm password is required", "error");
            return;
        } else if (status.newPassword !== status.confirmPassword) {
            showToast("Password does not match", "error");
            return;
        } else if (!status.isStrongPassword.status) {
            showToast("Password is not strong", "error");
            return;
        } 
        
        setIsLoading(true);
            const res = await restApi.postRequest("update-password", {
                current_password: status.currentPassword,
                new_password: status.newPassword,
            confirm_password: status.confirmPassword,
            sign_out_all: signOutAllDevices
        });
        
            if (res.status === 200) {
            showToast("Password updated successfully", "success");
            setIsUpdatePassword(false);
                setStatus({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                    isPasswordMatch: { status: false, msg: "" },
                    isStrongPassword: { status: false, msg: "" }
            });
            await fetchUser();
        } else {
            showToast(res.msg || "Failed to update password", "error");
        }
        
        setIsLoading(false);
    };

    const fetchUser = async () => {
        const res = await restApi.postRequest("get-user");
        if (res.status === 200) {
            const data = res.data.data;
            dispatch({
                type: "user", payload: {
                    id: data._id,
                    email: data.email,
                    fullName: data.full_name,
                    pfp: data.pfp,
                    isPasswordSet: data.is_password_set
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Password</Text>
                </View>
                
                <View style={styles.contentContainer}>
                    {!isUpdatePassword && (
                        <View style={styles.passwordContent}>
                            {state.user.isPasswordSet ? (
                                <View style={styles.passwordRow}>
                                    <Text style={styles.passwordDots}>••••••••••</Text>
                                    <TouchableOpacity 
                                        onPress={() => setIsUpdatePassword(true)}
                                        style={styles.updateButton}
                                    >
                                        <Text style={styles.updateButtonText}>Update password</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity 
                                    onPress={() => setIsUpdatePassword(true)}
                                    style={styles.updateButton}
                                >
                                    <Text style={styles.updateButtonText}>Add password</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
            
            {isUpdatePassword && (
                <View style={styles.formContainer}>
                    <View style={styles.formContent}>
                        <View style={styles.formSection}>
                            <Text style={styles.formTitle}>
                                {state.user.isPasswordSet ? "Update password" : "Add password"}
                            </Text>
                            
                            {state.user.isPasswordSet && (
                                <View style={styles.inputGroup}>
                                    <Text style={styles.inputLabel}>Current password</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput 
                                            style={styles.input}
                                            placeholder="Current password"
                                            secureTextEntry={!isShowPassword.currentPassword}
                                            value={status.currentPassword}
                                            onChangeText={handleCurrentPasswordChange}
                                        />
                                        <TouchableOpacity 
                                            style={styles.visibilityToggle}
                                            onPress={() => togglePasswordVisibility('currentPassword')}
                                        >
                                            <Icon 
                                                icon={isShowPassword.currentPassword ? "Visible" : "Invisible"} 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>New password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="New password"
                                        secureTextEntry={!isShowPassword.newPassword}
                                        value={status.newPassword}
                                        onChangeText={handleNewPasswordChange}
                                    />
                                    <TouchableOpacity 
                                        style={styles.visibilityToggle}
                                        onPress={() => togglePasswordVisibility('newPassword')}
                                    >
                                        <Icon 
                                            icon={isShowPassword.newPassword ? "Visible" : "Invisible"} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                {status.newPassword && !status.isStrongPassword.status && (
                                    <View style={styles.errorRow}>
                                        {status.isStrongPassword.msg && 
                                            <View style={styles.errorIconContainer}>
                                                <Icon icon="Info" />
                                            </View>
                                        }
                                        <Text style={styles.errorText}>{status.isStrongPassword.msg}</Text>
                                    </View>
                                )}
                            </View>
                            
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Confirm password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Confirm password"
                                        secureTextEntry={!isShowPassword.confirmPassword}
                                        value={status.confirmPassword}
                                        onChangeText={handleConfirmPasswordChange}
                                    />
                                    <TouchableOpacity 
                                        style={styles.visibilityToggle}
                                        onPress={() => togglePasswordVisibility('confirmPassword')}
                                    >
                                        <Icon 
                                            icon={isShowPassword.confirmPassword ? "Visible" : "Invisible"} 
                                        />
                                    </TouchableOpacity>
                                </View>
                                {status.confirmPassword && !status.isPasswordMatch.status && (
                                    <View style={styles.errorRow}>
                                        {status.isPasswordMatch.msg && 
                                            <View style={styles.errorIconContainer}>
                                                <Icon icon="Info" />
                                            </View>
                                        }
                                        <Text style={styles.errorText}>{status.isPasswordMatch.msg}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={signOutAllDevices}
                                onPress={() => setSignOutAllDevices(!signOutAllDevices)}
                                containerStyle={styles.checkbox}
                            />
                            <View style={styles.checkboxTextContainer}>
                                <Text style={styles.checkboxTitle}>Sign out of all other devices</Text>
                                <Text style={styles.checkboxDescription}>
                                    It is recommended to sign out of all other devices which may have used your old password.
                                </Text>
                            </View>
                        </View>
                        
                        <View style={styles.buttonRow}>
                            <TouchableOpacity 
                                onPress={() => setIsUpdatePassword(false)}
                                style={styles.cancelButton}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity 
                                onPress={onSavePassword}
                                style={styles.saveButton}
                            >
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <Text style={styles.saveButtonText}>
                                        {state.user.isPasswordSet ? "Update" : "Save"}
                                    </Text>
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
        width: '100%',
    },
    header: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        marginBottom: 8,
        width: '100%',
    },
    titleContainer: {
        width: isLargeScreen ? '33%' : '100%',
        marginBottom: isLargeScreen ? 0 : 8,
        minWidth: isLargeScreen ? 200 : 'auto',
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: isLargeScreen ? '67%' : '100%',
    },
    passwordContent: {
        width: '100%',
    },
    passwordRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    passwordDots: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    updateButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
    },
    updateButtonText: {
        fontSize: 14,
        color: '#1E293B',
    },
    formContainer: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        width: '100%',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        padding: 24,
        paddingBottom: 16,
        marginTop: 8,
        backgroundColor: 'white',
    },
    formContent: {
        flexDirection: 'column',
    },
    formSection: {
        marginBottom: 16,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    inputGroup: {
        marginTop: 8,
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 14,
        color: '#000',
        marginBottom: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        borderWidth: 1,
        borderColor: '#7DD3FC',
        borderRadius: 8,
    },
    input: {
        flex: 1,
        padding: 8,
        fontSize: 14,
    },
    visibilityToggle: {
        position: 'absolute',
        right: 8,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    errorIconContainer: {
        marginRight: 4,
    },
    errorText: {
        fontSize: 13,
        color: '#F97316',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0,
        marginRight: 8,
    },
    checkboxTextContainer: {
        flex: 1,
    },
    checkboxTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    checkboxDescription: {
        fontSize: 14,
        color: '#64748B',
    },
    buttonRow: {
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

export default Password;