import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalContext } from "../../../../context";
import { h } from "../../../../theme/services";

// Define navigation type
type RootStackParamList = {
  LiveInterview: undefined;
  // Add other screens as needed
};

const ReviewSection = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [_, { dispatch }] = useGlobalContext();
    const [rating, setRating] = useState(0);
    const [isReview, setIsReview] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleRating = (rate: number) => {
        setRating(rate);
        setIsReview(true);
    };

    const handleReRate = () => {
        setIsReview(false);
        setRating(0);
    };

    const handleSubmit = () => {
        console.log({ rating, feedback });
        setIsSubmit(true);
    };

    const handleReturnHome = () => {
        dispatch({
            type: "isLeaveInterview",
            payload: {
                status: false,
                link: ""
            }
        });
        navigation.navigate('LiveInterview');
    };

    // Simple star rendering function
    const renderStars = () => {
        const stars = [];
        const filledColors = [
            "#f17a45", "#f17a45", "#f19745", "#f19745", "#f1a545", 
            "#f1a545", "#f1b345", "#f1b345", "#f1d045", "#f1d045"
        ];
        
        for (let i = 0; i < 5; i++) {
            const filled = i < Math.floor(rating);
            const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;
            
            stars.push(
                <TouchableOpacity 
                    key={i} 
                    onPress={() => handleRating(i + 1)}
                    style={styles.starContainer}
                >
                    <AntDesign 
                        name={filled ? "star" : halfFilled ? "staro" : "staro"} 
                        size={30} 
                        color={filled || halfFilled ? filledColors[i*2] : "#CCCCCC"} 
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.main}>
                <View style={styles.contentContainer}>
                    <Text style={styles.emoji}>🚀</Text>
                    <Text style={styles.title}>
                        Well done! You finished your interview with our AI Copilot!
                    </Text>
                    <Text style={styles.subtitle}>
                        View the interview report approximately 5 minutes later.
                    </Text>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress={handleReturnHome}
                            style={styles.returnButton}
                        >
                            <Text style={styles.returnButtonText}>Return Home</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.feedbackCard}>
                        {(isReview && !isSubmit) && (
                            <View style={styles.feedbackForm}>
                                <Text style={styles.feedbackTitle}>
                                    Give us feedback on our product!
                                </Text>
                                <TextInput
                                    value={feedback}
                                    onChangeText={setFeedback}
                                    style={styles.textArea}
                                    multiline={true}
                                    numberOfLines={5}
                                    placeholder="Type anything you wish to share (e.g. bug report, feature request...)"
                                />
                                <View style={styles.feedbackActions}>
                                    <TouchableOpacity
                                        onPress={handleReRate}
                                        style={styles.rerateButton}
                                    >
                                        <Text style={styles.rerateButtonText}>Re-rate</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={styles.submitButton}
                                    >
                                        <Text style={styles.submitButtonText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        
                        {(!isReview && !isSubmit) && (
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingTitle}>
                                    How do you feel about this experience?
                                </Text>
                                <View style={styles.starsContainer}>
                                    {renderStars()}
                                </View>
                            </View>
                        )}
                        
                        {isSubmit && (
                            <View style={styles.thankYouContainer}>
                                <Text style={styles.thankYouText}>
                                    Thank you for your feedback!
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                
                <View style={styles.securityBadge}>
                    <AntDesign name="lock" size={14} color="#15803d" />
                    <Text style={styles.securityText}>
                        Secured by 256-bit AES and 256-bit SSL/TLS encryption
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f8fafc', // bg-design-light equivalent
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'relative',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    emoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        color: '#0f172a', // text-slate-900
        marginBottom: 8,
    },
    subtitle: {
        color: '#4b5563', // text-gray-600
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginVertical: 16,
    },
    returnButton: {
        backgroundColor: '#0ea5e9', // bg-sky-500
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    returnButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
    feedbackCard: {
        width: '80%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0', // border equivalent
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        padding: 24,
        marginTop: 16,
        backgroundColor: 'white',
    },
    feedbackForm: {
        flexDirection: 'column',
        gap: 16,
        width: '100%',
    },
    feedbackTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f172a', // text-slate-900
    },
    textArea: {
        minHeight: h(15),
        minWidth: '80%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0', // border-slate-200
        backgroundColor: 'white',
        padding: 16,
        fontSize: 14,
        color: '#0f172a', // text-slate-900
        textAlignVertical: 'top'
    },
    feedbackActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    rerateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0ea5e9', // border-sky-500
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    rerateButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0ea5e9', // text-sky-500
    },
    submitButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#0ea5e9', // bg-sky-500
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    submitButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
    },
    ratingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    ratingTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#0f172a', // text-slate-900
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 16,
    },
    starContainer: {
        marginHorizontal: 4,
    },
    thankYouContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    thankYouText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#0f172a', // text-slate-900
    },
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 6,
        backgroundColor: '#bbf7d0', // bg-green-200
        paddingHorizontal: 8,
        paddingVertical: 8,
        position: 'absolute',
        bottom: 16,
    },
    securityText: {
        fontSize: 14,
        color: '#14532d', // text-green-900
    }
});

export default ReviewSection;
