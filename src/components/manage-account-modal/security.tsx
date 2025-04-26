import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import Password from "./password";
import DeleteAccount from "./delete-account";
// import Icon from "../icon";

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 768;

const Security = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Security</Text>
            </View>
            
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Password />
                
                <View style={styles.divider} />
                
                {/* Active device section - commented out in original code
                <View style={styles.sectionRow}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.titleText}>Active device</Text>
                    </View>
                    <View style={styles.sectionContent}>
                        <View style={styles.deviceRow}>
                            <Icon icon="Device" style={styles.deviceIcon} />
                            <View style={styles.deviceInfo}>
                                <Text style={styles.deviceText}>Windows</Text>
                                <View style={styles.deviceBadge}>
                                    <Text style={styles.deviceBadgeText}>This device</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.deviceDetailText}>Chrome 133.0.0.0</Text>
                        <Text style={styles.deviceDetailText}>185.135.76.89 (Tokyo, JP)</Text>
                        <Text style={styles.deviceDetailText}>Today at 12:54 PM</Text>
                    </View>
                </View>
                
                <View style={styles.divider} />
                */}
                
                <DeleteAccount />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: height - 100,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 8,
        paddingTop: 32,
        paddingHorizontal: isLargeScreen ? 24 : 16,
        backgroundColor: 'white',
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        paddingBottom: 16,
    },
    scrollContainer: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    contentContainer: {
        paddingVertical: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    sectionRow: {
        flexDirection: isLargeScreen ? 'row' : 'column',
        width: '100%',
    },
    sectionTitle: {
        width: isLargeScreen ? '33%' : '100%',
        marginBottom: isLargeScreen ? 0 : 8,
        minWidth: isLargeScreen ? 200 : undefined,
        maxWidth: 200,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1E293B',
    },
    sectionContent: {
        flex: 1,
    },
    deviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    deviceIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    deviceInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deviceText: {
        fontSize: 14,
        color: '#64748B',
        marginRight: 8,
    },
    deviceBadge: {
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    deviceBadgeText: {
        fontSize: 14,
        color: '#64748B',
    },
    deviceDetailText: {
        fontSize: 12.5,
        color: '#64748B',
        marginBottom: 4,
    },
});

export default Security;