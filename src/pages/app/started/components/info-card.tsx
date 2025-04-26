import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const InfoCard = ({ title, desc, buttonText, link }: { title: string; desc: string; buttonText: string; link: string }) => {
    const handlePress = () => {
        router.navigate(link);
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.description}>{desc}</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    // onPress={handlePress}
                >
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        backgroundColor: 'white',
    },
    header: {
        padding: 16,
        paddingBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#334155',
    },
    body: {
        padding: 16,
        paddingTop: 0,
    },
    description: {
        fontSize: 16,
        color: '#64748b',
    },
    button: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontWeight: '600',
        fontSize: 14,
    }
});

export default InfoCard;