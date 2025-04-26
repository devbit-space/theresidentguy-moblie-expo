import { useState } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import HeaderSection from "./header-section";
import InterviewerSection from "./interviewer-section";
import ModelResponseSection from "./model-response-section";
import ReviewSection from "./review-section";

const MockRoom = () => {
    const [isEndInterview, setEndInterview] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            {isEndInterview ? (
                <ReviewSection />
            ) : (
                <View style={styles.interviewContainer}>
                    <HeaderSection 
                        setEndInterview={setEndInterview} 
                        isCameraOn={isCameraOn} 
                        setIsCameraOn={setIsCameraOn} 
                    />
                    <View style={styles.contentContainer}>
                        <ScrollView horizontal contentContainerStyle={styles.scrollContent}>
                            <View style={styles.sectionsContainer}>
                                <InterviewerSection isCameraOn={isCameraOn} />
                                <ModelResponseSection />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    interviewContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC', // bg-design-light
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#F8FAFC', // bg-slate-50
        paddingHorizontal: 24,
    },
    scrollContent: {
        flexGrow: 1,
    },
    sectionsContainer: {
        flexDirection: 'row',
        flex: 1,
        gap: 20,
        minWidth: 1200, // Preserving the minimum width
        minHeight: 500, // Preserving the minimum height
    }
});

export default MockRoom;
