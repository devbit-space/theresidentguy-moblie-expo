import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { innovation } from "./data.d"
import { w, h } from '../../../theme/services'

const { width: screenWidth } = Dimensions.get('window');

const responsive = {
    desktop: {
        itemWidth: screenWidth / 5,
        sliderWidth: screenWidth,
        itemHeight: 350,
    },
    tablet: {
        itemWidth: screenWidth / 1.1,
        sliderWidth: screenWidth,
        itemHeight: 350,
    },
    mobile: {
        itemWidth: screenWidth * 0.9,
        sliderWidth: screenWidth,
        itemHeight: 350,
    }
};

type InnovationItemProps = {
    i: {
        quote: string;
        author: string;
        source?: string;
        sourceImage: string;
    }
};

const InnovationItem: React.FC<InnovationItemProps> = ({ i }) => {
    return (
        <View style={styles.innovationItem}>
            <Text style={styles.quoteTitle}>
                "{i.quote}"
            </Text>
            <Text style={styles.authorText}>
                {i.author} {i.source}
            </Text>
            <Image
                source={{ uri: i.sourceImage }}
                style={styles.sourceImage}
                resizeMode="contain"
            />
        </View>
    );
};

const Innovations = () => {
    const carouselSettings = screenWidth > 1024 ? responsive.desktop : 
                             screenWidth > 464 ? responsive.tablet : 
                             responsive.mobile;

    const renderInnovationItem = ({ item, index }: { item: InnovationItemProps['i']; index: number }) => (
        <InnovationItem key={index} i={item} />
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#54b3f3', '#00c3ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.background}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.subtitle}>We're Humble to Mention</Text>
                    <Text style={styles.title}>
                        Groundbreaking innovation for interviewees, as featured on
                    </Text>
                </View>

                <View style={styles.carouselContainer}>
                    <Carousel
                        data={innovation}
                        renderItem={renderInnovationItem}
                        sliderWidth={carouselSettings.sliderWidth}
                        itemWidth={carouselSettings.itemWidth}
                        loop={true}
                        autoplay={true}
                        autoplayInterval={4000}
                        enableMomentum={false}
                        lockScrollWhileSnapping={true}
                    />
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: w(3),
        marginVertical: h(5),
    },
    background: {
        borderRadius: 32,
        paddingVertical: h(8),
        overflow: 'hidden',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: h(6),
        paddingHorizontal: w(5),
        zIndex: 10,
        maxWidth: '90%',
        alignSelf: 'center',
    },
    subtitle: {
        fontSize: w(5),
        color: '#BFECFF', // sky-200 equivalent
        marginBottom: h(4),
    },
    title: {
        fontSize: w(7),
        // fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        maxWidth: '100%',
    },
    carouselContainer: {
        width: '100%',
    },
    innovationItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: '90%',
        padding: w(2.5),
    },
    quoteTitle: {
        width: '80%',
        marginBottom: h(6),
        fontSize: w(6),
        // fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
    },
    authorText: {
        width: '80%',
        marginBottom: h(5),
        fontSize: w(4),
        alignSelf: 'center',
        color: '#F0F9FF', // blue-50 equivalent
    },
    sourceImage: {
        height: 48,
        width: '100%',
    },
});

export default Innovations;