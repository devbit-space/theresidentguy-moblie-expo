import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Card from "./components/card"

interface InterviewHelperProps {
    onNext: () => void;
}

const InterviewHelper: React.FC<InterviewHelperProps> = ({ onNext }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>How can we help you crush your next interview?</Text>
            <View style={styles.cardsContainer}>
                <Card
                    title="I have an interview now"
                    desc="Get setup with our live interview assistant Copilot now and be ready with real-time responses."
                    subscribe="Premium"
                    onNext={onNext}
                />
                <Card
                    title="I need to prep for an interview"
                    desc="Get ready for your next interview with mock interviews, AI written cover letters, flashcards, and more."
                    subscribe="Free"
                    onNext={onNext}
                />
                <Card
                    title="I just want to explore"
                    desc="Take a tour of Theresidentguy, explore our AI resume builder and questions bank."
                    subscribe="Free"
                    onNext={onNext}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1E293B',
        marginBottom: 20,
    },
    cardsContainer: {
        marginTop: 40,
        gap: 16,
    },
});

export default InterviewHelper