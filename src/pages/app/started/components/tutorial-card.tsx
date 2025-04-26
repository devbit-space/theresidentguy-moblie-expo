import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';

const TutorialCard = ({ link, title, imgSrc, altText, idx }: { link: string; title: string; imgSrc: string; altText: string, idx: number }) => {
    const navigation = useNavigation();
    
    const handlePress = () => {
        // Navigate to the tutorial or handle the press
        if (link) {
            navigation.navigate(link);
        }
    };

    // Determine if this is a network image (starts with http/https) or a local path
    const isNetworkImage = imgSrc.startsWith('http://') || imgSrc.startsWith('https://');
    
    // Get the image source based on its type
    const getImageSource = () => {
        if (isNetworkImage) {
            return { uri: imgSrc };
        } else {
            // For local images, use a mapping approach to handle static requires
            switch(imgSrc) {
                case '/image/app/youtube-thumb.png':
                    return require('../../../../assets/image/app/youtube-thumb.png');
                case '/image/app/copilot-thumb.png':
                    return require('../../../../assets/image/app/copilot-thumb.png');
                case '/image/app/interviews-thumb.png':
                    return require('../../../../assets/image/app/interviews-thumb.png');
                case '/image/app/setting-thumb.png':
                    return require('../../../../assets/image/app/setting-thumb.png');
                default:
                    // Fallback image or empty object if no match
                    return '';
            }
        }
    };

    return (
        <Pressable 
            style={[
                styles.card, 
                idx === 0 && styles.primaryBorder
            ]} 
            onPress={handlePress}
        >
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Watch the tutorial</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={getImageSource()}
                        style={styles.image}
                        accessibilityLabel={altText}
                    />
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 6,
        padding: 16,
        backgroundColor: 'white',
    },
    primaryBorder: {
        borderColor: '#3CC8F2', // Using the same primary color as in StepCard
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        color: '#334155',
    },
    buttonContainer: {
        marginTop: 20,
        display: 'flex', // Using 'none' by default would require Platform-specific code
    },
    button: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
    },
    imageContainer: {
        marginLeft: 16,
    },
    image: {
        width: 156,
        height: 120,
        resizeMode: 'contain',
    }
});

export default TutorialCard;