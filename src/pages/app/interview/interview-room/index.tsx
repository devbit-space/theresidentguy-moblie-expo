import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import HeaderSection from "./header-section";
import InterviewerSection from "./interviewer-section";
import ModelResponseSection from "./model-response-section";
import ReviewSection from "./review-section";

// Define route params type
type InterviewRoomParams = {
    InterviewRoom: {
        callId: string;
    };
};

const InterviewRoom = () => {
    const [isEndInterview, setEndInterview] = useState(false);
    const route = useRoute<RouteProp<InterviewRoomParams, 'InterviewRoom'>>();
    const callId = route.params?.callId;

    useEffect(() => {
        // You can use the callId here to connect to your interview session
        console.log('Connected to interview session:', callId);
    }, [callId]);

    return (
        <View style={styles.container}>
            {isEndInterview ? (
                <ReviewSection />
            ) : (
                <View style={styles.interviewContainer}>
                    <HeaderSection setEndInterview={setEndInterview} />
                    <View style={styles.contentContainer}>
                        <View style={styles.sectionsContainer}>
                            <InterviewerSection />
                            <ModelResponseSection />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    interviewContainer: {
        flex: 1,
        backgroundColor: '#F1F5F9', // bg-design-light
    },
    contentContainer: {
        position: 'relative',
        height: '100%',
        paddingHorizontal: 24, // px-6
        backgroundColor: '#F8FAFC', // bg-slate-50
        flex: 1,
    },
    sectionsContainer: {
        flexDirection: 'row',
        gap: 20,
        height: '100%',
        width: '100%',
        overflow: 'hidden',
    },
});

export default InterviewRoom;
