import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import Icon from "../../../../components/icon";
import CompleteSessionModal from "./complete-session-modal";
import { useGlobalContext } from "../../../../context";

const ActivateBar = () => {
    const [state, {dispatch}] = useGlobalContext();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const [isCompleteSessionModal, setIsCompleteSessionModal] = useState(false);

    const onEnd = () => {
        setIsCompleteSessionModal(true);
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        });
    };

    const handleGoBack = () => {
        if (state.isLeaveInterview.link) {
            const screenName = state.isLeaveInterview.link.replace("/", "");
            navigation.navigate(screenName as never);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#00F7FF", "#0090FF", "#00F7FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>You are in an interview now.</Text>
                    
                    <TouchableOpacity 
                        onPress={handleGoBack} 
                        style={[styles.button, styles.greenButton]}
                    >
                        <View style={styles.buttonContent}>
                            <Icon icon="GoBack" />
                            <Text style={styles.buttonText}>Go Back</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        onPress={onEnd} 
                        style={[styles.button, styles.amberButton]}
                    >
                        <View style={styles.buttonContent}>
                            <Icon icon="Leave" />
                            <Text style={styles.buttonText}>End</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            
            {isCompleteSessionModal && (
                <CompleteSessionModal 
                    isOpen={isCompleteSessionModal} 
                    onClose={() => setIsCompleteSessionModal(false)} 
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradient: {
        width: '100%',
        padding: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    button: {
        borderRadius: 6,
        padding: 10,
    },
    greenButton: {
        backgroundColor: '#65a30d', // lime-600 equivalent
    },
    amberButton: {
        backgroundColor: '#d97706', // amber-600 equivalent
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
});

export default ActivateBar; 
