import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { testimonials } from "./data.d";
import { w, h } from '../../../theme/services'

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 1024;

const responsive = {
    desktop: {
        itemWidth: screenWidth / 3.2,
        sliderWidth: screenWidth,
        itemHeight: 400,
    },
    tablet: {
        itemWidth: screenWidth / 1.1,
        sliderWidth: screenWidth,
        itemHeight: 400,
    },
    mobile: {
        itemWidth: screenWidth * 0.9,
        sliderWidth: screenWidth,
        itemHeight: 400,
    }
};

type ItemProps = {
    i: { 
        tag: string; 
        quote: string; 
        person: string; 
        role: string; 
        companyLogo: string; 
        tagColor: string;
    }
};

const TestimonialItem: React.FC<ItemProps> = ({ i }) => {
    return (
        <View style={styles.testimonialCard}>
            <View style={styles.testimonialContent}>
                <View style={[styles.tagContainer, { backgroundColor: i.tagColor }]}>
                    <Text style={styles.tagText}>{i.tag}</Text>
                </View>
                <Text style={styles.quoteText}>{i.quote}</Text>
                <Text style={styles.roleText}>{i.role}</Text>
            </View>
            <Image
                source={{ uri: i.companyLogo }}
                style={styles.companyLogo}
                resizeMode="contain"
            />
        </View>
    );
};

const Testimonials = () => {
    const carouselSettings = isLargeScreen 
        ? responsive.desktop 
        : screenWidth > 464 
            ? responsive.tablet 
            : responsive.mobile;

    const renderTestimonialItem = (info: any) => {
        const { item } = info;
        return <TestimonialItem i={item} />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.subheading}>
                            We Are Here To Help You Succeed
            </Text>
            <Text style={styles.heading}>Experience our product through real stories</Text>
            
            <View style={styles.carouselContainer}>
                <Carousel
                    data={testimonials}
                    renderItem={renderTestimonialItem}
                    sliderWidth={carouselSettings.sliderWidth}
                    itemWidth={carouselSettings.itemWidth}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={4000}
                    vertical={false}
                    activeSlideAlignment="start"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: isLargeScreen ? 200 : 100,
        alignItems: 'center',
        width: '100%',
        height: 500,
    },
    heading: {
        fontSize: w(7),
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: isLargeScreen ? 64 : 48,
        zIndex: 10,
        width: '90%',
    },
    carouselContainer: {
        width: '100%',
        paddingHorizontal: w(5),
        marginVertical: h(5),
        height: '100%',
    },
    testimonialCard: {
        backgroundColor: '#F0F9FF', // bg-sky-50
        borderRadius: 32,
        padding: w(6),
        height: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // elevation: 1,
        marginHorizontal: 8,
        justifyContent: 'space-between',
    },
    testimonialContent: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 24,
    },
    tagContainer: {
        borderRadius: 32,
        paddingVertical: h(1.5),
        paddingHorizontal: w(4),
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagText: {
        fontSize: w(4),
        color: '#ffffff',
    },
    quoteText: {
        fontSize: w(5),
        fontFamily: 'Georgia',
    },
    roleText: {
        fontSize: w(4),
        color: 'rgba(55, 65, 81, 0.4)', // text-gray-primary with opacity
    },
    companyLogo: {
        width: 100,
        height: 40,
    },
    subheading: {
        fontSize: w(5),
        color: 'rgba(0, 0, 0, 0.3)',
        marginBottom: h(5),
        textAlign: 'center',
    },
});

export default Testimonials;