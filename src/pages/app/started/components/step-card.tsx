import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const StepCard = ({ link, idx, title, desc }: { link: string; idx: number; title: string; desc: string }) => {

    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate(link);
    };

    return (
        <Pressable style={styles.card} onPress={handlePress}>
            <View style={styles.header}>
                <View style={styles.indexContainer}>
                    <Text style={styles.indexText}>{idx}</Text>
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.description}>{desc}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 8,
    },
    indexContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#3CC8F2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    indexText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
    },
    description: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        fontSize: 14,
        fontWeight: '500',
        color: '#475569',
    }
});

export default StepCard;