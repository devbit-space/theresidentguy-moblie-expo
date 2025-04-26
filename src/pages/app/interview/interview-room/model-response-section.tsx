import React, { useState } from "react";
import { View, Text, Switch, ScrollView, StyleSheet } from "react-native";

const ModelResponseSection = () => {
    const [isAutoScroll, setIsAutoScroll] = useState(false);
    const [autoGPT4oPip, setAutoGPT4oPip] = useState(false);
    const [autoGeminiPip, setAutoGeminiPip] = useState(false);

    return (
        <View style={styles.container}>
            {/* GPT4o Section */}
            <View style={styles.modelSection}>
                <View style={styles.modelContent}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Interview Copilot w/ GPT4o</Text>
                                <View style={styles.checkboxContainer}>
                                    <Switch
                                        value={autoGPT4oPip}
                                        onValueChange={setAutoGPT4oPip}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    />
                                    <Text style={styles.checkboxLabel}>Auto PIP</Text>
                                </View>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Ready</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.controls}>
                        <View style={styles.autoScrollContainer}>
                            <Switch
                                value={isAutoScroll}
                                onValueChange={() => setIsAutoScroll(!isAutoScroll)}
                                trackColor={{ false: "#767577", true: "#2dd4bf" }}
                            />
                            <Text style={styles.autoScrollText}>Auto Scroll</Text>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.placeholderContent}>
                            <Text style={styles.placeholderText}>
                                The Interview Copilot™ is ready and waiting for the
                            </Text>
                            <Text style={styles.placeholderText}>
                                interviewer's questions.
                            </Text>
                        </View>
                        <ScrollView 
                            style={[styles.responseArea, { display: 'none' }]}
                        />
                    </View>
                </View>
            </View>

            {/* Gemini Section */}
            <View style={styles.modelSection}>
                <View style={styles.modelContent}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Interview Copilot w/ Gemini 2.0 Flash</Text>
                                <View style={styles.checkboxContainer}>
                                    <Switch
                                        value={autoGeminiPip}
                                        onValueChange={setAutoGeminiPip}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    />
                                    <Text style={styles.checkboxLabel}>Auto PIP</Text>
                                </View>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={styles.statusBadge}>
                                    <View style={styles.statusDot} />
                                    <Text style={styles.statusText}>Ready</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.placeholderContent}>
                            <Text style={styles.placeholderText}>
                                The Interview Copilot™ is ready and waiting for the
                            </Text>
                            <Text style={styles.placeholderText}>
                                interviewer's questions.
                            </Text>
                        </View>
                        <ScrollView 
                            style={[styles.responseArea, { display: 'none' }]}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'center',
    },
    modelSection: {
        flex: 1,
        minWidth: 300,
        borderRadius: 8,
        overflow: 'hidden',
    },
    modelContent: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        backgroundColor: 'white',
        height: '100%',
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        paddingHorizontal: 16,
    },
    headerContent: {
        height: 64,
        gap: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        height: 'auto',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0f172a',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#0f172a',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#D9F1CD',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#129F42',
        marginRight: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#129F42',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'flex-end',
    },
    autoScrollContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    autoScrollText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#0f172a',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        overflow: 'hidden',
    },
    placeholderContent: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
        color: '#64748b',
    },
    responseArea: {
        flex: 1,
        flexDirection: 'column',
        gap: 4,
        paddingHorizontal: 16,
    },
});

export default ModelResponseSection;
