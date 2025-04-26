import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import ConnectedAccount from "./connect-account";
import EmailAddress from "./email-address";
import ProfileContent from "./profile-content";

const { width, height } = Dimensions.get('window');
const isLargeScreen = width >= 768;

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile details</Text>
            </View>
            
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <ProfileContent />
                
                <View style={styles.divider} />
                
                <EmailAddress />
                
                <View style={styles.divider} />
                
                <ConnectedAccount />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: height - 48,
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
});

export default Profile;