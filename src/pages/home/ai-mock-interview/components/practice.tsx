import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { slides } from "./data.d";

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 1024;

type SlideItemProps = {
  i: {
    image: string;
    title: string;
    button: string;
  }
};

const SlideItem: React.FC<SlideItemProps> = ({ i }) => {
  return (
    <View style={styles.slideCard}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: i.image }} 
          style={styles.slideImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.slideTitle} numberOfLines={3}>
        {i.title}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{i.button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const responsive = {
  desktop: {
    itemWidth: 336,
    sliderWidth: screenWidth,
    itemHeight: 258,
  },
  tablet: {
    itemWidth: screenWidth / 2.2,
    sliderWidth: screenWidth,
    itemHeight: 258,
  },
  mobile: {
    itemWidth: 300,
    sliderWidth: screenWidth,
    itemHeight: 198,
  }
};

const Practice = () => {
  const carouselSettings = isLargeScreen 
    ? responsive.desktop 
    : screenWidth > 464 
      ? responsive.tablet 
      : responsive.mobile;

  const renderSlideItem = ({ item, index }: { item: SlideItemProps['i']; index: number }) => (
    <SlideItem key={index} i={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          Practice with the Biggest Companies and Be Ready for Anything
        </Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            These are the toughest interviews in the world — high standards, intense questions, and no room for error. If you can nail interviews with giants like Microsoft, Netflix, and OpenAI, you're ready for any challenge other companies throw your way.
          </Text>
        </View>
      </View>
      
      <View style={styles.carouselContainer}>
        <Carousel
          data={slides}
          renderItem={renderSlideItem}
          sliderWidth={carouselSettings.sliderWidth}
          itemWidth={carouselSettings.itemWidth}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
          activeSlideAlignment="center"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerContainer: {
    paddingTop: isLargeScreen ? 200 : 100,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  heading: {
    fontSize: isLargeScreen ? 32 : 24,
    fontWeight: 'bold',
    lineHeight: isLargeScreen ? 48 : 32,
    textAlign: 'center',
    maxWidth: 983,
  },
  subtitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isLargeScreen ? 24 : 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280', // text-gray-tertiary
    textAlign: 'center',
    maxWidth: 900,
  },
  carouselContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 20,
    maxWidth: 1300,
    alignSelf: 'center',
    height: 300,
  },
  slideCard: {
    height: isLargeScreen ? 258 : 198,
    width: isLargeScreen ? 336 : 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB', // border-gray-200
    padding: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
    marginHorizontal: 8,
  },
  imageContainer: {
    marginBottom: 5,
  },
  slideImage: {
    width: 80,
    height: 80,
  },
  slideTitle: {
    fontSize: 18,
    lineHeight: 30,
    height: isLargeScreen ? 89 : 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#E5E7EB', // border-gray-200
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    // elevation: 1,
  },
  buttonText: {
    fontSize: 14,
    color: '#000000',
  },
});

export default Practice;