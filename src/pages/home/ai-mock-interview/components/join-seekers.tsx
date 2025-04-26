import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { testimonials } from "../../components/data.d";

const { width: screenWidth } = Dimensions.get('window');
const isLargeScreen = screenWidth >= 1024;

const responsive = {
  desktop: {
    itemWidth: screenWidth / 4.2,
    sliderWidth: screenWidth,
    itemHeight: 400,
  },
  tablet: {
    itemWidth: screenWidth / 2.2,
    sliderWidth: screenWidth,
    itemHeight: 400,
  },
  mobile: {
    itemWidth: screenWidth * 0.85,
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

const JoinSeekers = () => {
  const carouselSettings = isLargeScreen 
    ? responsive.desktop 
    : screenWidth > 464 
      ? responsive.tablet 
      : responsive.mobile;

  const renderTestimonialItem = ({ item, index }: { item: ItemProps['i']; index: number }) => (
    <TestimonialItem key={index} i={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Join Thousands of Happy Job Seekers
      </Text>
      
      <View style={styles.carouselContainer}>
        <Carousel
          data={testimonials}
          renderItem={renderTestimonialItem}
          sliderWidth={carouselSettings.sliderWidth}
          itemWidth={carouselSettings.itemWidth}
          loop={true}
          autoplay={true}
          autoplayInterval={4000}
          enableMomentum={false}
          lockScrollWhileSnapping={true}
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: isLargeScreen ? 64 : 48,
    zIndex: 10,
    width: '100%',
  },
  carouselContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  testimonialCard: {
    backgroundColor: '#F0F9FF', // bg-sky-50
    borderRadius: 32,
    padding: 20,
    height: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // elevation: 1,
    marginHorizontal: 8,
    justifyContent: 'space-between',
  },
  testimonialContent: {
    // marginBottom: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 24,
  },
  tagContainer: {
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 18,
    color: '#000000',
  },
  quoteText: {
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: 'Georgia',
  },
  roleText: {
    fontSize: 15,
    color: 'rgba(55, 65, 81, 0.4)', // text-gray-primary with opacity
  },
  companyLogo: {
    width: 100,
    height: 40,
  },
});

export default JoinSeekers;