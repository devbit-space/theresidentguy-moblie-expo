import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useGlobalContext } from "../../../context/index";

import Icon from "../../../components/icon"
import { companies } from "./data.d"
import { w, h } from "../../../theme/services";

const { width: screenWidth } = Dimensions.get('window');


const responsive = {
    desktop: {
        itemWidth: screenWidth / 7,
        sliderWidth: screenWidth,
        itemHeight: 80,
    },
    tablet: {
        itemWidth: screenWidth / 4,
        sliderWidth: screenWidth,
        itemHeight: 80,
    },
    mobile: {
        itemWidth: screenWidth / 1,
        sliderWidth: screenWidth,
        itemHeight: 80,
    }
};

// Define RootStackParamList to type the navigation
type RootStackParamList = {
    LiveInterview: undefined;
    // Add other screen names and their params here
};

const Header = () => {
    const [state, { dispatch }] = useGlobalContext();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const carouselSettings = screenWidth > 1024 ? responsive.desktop : 
                            screenWidth > 464 ? responsive.tablet : 
                            responsive.mobile;

    const renderCompanyItem = ({ item, index }: { item: string; index: number }) => (
        <View style={styles.companyItem} key={index}>
            <Icon icon={item} />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.heroSection}>
                <View style={styles.heroContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.mainHeading}>
                            Unlock Your Interview Superpowers with AI,{'\n'}
                            Your AI-Powered Interview Copilot
                        </Text>
                        <View style={styles.statsRow}>
                            <Text style={styles.statText}>250K+ Offers Received</Text>
                            <View style={styles.divider} />
                            <Text style={styles.statText}>1.2M + Interviews Aced</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.ctaButton} 
                            onPress={() => {
                                console.log('state =====>', state.user.userEmail);
                                if(state.user.userEmail === "") {
                                    navigation.navigate('Onboarding')
                                } else {
                                    navigation.navigate('LiveInterview')
                                }
                            }}
                        >
                            <Text style={styles.ctaButtonText}>Activate AI Interview Mode Now</Text>
                        </TouchableOpacity>

                        <View style={styles.subtextContainer}>
                            <Text style={styles.subtext}>
                                Interview Copilot generating actionable guidance for interviews in real-time
                            </Text>
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={require('../../../assets/image/video.png')} 
                            style={styles.mainImage} 
                            resizeMode="contain"
                        />
                        <Image 
                            source={require('../../../assets/image/text.png')} 
                            style={styles.overlayImage} 
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.taglineContainer}>
                <Text style={styles.tagline}>
                    300,000+ offers from the most exciting companies and organizations
                </Text>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel
                    data={companies}
                    renderItem={renderCompanyItem}
                    sliderWidth={carouselSettings.sliderWidth}
                    itemWidth={carouselSettings.itemWidth}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={2000}
                    enableMomentum={false}
                    lockScrollWhileSnapping={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        position: 'relative',
    },
    heroSection: {
        alignItems: 'center',
        marginTop: 40,
    },
    heroContent: {
        flexDirection: 'column',
        maxWidth: 1700,
        paddingHorizontal: 16,
        width: '100%',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    mainHeading: {
        fontFamily: 'Georgia',
        fontSize: w(5),
        lineHeight: h(3),
        textAlign: 'center',
        fontWeight: 'normal',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
        marginBottom: 20,
    },
    statText: {
        fontSize: w(3.2),
        fontWeight: 'normal',
        textAlign: 'center',
    },
    divider: {
        height: 40,
        width: 2,
        backgroundColor: '#e0e0e0',
        marginHorizontal: w(6),
    },
    ctaButton: {
        backgroundColor: '#4a6cf7', // primary color
        paddingVertical: h(2),
        paddingHorizontal: w(10),
        borderRadius: 6,
    },
    ctaButtonText: {
        color: 'white',
        fontSize: w(3.5),
    },
    subtextContainer: {
        marginTop: h(4),
        alignItems: 'center',
    },
    subtext: {
        color: '#94a3b8', // slate-400
        fontSize: w(3.3),
        textAlign: 'center',
        maxWidth: '70%',
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: h(2),
    },
    mainImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 16/9,
    },
    overlayImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: undefined,
        aspectRatio: 16/9,
    },
    taglineContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: h(19),
    },
    tagline: {
        fontSize: w(4.5),
        textAlign: 'center',
        maxWidth: '95%',
        fontFamily: 'Georgia',
    },
    carouselContainer: {
        marginVertical: h(14),
        paddingHorizontal: w(4),
        maxWidth: 1700,
        alignSelf: 'center',
        width: '100%',
    },
    companyItem: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header