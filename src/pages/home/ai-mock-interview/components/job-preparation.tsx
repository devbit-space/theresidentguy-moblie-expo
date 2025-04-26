import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width >= 1024;

const JobPreparation = () => {
    return (
        <View style={styles.container}>
            {/* First section: Become the Ideal Candidate */}
            <View style={styles.section}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../../assets/image/home/become-the-ideal-candidate.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                
                <View style={[
                    styles.textContainer,
                    isLargeScreen && styles.textContainerLeft
                ]}>
                    <Text style={styles.heading}>
                        Become the Ideal Candidate
                    </Text>
                    <Text style={styles.description}>
                        Build the skills, confidence, and mindset top employers are looking for.
                        Stand out by being prepared for every question, challenge, and test.
                    </Text>
                </View>
            </View>
            
            {/* Second section: Land Your Dream Job */}
            <View style={[styles.section, styles.sectionReverse]}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../../../assets/image/home/land-your-dream-job.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                
                <View style={[
                    styles.textContainer,
                    isLargeScreen && styles.textContainerRight
                ]}>
                    <Text style={[styles.heading, styles.headingGray]}>
                        Land Your Dream Job
                    </Text>
                    <Text style={styles.description}>
                        Practice until you're pitch-perfect and ready to impress. Walk into any
                        interview knowing you're about to get hired.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    section: {
        maxWidth: 1200,
        width: '100%',
        marginTop: isLargeScreen ? 200 : 100,
        flexDirection: isLargeScreen ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    sectionReverse: {
        marginTop: isLargeScreen ? 48 : 64,
        flexDirection: isLargeScreen ? 'row-reverse' : 'column',
    },
    imageContainer: {
        width: isLargeScreen ? 592 : 358,
        height: isLargeScreen ? 388 : 234,
        backgroundColor: '#F3F4F6', // bg-b4 (light gray background)
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    image: {
        width: 528,
        height: 324,
    },
    textContainer: {
        marginTop: isLargeScreen ? 0 : 32,
        width: isLargeScreen ? 560 : '100%',
        alignItems: isLargeScreen ? 'flex-start' : 'center',
    },
    textContainerLeft: {
        marginLeft: 48,
        alignItems: 'flex-start',
    },
    textContainerRight: {
        marginRight: 48,
        alignItems: 'flex-end',
    },
    heading: {
        fontSize: isLargeScreen ? 48 : 32,
        lineHeight: isLargeScreen ? 48 : 32,
        fontWeight: 'bold',
        textAlign: isLargeScreen ? 'left' : 'center',
        color: '#111827', // text-gray-900
    },
    headingGray: {
        color: '#6B7280', // text-gray-500
    },
    description: {
        marginTop: 24,
        fontSize: 20,
        lineHeight: isLargeScreen ? 24 : 18,
        color: '#6B7280', // text-gray-500
        textAlign: isLargeScreen ? 'left' : 'center',
        paddingHorizontal: isLargeScreen ? 0 : 16,
    },
});

export default JobPreparation;