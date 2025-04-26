import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { tutorials } from "./data.d";
import { w, h } from '../../../theme/services';

const { width: screenWidth } = Dimensions.get('window');

type TutorialItemType = {
    title: string; 
    description: string; 
    date: string; 
    image: string;
};

type ItemProps = {
    i: TutorialItemType;
};

const Item: React.FC<ItemProps> = ({ i }) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => {
                // Navigate to detail page or handle the tap
                // navigation.navigate('TutorialDetail', { tutorial: i });
            }}
        >
            <Image
                source={{ uri: i.image }}
                style={styles.tutorialImage}
                resizeMode="cover"
            />
            <Text style={styles.dateText}>{i.date}</Text>
            <Text style={styles.titleText}>{i.title}</Text>
            <Text style={styles.descriptionText}>{i.description}</Text>
        </TouchableOpacity>
    );
};

const responsive = {
    desktop: {
        itemWidth: screenWidth / 4,
        sliderWidth: screenWidth,
        itemHeight: 527,
    },
    tablet: {
        itemWidth: screenWidth / 1.1,
        sliderWidth: screenWidth,
        itemHeight: 527,
    },
    mobile: {
        itemWidth: screenWidth * 0.91,
        sliderWidth: screenWidth,
        itemHeight: 527,
    }
};

const Learn = () => {
    const carouselSettings = screenWidth > 1024 ? responsive.desktop : 
                             screenWidth > 464 ? responsive.tablet : 
                             responsive.mobile;

    const renderTutorialItem = ({ item, index }: { item: TutorialItemType; index: number }) => (
        <Item key={index} i={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.subtitle}>
                    AI Will Not Take Your Job But Someone Using AI Will
                </Text>
                <Text style={styles.title}>
                    Learn more about AI superpowers to navigate this recruiting season
                </Text>
            </View>

            <View style={styles.carouselContainer}>
                <Carousel
                    data={tutorials}
                    renderItem={renderTutorialItem}
                    sliderWidth={carouselSettings.sliderWidth}
                    itemWidth={carouselSettings.itemWidth}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={4000}
                    vertical={false}
                    activeSlideAlignment="center"
                    // slideStyle={{ marginHorizontal: w(1) }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: h(13),
        paddingBottom: h(16),
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        // marginBottom: h(10),
        paddingHorizontal: w(5),
        zIndex: 10,
        maxWidth: '100%',
    },
    subtitle: {
        fontSize: w(4.5),
        marginBottom: h(4),
        textAlign: 'center',
        color: '#9CA3AF', // text-gray-400 equivalent
    },
    title: {
        fontSize: w(7.5),
        // fontWeight: 'bold',
        textAlign: 'center',
        maxWidth: '100%',
    },
    carouselContainer: {
        width: '100%',
        maxWidth: '100%',
        marginVertical: h(1),
        // paddingHorizontal: w(5),
    },
    itemContainer: {
        height: h(70),
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: w(5),
        width: '100%',
        maxWidth: '100%', // Using the SM width value
    },
    tutorialImage: {
        width: '100%',
        height: '25%',
        borderRadius: 8,
        marginBottom: h(2.5),
    },
    dateText: {
        fontSize: w(4),
        color: 'rgba(100, 116, 139, 0.4)', // text-slate-600 with opacity
        marginBottom: h(2),
    },
    titleText: {
        fontSize: w(5),
        // fontWeight: 'bold',
        marginBottom: h(2.5),
    },
    descriptionText: {
        fontSize: w(4.5),
        color: 'rgba(100, 116, 139, 0.4)', // text-slate-600 with opacity
    },
});

export default Learn;